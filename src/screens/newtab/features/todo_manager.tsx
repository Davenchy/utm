import { createContext, useContext, useEffect, useState } from "react";
import EventEmitter from "events";
import SettingsManager from "@/shared/settings-manager";
import { INewTabSettingsScope, ITodoItem } from "@/types";
import { NEW_TAB_SETTINGS_SCOPE } from "../settings-scopes";

/* implementation */

export class TodoManager extends EventEmitter {
	private _settingsManager = SettingsManager.getInstance();
	private _items: ITodoItem[] = [];

	constructor() {
		super();
		this._settingsManager.on(
			"updated:" + NEW_TAB_SETTINGS_SCOPE,
			this._onUpdate.bind(this));
	}

	private async _onUpdate() {
		await this.load();
		this.emit("update");
	}

	async save(): Promise<void> {
		this._settingsManager
			.setValue<INewTabSettingsScope, keyof INewTabSettingsScope>(
				NEW_TAB_SETTINGS_SCOPE, "todoItems", this._items);
		await this._settingsManager.saveScope(NEW_TAB_SETTINGS_SCOPE);
		this.emit("save");
	}

	async load(): Promise<void> {
		this._items = this._settingsManager
			.getValue<INewTabSettingsScope, keyof INewTabSettingsScope>(
				NEW_TAB_SETTINGS_SCOPE, "todoItems") as ITodoItem[];
		this.emit("load");
	}

	addItem(label: string): void {
		const item = { id: Date.now(), label, done: false };
		this._items.push(item);
		this.emit("add", item);
		this.emit("update", "add", item);
	}

	setItem(item: ITodoItem): boolean {
		const index = this._items.findIndex(i => i.id === item.id);
		this.emit("set", index === -1 ? null : this._items[index], item);
		if (index === -1) return false;
		this._items[index] = item;
		this.emit("update", "set", item);
		return true;
	}

	removeItemById(id: number): void {
		const index = this._items.findIndex(i => i.id === id);
		this.emit("remove", index === -1 ? null : this._items[index], id);
		if (index !== -1) {
			const items = this._items.splice(index, 1);
			this.emit("update", "remove", items);
		}
	}

	toggleDoneById(id: number): boolean {
		const item = this._items.find(item => item.id === id);
		this.emit("toggle", item, id);
		if (!item) return false;
		item.done = !item.done;
		this.emit("toggled", item, id);
		this.emit("update", "toggle", item);
		return true;
	}

	get items(): ITodoItem[] {
		return Array.from(this._items);
	}

	dispose(): void {
		this._settingsManager.off("update", this._onUpdate.bind(this));
		this.removeAllListeners();
	}
}

/* React Components */

const TodoManagerContext = createContext<TodoManager | undefined>(undefined);

export function TodoManagerProvider({
	children,
	manager
}: {
	children: React.ReactNode;
	manager: TodoManager;
}) {
	return (
		<TodoManagerContext.Provider value={manager}>
			{children}
		</TodoManagerContext.Provider>
	);
}

export const useTodoManagerContext = () => {
	const manager = useContext(TodoManagerContext);
	if (!manager) {
		throw new Error("useTodoManagerContext must be used within a TodoManagerProvider");
	}
	return { manager };
};

export function useTodoManager() {
	const { manager } = useTodoManagerContext();
	const [items, setItems] = useState<ITodoItem[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	if (!manager) {
		throw new Error("useTodoManager must be used within a TodoManagerProvider");
	}

	// add comma after the generic type to help TS compiler to infer the type
	const doAction = <T,>(action: () => Promise<T>) => {
		if (isLoading) return;
		setIsLoading(true);
		action().then(() => setIsLoading(false));
	};

	const addTodo = (label: string) =>
		doAction(() => {
			manager.addItem(label);
			return manager.save();
		});

	const setTodo = (item: ITodoItem) =>
		doAction(() => {
			manager.setItem(item);
			return manager.save();
		});

	const removeTodo = (id: number) =>
		doAction(() => {
			manager.removeItemById(id);
			return manager.save();
		});

	const toggleTodo = (id: number) =>
		doAction(() => {
			manager.toggleDoneById(id);
			return manager.save();
		});

	const reloadTodoItems = () => doAction(() => manager.load());

	/* update items state on any manager update */
	const onManagerUpdate = () => setItems(manager.items);
	useEffect(() => {
		manager.on('update', onManagerUpdate);
		return () => {
			manager.off('update', onManagerUpdate);
		}
	});

	return {
		items,
		isLoading,
		addTodo,
		setTodo,
		removeTodo,
		toggleTodo,
		reloadTodoItems
	};
}

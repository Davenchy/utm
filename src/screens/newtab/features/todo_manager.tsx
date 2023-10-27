import { createContext, useContext, useEffect, useState } from "react";
import EventEmitter from "events";

/* types */

export interface TodoItem {
	id: number;
	title: string;
	done: boolean;
}

export interface TODORepository {
	saveTodoItems(todoItems: TodoItem[]): Promise<void>;
	loadTodoItems(): Promise<TodoItem[]>;
}

/* implementation */

export class TodoManager extends EventEmitter {
	private readonly _repo: TODORepository;
	private _items: TodoItem[] = [];

	constructor(repo: TODORepository) {
		super();
		this._repo = repo;
	}

	async save(): Promise<void> {
		await this._repo.saveTodoItems(this._items);
		this.emit("save");
	}

	async load(): Promise<void> {
		this._items = await this._repo.loadTodoItems();
		this.emit("load");
	}

	addItem(title: string): void {
		const item = { id: Date.now(), title, done: false };
		this._items.push(item);
		this.emit("add", item);
		this.emit("update", "add", item);
	}

	setItem(item: TodoItem): boolean {
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

	get items(): TodoItem[] {
		return Array.from(this._items);
	}
}

/* Repositories */

export class InMemoryTodoRepository implements TODORepository {
	private _todoItems: TodoItem[] = [];

	async saveTodoItems(todoItems: TodoItem[]): Promise<void> {
		this._todoItems = Array.from(todoItems);
	}

	async loadTodoItems(): Promise<TodoItem[]> {
		return Array.from(this._todoItems);
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
	const [items, setItems] = useState<TodoItem[]>([]);
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

	const addTodo = (title: string) =>
		doAction(() => {
			manager.addItem(title);
			return manager.save();
		});

	const setTodo = (item: TodoItem) =>
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

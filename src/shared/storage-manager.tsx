import EventEmitter from "events";
import { useEffect, useState } from "react";

export default class StorageManager extends EventEmitter {
	private static _instance?: StorageManager;
	private _scopes: Map<string, any> = new Map();

	private constructor() {
		super();
		browser.storage.onChanged.addListener(this._onChange.bind(this));
	}

	static getInstance(): StorageManager {
		if (!this._instance) this._instance = new StorageManager();
		return this._instance;
	}

	_onChange(changes: { [key: string]: browser.storage.StorageChange }) {
		for (const key of Object.keys(changes)) {
			const newValue = changes[key].newValue;
			const oldValue = changes[key].oldValue;

			if (!newValue) {
				this._scopes.delete(key);
				this.emit("removed:" + key, oldValue);
			} else {
				this._scopes.set(key, newValue);
				this.emit("changed:" + key, newValue);
			}
		}
	}

	static addScope<T>(scopeName: string, defaultValue: T): Promise<void> {
		return StorageManager.getInstance().addScope(scopeName, defaultValue);
	}
	async addScope<T>(scopeName: string, defaultValue: T): Promise<void> {
		if (this._scopes.has(scopeName)) return;

		this._scopes.set(scopeName, defaultValue);
		this.emit("added:" + scopeName);
		const scopes = await browser.storage.local.get({
			[scopeName]: defaultValue
		});

		this._scopes.set(scopeName, scopes[scopeName]);
		this.emit("loaded:" + scopeName);
		this.emit("updated:" + scopeName);
	}

	hasScope(scopeName: string): boolean {
		return this._scopes.has(scopeName);
	}

	getScopeProxy<T>(scopeName: string, autoSaveTimeout: number = 200): T {
		if (!this.hasScope(scopeName))
			throw new Error("Scope not found: " + scopeName);

		let timeout: NodeJS.Timeout;
		const debounceSave = () => {
			if (timeout) clearTimeout(timeout);
			timeout = setTimeout(() => this.saveScope(scopeName), autoSaveTimeout);
		};

		return new Proxy(
			this._scopes.get(scopeName),
			{
				get: (target: any, key: string) => {
					target[key] = this.getValue<T, any>(scopeName, key);
					return target[key];
				},
				set: (target: any, key: any, value: any) => {
					target[key] = value;
					this.setValue<T, any>(scopeName, key, value);
					this.emit('updated:' + scopeName);
					debounceSave();
					return true;
				}
			}
		);
	}

	async saveScope(scopeName: string): Promise<void> {
		if (!this.hasScope(scopeName))
			throw new Error("Scope not found: " + scopeName);
		await browser.storage.local.set({
			[scopeName]: this._scopes.get(scopeName)
		});
		this.emit("saved:" + scopeName);
	}

	setScope<T>(scopeName: string, scope: T): void {
		if (!this.hasScope(scopeName))
			throw new Error("Scope not found: " + scopeName);
		this._scopes.set(scopeName, scope);
	}

	getValue<T, K extends keyof T>(scopeName: string, key: K): T[K] {
		if (!this.hasScope(scopeName))
			throw new Error("Scope not found: " + scopeName);
		return this._scopes.get(scopeName)[key];
	}

	setValue<T, K extends keyof T>(scopeName: string, key: K, value: T[K]): void {
		if (!this.hasScope(scopeName))
			throw new Error("Scope not found: " + scopeName);
		this._scopes.get(scopeName)[key] = value;
	}

	async destroyScope(scopeName: string): Promise<void> {
		this._scopes.get(scopeName)!.destroy();
		this._scopes.delete(scopeName);
		this.emit("destroyed:" + scopeName);
	}

	getScope<T>(scopeName: string): T {
		if (!this.hasScope(scopeName))
			throw new Error("Scope not found: " + scopeName);
		return this._scopes.get(scopeName) as T;
	}

	async destroy(): Promise<void> {
		browser.storage.local.onChanged.removeListener(this._onChange);
		await Promise.all(
			Array.from(this._scopes.keys()).map(key => this.destroyScope(key))
		);
		this.removeAllListeners();
		this._scopes.clear();
	}
}

export function useStorageScope<T>(scopeName: string): T {
	const manager = StorageManager.getInstance();
	const [scope, setScope] = useState<T>(manager.getScopeProxy(scopeName));

	const reloadScope = () => setScope(manager.getScopeProxy(scopeName));

	useEffect(() => {
		manager.on("loaded:" + scopeName, reloadScope);
		manager.on("updated:" + scopeName, reloadScope);
		manager.on("changed:" + scopeName, reloadScope);

		return () => {
			manager.off("loaded:" + scopeName, reloadScope);
			manager.on("updated:" + scopeName, reloadScope);
			manager.off("changed:" + scopeName, reloadScope);
		};
	}, []);

	return scope;
}

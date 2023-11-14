import { IStorageConfig } from "@/types";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type TScopeName = keyof IStorageConfig;
export type TScope<K extends TScopeName> = IStorageConfig[K];

export type ScopeSetter<K extends TScopeName> = (scope: TScope<K>) => TScope<K>;
interface IStorageManagerContext {
	setScope: <K extends TScopeName>(scope: K, setter: ScopeSetter<K>) => void;
	save: <T extends TScopeName>(scopeName: T, scope: TScope<T>) => Promise<void>;
	load: () => Promise<IStorageConfig>;
	state: IStorageConfig;
}

const StorageManagerContext = createContext<IStorageManagerContext | undefined>(
	undefined
);

export function StorageManagerProvider({
	defaultConfig,
	children
}: {
	defaultConfig: IStorageConfig;
	children: React.ReactNode;
}) {
	const [state, setState] = useState<IStorageConfig>(defaultConfig);
	const context = useMemo<IStorageManagerContext>(
		() => ({
			state,
			async save(scopeName, scope) {
				await browser.storage.local.set({ [scopeName]: scope });
			},
			async load() {
				const results = await browser.storage.local.get(defaultConfig);
				setState(results as IStorageConfig);
				return results as IStorageConfig;
			},
			setScope: (key, setter) =>
				setState(state => ({ ...state, [key]: setter(state[key]) }))
		}),
		[state]
	);

	const onChanged = (changed: {
		[key: string]: browser.storage.StorageChange;
	}) => {
		setState(state => {
			Object.keys(changed)
				.filter(
					key => state[key as TScopeName] !== undefined && changed[key].newValue
				)
				.forEach(key => (state[key as TScopeName] = changed[key].newValue));
			return state;
		});
	};

	useEffect(() => {
		context.load();
	}, []);

	useEffect(() => {
		browser.storage.local.onChanged.addListener(onChanged);
		return () => {
			browser.storage.local.onChanged.removeListener(onChanged);
		};
	}, [context]);

	return (
		<StorageManagerContext.Provider value={context}>
			{children}
		</StorageManagerContext.Provider>
	);
}

export function useStorageManagerContext() {
	const context = useContext(StorageManagerContext);
	if (!context)
		throw new Error(
			"useStorageScope must be used under StorageManagerProvider"
		);
	return context;
}

export function useStorageScope<K extends TScopeName>(
	scopeName: K
): [TScope<K>, (scope: ScopeSetter<K>) => void] {
	const context = useStorageManagerContext();
	const scope: TScope<K> = context.state[scopeName];
	const setScope = (setter: ScopeSetter<K>) => {
		context.setScope<K>(scopeName, scope => {
			const newScope = setter(scope);
			context.save(scopeName, newScope);
			return newScope;
		});
	};

	return [scope, setScope];
}

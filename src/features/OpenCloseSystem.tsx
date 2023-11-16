import { IOpenCloseConfig } from "@/types";
import cls from "classnames";
import { createContext, useContext, useState } from "react";

export type SystemID = keyof IOpenCloseConfig;
export interface IOpenCloseSystemHook {
	active: boolean;
	open: () => void;
	close: () => void;
	toggle: () => void;
}

interface IOpenCloseSystem {
	state: IOpenCloseConfig;
	setState: React.Dispatch<React.SetStateAction<IOpenCloseConfig>>;
}

const OpenCloseSystemContext = createContext<IOpenCloseSystem | undefined>(
	undefined
);

// This component is used to manage the open/close state of different components.
export function OpenCloseSystemProvider({
	defaultConfig,
	children
}: {
	defaultConfig: IOpenCloseConfig;
	children: React.ReactNode;
}) {
	const [state, setState] = useState<IOpenCloseConfig>(defaultConfig);

	return (
		<OpenCloseSystemContext.Provider value={{ state, setState }}>
			{children}
		</OpenCloseSystemContext.Provider>
	);
}

// This function is used to manage the open/close state of a component.
export function useOpenCloseSystem(systemId: SystemID): IOpenCloseSystemHook {
	const context = useContext(OpenCloseSystemContext);
	if (!context)
		throw new Error("useOpenCloseSystem must be under OpenCloseSystemProvider");

	const toggle = () =>
		context.setState(s => ({ ...s, [systemId]: !s[systemId] }));
	const open = () => context.setState(s => ({ ...s, [systemId]: true }));
	const close = () => context.setState(s => ({ ...s, [systemId]: false }));

	return { active: context.state[systemId], open, close, toggle };
}

// exports the OpenCloseSystem component.
export function OpenCloseSystem({
	systemId,
	style,
	className,
	children,
	floating,
}: {
	systemId: SystemID;
	style?: React.CSSProperties;
	className?: string;
	children: React.ReactNode;
	floating?: boolean;
}) {
	const { active } = useOpenCloseSystem(systemId);
	return active ? (
		<div style={style} className={cls(className, { "fixed z-50": floating })}>
			{children}
		</div>
	) : null;
}

import { IOpenCloseConfig } from "@/types";
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

export function OpenCloseSystem({
	systemId,
	style,
	className,
	children
}: {
	systemId: SystemID;
	style?: React.CSSProperties;
	className?: string;
	children: React.ReactNode;
}) {
	const { active } = useOpenCloseSystem(systemId);
	return active ? (
		<div style={style} className={className}>
			{children}
		</div>
	) : null;
}

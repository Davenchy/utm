import EventEmitter from "events";
import { createContext, useContext, useEffect, useState } from "react";

/* implementation */

export class OverlayManager extends EventEmitter {
	private _stack: React.ReactNode[] = [];
	private _register: Map<string, React.ReactNode> = new Map();

	get stack(): React.ReactNode[] {
		return Array.from(this._stack);
	}

	get isStackEmpty(): boolean {
		return this._stack.length === 0;
	}

	open(node: React.ReactNode) {
		this._stack.push(node);
		this.emit("opened");
		this.emit("updated");
	}

	close() {
		this._stack.pop();
		this.emit("closed");
		this.emit("updated");
	}

	closeAll() {
		this._stack = [];
		this.emit("closed");
		this.emit("updated");
	}

	registerLayer(id: string, node: React.ReactNode) {
		this._register.set(id, node);
	}

	unregisterLayer(id: string) {
		this._register.delete(id);
	}

	hasRegisteredLayer(id: string): boolean {
		return this._register.has(id);
	}

	openRegisteredLayer(id: string) {
		const node = this._register.get(id);
		if (!node) throw new Error(`No registered layer with id ${id}`);
		this.open(node);
	}
}

/* React Components */

const OverlayManagerContext = createContext<OverlayManager | undefined>(
	undefined
);

export function useOverlayManagerContext(): OverlayManager {
	const context = useContext(OverlayManagerContext);
	if (!context)
		throw new Error(
			"useOverlayManagerContext must be used within a OverlayProvider"
		);
	return context;
}

export function OverlayLayer({ children }: { children: React.ReactNode }) {
	return (
		<div
			className="fixed bg-black/30 w-screen h-screen top-0 left-0
			    overflow-hidden flex justify-center items-center"
		>
			{children}
		</div>
	);
}

function OverlayGUI({ manager }: { manager: OverlayManager }) {
	const [stack, setStack] = useState<React.ReactNode[]>([]);

	useEffect(() => {
		const onUpdated = () => setStack(manager.stack);

		manager.on("updated", onUpdated);
		return () => {
			manager.off("updated", onUpdated);
		};
	});

	if (manager.isStackEmpty) return null;
	return (
		<>
			{stack.map(node => (
				<OverlayLayer>{node}</OverlayLayer>
			))}
		</>
	);
}

export function OverlayProvider({
	children,
	layers
}: {
	children: React.ReactNode;
	layers?: Record<string, React.ReactNode>;
}) {
	const manager = new OverlayManager();
	for (const [id, node] of Object.entries(layers || {}))
		manager.registerLayer(id, node);

	return (
		<OverlayManagerContext.Provider value={manager}>
			{children}
			<OverlayGUI manager={manager} />
		</OverlayManagerContext.Provider>
	);
}

export function OpenOverlay({
	label,
	node: element
}: {
	label: string;
	node: React.ReactNode;
}) {
	const manager = useOverlayManagerContext();

	const onOpen = () => manager.open(element);

	return <button onClick={onOpen}>{label}</button>;
}

export function OpenRegisteredOverlay({
	label,
	id
}: {
	label: string;
	id: string;
}) {
	const manager = useOverlayManagerContext();

	const onOpen = () => manager.openRegisteredLayer(id);

	return <button onClick={onOpen}>{label}</button>;
}

export function CloseOverlay({ label }: { label: string }) {
	const manager = useOverlayManagerContext();

	const onClose = () => manager.close();

	return <button onClick={onClose}>{label}</button>;
}

export function DefineOverlay({
	id,
	children
}: {
	id: string;
	children: React.ReactNode;
}) {
	const manager = useOverlayManagerContext();

	manager.registerLayer(id, children);
	return null;
}

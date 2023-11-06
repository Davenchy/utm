import { DependencyList, useCallback, useEffect } from "react";

export default function useHotkeys(
	callback: (event: KeyboardEvent) => void,
	dependencies: DependencyList = []
) {
	const cb = useCallback(callback, dependencies);

	useEffect(() => {
		window.addEventListener("keydown", cb);
		return () => {
			window.removeEventListener("keydown", cb);
		};
	}, [cb]);
}

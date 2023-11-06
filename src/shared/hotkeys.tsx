import { DependencyList, useCallback, useEffect } from "react";

export default function useHotkeys(
	detector: (event: KeyboardEvent) => boolean,
	callback: () => any,
	dependencies: DependencyList = []
) {
	const dt = useCallback(detector, dependencies);
	const cb = useCallback(callback, dependencies);

	const listener = (e: KeyboardEvent) => {
		if (dt(e)) {
			cb();
			e.preventDefault();
		}
	}

	useEffect(() => {
		window.addEventListener("keydown", listener);
		return () => {
			window.removeEventListener("keydown", listener);
		};
	}, [cb, dt]);
}

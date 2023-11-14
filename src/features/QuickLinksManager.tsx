import { IQuickLink } from "@/types";
import { useStorageScope } from "./StorageManager";

export type QuickLinkSetter = (quickLink: IQuickLink) => IQuickLink;
export default function useQuickLinksManager() {
	const [quickLinks, setQuickLinks] = useStorageScope("quickLinks");

	const addQuickLink = (quickLink: IQuickLink) =>
		setQuickLinks(links => [...links, quickLink]);

	const removeQuickLink = (id: string) =>
		setQuickLinks(links => links.filter(l => l.id !== id));

	const setQuickLink = (id: string, setter: QuickLinkSetter) =>
		setQuickLinks(links => links.map(l => (l.id === id ? setter(l) : l)));

	return {
		quickLinks,
		addQuickLink,
		removeQuickLink,
		setQuickLink
	};
}

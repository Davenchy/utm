export interface IQuickLink {
	id: string;
	title: string;
	url: string;
	icon?: string;
}

export interface ITodoItem {
	id: number;
	label: string;
	done: boolean;
}

export interface INewTabStorageScope {
	quickLinks: IQuickLink[];
	backgroundImage: string;
	todoItems: ITodoItem[];
}

export interface IQuickLink {
	id: string;
	title: string;
	url: string;
	icon?: string;
}

export interface INewTabSettingsScope {
	quickLinks: IQuickLink[];
	backgroundImage: string;
}

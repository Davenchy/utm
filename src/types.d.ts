export type QuickLintIconType = "base64" | "url";
export interface QuickLinkType {
	title: string;
	url: string;
	icon?: string;
	iconType?: QuickLintIconType;
}

export interface NewTabSettingsScope {
	quickLinks: QuickLinkType[];
	backgroundImage: string;
}

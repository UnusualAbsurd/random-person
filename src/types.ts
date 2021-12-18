export interface User {
	accent_color: string;
	avatar: string;
	banner: string;
	banner_color: string;
	discriminator: string;
	flags: number;
	id: string;
	locale: string;
	mfa_enabled: boolean;
	premium_type: number;
	public_flags: number;
	token: string;
	username: string;
}

export interface UserData {
	id: string;
	name: string;
	discriminator: string;
	avatar: string;
	banner?: string;
	developer: boolean;
	moderator: boolean;
	botModerator: boolean;
	honorable: boolean;
}

export interface PageProps {
	user?: User;
}

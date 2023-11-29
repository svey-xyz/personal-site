export interface taxonomy {
	title: string,
}

export interface project {
	title: string,
	description: string,
	created: string,
	updated: string,
	website: string,
	taxonomies: Array<taxonomy>,
	gitHubURL: string
}

export interface user {
	name: string,
	bio: string, /** A short description */
	email?: string,
	about: string, /** A long description */
	socials?: Array<social>,
	featured?: Array<project>,
}

export interface social {
	provider: string,
	url: string
}
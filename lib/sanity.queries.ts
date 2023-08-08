import { groq } from "next-sanity";

// /** INTERFACES */
// interface Base {
// 	_createdAt: string,
// 	_id: string,
// 	_rev: string,
// 	_type: string,
// 	_updatedAt: string,

// }

// export interface SettingsInterface extends Base {
// 	title?: string,
// 	description?: any[]
// }

/** QUERIES */
export const settingsQuery: string = groq`
	*[_id == "siteSettings"][0]
`
export const aboutQuery: string = groq`
	*[_id == "about"] {
		"curriculumVitaeURL": curriculumVitae.asset->url,
		...
	}[0]
`

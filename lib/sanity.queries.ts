import { groq } from "next-sanity";

/** INTERFACES */

export interface Settings {
	title?: string,
	description?: any[]
}

/** QUERIES */
export const siteSettingsQuery = groq`
	*[_id == "siteSettings"][0]
`
export const aboutQuery = groq`
	*[_id == "about"] {
		"curriculumVitaeURL": curriculumVitae.asset->url,
		...
	}[0]
`

import { groq } from "next-sanity";

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

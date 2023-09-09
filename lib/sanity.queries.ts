import { siteSettings } from "@/sanityStudio/schemas/settings/siteSettings";
import { groq } from "next-sanity";
import { Image } from "sanity";

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
interface basicQuery {
	_updatedAt: string,
	_createdAt: string,
	_rev: string,
	_type: string,
	_id: string
}
/** */
export interface siteSettings extends basicQuery {
	title: string,
	description: Array<{}>,
	logo: Image,
	signature: Image
}

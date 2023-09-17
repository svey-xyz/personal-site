import { groq } from "next-sanity";
import { Image, ImageAsset, PortableTextBlock } from "sanity";

/** QUERIES */
export const settingsQuery: string = groq`
	*[_id == "siteSettings"][0] {
		...,
		logo {
			...,
			"imageAsset":asset->{
				...,
				metadata,
			}
		}
	}
`
export const aboutQuery: string = groq`
	*[_id == "about"] {
		...,
		signature {
			...,
			"imageAsset":asset-> {
				...,
				metadata,
			}
		},
		
	}[0]
`

export interface basicObjectData {
	_key: string,
	_type: string,
}

export interface basicDocumentData {
	_updatedAt: string,
	_createdAt: string,
	_rev: string,
	_type: string,
	_id: string
}

export interface sanityImageAsset extends Image {
	imageAsset: ImageAsset
}

export interface socialData extends basicObjectData {
	socialType: string,
	socialTitle: string,
	url: string,
}

export interface settingsData extends basicDocumentData {
	title: string,
	description: string,
	summary: PortableTextBlock,
	logo: sanityImageAsset,
	keywords: Array<string>,
	signature: Image
}

export interface aboutData extends basicDocumentData {
	name: string,
	alias: string,
	email: string,
	socials: Array<socialData>,
	bio: PortableTextBlock,
	signature: sanityImageAsset,
}

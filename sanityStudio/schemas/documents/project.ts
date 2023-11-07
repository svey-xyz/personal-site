import { defineType, defineField, defineArrayMember } from "sanity";
import { basicDocumentConstructor } from "@/sanityStudio/lib/basicDocumentConstructor";

import { BookmarkIcon } from "@heroicons/react/24/solid";

import { textObject } from '@schemas/objects/text'

export const _projectObjects = [textObject]
export const projectObjectsList = defineType({
	name: 'projectObjectsList',
	type: 'array',
	of: [
		defineArrayMember({ type: textObject.name }),
	],
})

export const project = basicDocumentConstructor({
	name: 'project',
	contentFields: [
		defineField({
			title: 'Github',
			name: 'github',
			type: 'url',
			group: 'projectSettings',
			validation: Rule => Rule.uri({
				scheme: ['https']
			}).custom(github => {
				return github?.startsWith('https://github.com') ? true : 'This does not appear to be a GitHub link'
			}),
			description: 'The main GitHub repo for the project. If there are additional repos add them to the external links',
		}),
		defineField({
			title: 'Content',
			name: 'content',
			type: 'projectObjectsList',
			description: 'The main content of the project.',
		})],
	icon: BookmarkIcon
})

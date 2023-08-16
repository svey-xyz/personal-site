import { defineType, defineField } from "@sanity-typed/types";
import { BiLink } from 'react-icons/bi';

export const link = defineType({
	title: 'Link',
	name: 'link',
	description: 'External link.',
	icon: BiLink,
	type: 'object',
	fields: [
		defineField({
			title: 'Link Text',
			name: 'text',
			type: 'string',
			description: 'The text to display the link. If none is set the full URL will be visible.',
		}),
		defineField({
			title: 'URL',
			name: 'url',
			type: 'url',
			validation: Rule => Rule.required()
		}),

	],
	preview: {
		select: {
			title: 'text',
			url: 'url'
		},
		prepare(value: any) {
			return {
				title: value.title ? value.title : `Link text not set.`,
				subtitle: value.url,
				media: BiLink
			}
		}
	}
})
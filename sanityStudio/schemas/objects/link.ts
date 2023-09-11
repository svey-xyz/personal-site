import { LinkIcon } from "@heroicons/react/24/solid";
import { defineType, defineField } from "sanity";

export const link = defineType({
	title: 'Link',
	name: 'link',
	description: 'External link.',
	icon: LinkIcon,
	type: 'object',
	fields: [
		defineField({
			title: 'Link Type',
			name: 'type',
			type: 'string',
			options: {
				list: [
					{ title: 'Repo', value: 'repo' },
					{ title: 'Website', value: 'website' },
					{ title: 'Other', value: 'other' }
				],
			}
		}),
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
			url: 'url',
			type: 'type'
		},
		prepare(value) {
			const capitalType = value.type ? value.type[0].toUpperCase() + value.type.slice(1) : undefined
			const linkText = (value.title && capitalType) ? `${capitalType} | ${value.title}` : (value.title) ? value.title : undefined;
			return {
				title: linkText ? linkText : value.url,
				subtitle: linkText ? value.url : '',
				media: LinkIcon
			}
		}
	}
})
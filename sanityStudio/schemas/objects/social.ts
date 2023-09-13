import { AtSymbolIcon } from "@heroicons/react/24/solid";
import { defineType, defineField } from "sanity";

const socialTypes = [
	{ title: 'Instagram', value: 'instagram' },
	{ title: 'Vimeo', value: 'vimeo' },
	{ title: 'LinkedIn', value: 'linkedin' },
	{ title: 'GitHub', value: 'github' },
	{ title: 'Mastodon', value: 'mastodon' },
]

export const social = defineType({
	title: 'Social',
	name: 'social',
	description: 'Link to a social platform.',
	icon: AtSymbolIcon,
	type: 'object',
	fields: [
		defineField({
			title: 'Social Type',
			name: 'socialType',
			type: 'string',
			options: {
				list: socialTypes,
			},
			validation: Rule => Rule.required()
		}),
		defineField({
			title: 'Social Title',
			name: 'socialTitle',
			type: 'string',
			description: 'The title associated with the account prefixed with the address sign (e.g. @username)',
			validation: Rule => Rule.required()
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
			title: 'socialTitle',
			type: 'socialType'
		},
		prepare(value: any) {
			const socialSiteTypeTitle = value.type && socialTypes.flatMap(option => option.value === value.type ? [option.title] : [])

			return {
				title: `${socialSiteTypeTitle}`,
				subtitle: value.title,
				media: AtSymbolIcon
			}
		}
	}
})
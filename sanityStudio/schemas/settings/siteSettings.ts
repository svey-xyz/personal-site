import {
	defineArrayMember,
	defineField,
	defineType,
} from "sanity";

export const siteSettings = defineType({
	title: 'Settings',
	name: 'siteSettings',
	type: 'document',
	fields: [
		defineField({
			title: 'Title',
			name: 'title',
			type: 'string',
			validation: Rule => Rule.required().error(`This site needs a fun name!`)
		}),
		defineField({
			title: 'Description',
			name: 'description',
			type: 'string',
			description: 'Concise description of the site, used primarily for SEO and metadata.',
		}),
		defineField({
			title: 'Keywords',
			name: 'keywords',
			type: 'array',
			of: [
				defineArrayMember({
					type: 'string',
				})
			],
		}),
		defineField({
			title: 'Summary',
			name: 'summary',
			type: 'basicBlockContent',
			description: 'More detailed description, displayed in the frontend.',
		}),
	],
	preview: {
		select: {
			title: 'title',
			// message: 'successMessage'
		},
		prepare(value: any) {
			return {
				title: `${value.title ? value.title : 'Site Settings'}`
			}
		}
	}
})

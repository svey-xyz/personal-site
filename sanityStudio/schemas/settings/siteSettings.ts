import {
	defineField,
	defineType,
} from "sanity";

export const siteSettings = defineType({
	title: 'Site Settings',
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
			type: 'basicBlockContent',
			description: 'Concise description of the site.',
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

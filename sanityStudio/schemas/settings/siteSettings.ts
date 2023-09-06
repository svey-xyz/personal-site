import {
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
			type: 'basicBlockContent',
			description: 'Concise description of the site.',
		}),
		defineField({
			title: 'Logo',
			name: 'logo',
			type: 'image',
			description: 'Site logo displayed in header. Ideally an SVG. If no logo is provided text of the site name will appear in the header.',
			// validation: Rule => Rule.required()
		}),
		defineField({
			title: 'Signature',
			name: 'signature',
			type: 'image',
			description: 'Signature used across the site.',
			// validation: Rule => Rule.required()
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

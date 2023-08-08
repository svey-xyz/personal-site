import {
	defineField,
	defineType,
} from "@sanity-typed/types";

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
			type: 'text',
			description: 'Concise description of the site.',
			validation: Rule => [
				Rule.required(),
				Rule.min(45).warning("Try to be more descriptive."),
				Rule.max(200).warning("This may be too descriptive!")
			]
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

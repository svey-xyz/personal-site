import {
	defineArrayMember,
	defineField,
	defineType,
} from "sanity";

export const about = defineType({
	title: 'About',
	name: 'about',
	type: 'document',
	fields: [
		defineField({
			title: 'Name',
			name: 'name',
			type: 'string',
			validation: Rule => Rule.required()
		}),
		defineField({
			title: 'Alias',
			name: 'alias',
			type: 'string',
		}),
		defineField({
			title: 'Socials',
			name: 'socials',
			type: 'array',
			of: [
				defineArrayMember({
					type: 'social',
				})
			],
		}),
		defineField({
			title: 'Bio',
			name: 'bio',
			type: 'basicBlockContent',
		}),
		defineField({
			title: 'Signature',
			name: 'signature',
			type: 'image',
			description: 'Signature used across the site.',
		}),
	],
	preview: {
		select: {
			name: 'name',
			alias: 'alias',
			bio: 'bio',
		},
		prepare(value: any) {
			return {
				title: value.alias ? value.alias : value.name ? value.name : 'About',
				description: value.bio,
			}
		}
	}
})

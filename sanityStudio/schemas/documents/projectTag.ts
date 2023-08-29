import { FaTags } from 'react-icons/fa';
import { defineField, defineType } from '@sanity-typed/types';

export const projectTag = defineType({
	title: 'Project Tags',
	name: 'projectTag',
	type: 'document',
	icon: FaTags,
	fields: [
		defineField({
			title: 'Title',
			name: 'title',
			type: 'string',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			title: 'Description',
			name: 'description',
			type: 'string'
		})
	],
})
import { defineType, defineField, defineArrayMember } from "@sanity-typed/types";
import { mediaAssetSource } from "sanity-plugin-media";

import { AiFillFileImage } from 'react-icons/ai';
import { BsFillImageFill } from "react-icons/bs";

export const project = defineType({
	title: "Projects",
	name: "project",
	type: 'document',
	icon: AiFillFileImage,
	groups: [
		{
			name: 'projectSettings',
			title: 'Project Settings',
		},
		{
			name: 'projectContent',
			title: 'Project Content',
		},
	],
	fields: [
		defineField({
			title: 'Title',
			name: 'title',
			type: 'string',
			group: 'projectSettings',
			description: 'Title of the project.',
			validation: (Rule) => [
				Rule.required().error("Project needs a title!"),
			]
		}),
		defineField({
			title: 'Hidden',
			name: 'hidden',
			type: 'boolean',
			description: 'Defines the visibility of the project in an archive.',
			initialValue: false
		}),
		defineField({
			title: 'Date',
			name: 'date',
			type: 'date',
			group: 'projectSettings',
			validation: (Rule) => [
				Rule.required().warning("Projects should have a date!"),
			]
		}),
		defineField({
			title: 'Project Description',
			name: 'description',
			type: 'blockContent',
			group: 'projectSettings',
			description: 'A description of the project.',
		}),
		defineField({
			title: 'Tags',
			name: 'tags',
			type: 'array',
			group: 'projectSettings',
			of: [
				defineArrayMember({
					type: 'reference',
					to: [{ type: 'projectTag' }]
				})
			]
		}),
		defineField({
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			options: {
				source: 'title',
				maxLength: 96,
			},
		}),
		defineField({
			name: 'thumbnail',
			title: 'Thumbnail',
			type: 'image',
			options: {
				hotspot: true,
			},
			fields: [
				{
					name: 'alt',
					type: 'string',
					title: 'Alternative Text',
				}
			]
		}),
		// defineField({
		// 	title: 'Content',
		// 	name: 'content',
		// 	type: 'projectTypes',
		// 	group: 'projectContent',
		// 	description: 'The main content of the project.',
		// })
	],
	preview: {
		select: {
			title: 'title',
			thumbnail: 'thumbnail'
		},
		prepare(value: any) {
			return {
				title: value.title,
				media: value.thumbnail
			}
		}
	},
	orderings: [
		{
			title: 'Date Descending',
			name: 'dateDesc',
			by: [
				{ field: 'date', direction: 'desc' }
			]
		},
		{
			title: 'Date Ascending',
			name: 'dateAsc',
			by: [
				{ field: 'date', direction: 'asc' }
			]
		},
	]
});
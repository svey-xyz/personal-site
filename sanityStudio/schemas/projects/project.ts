import { defineType, defineField, defineArrayMember } from "@sanity-typed/types";
import { mediaAssetSource } from "sanity-plugin-media";

import { AiFillFileImage } from 'react-icons/ai';

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
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			options: {
				source: 'title',
				maxLength: 96,
			},
		}),
		defineField({
			title: 'Thumbnail',
			name: 'thumbnail',
			type: 'image',
			options: {
				sources: [mediaAssetSource]
			},
			group: 'projectSettings',
			description: 'Thumbnail for the project, this does not appear in the project content unless you add the image there as well.',
			validation: Rule => Rule.required()
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
			title: 'Github',
			name: 'github',
			type: 'url',
			group: 'projectSettings',
			validation: Rule => Rule.uri({
				scheme: ['https']
			}).custom(github => {
				return github?.startsWith('https://github.com') ? true : 'This does not appear to be a GitHub link'
			}),
			description: 'The main GitHub repo for the project. If there are additional repos add them to the external links',
		}),
		defineField({
			title: 'Links',
			name: 'links',
			type: 'array',
			group: 'projectSettings',
			of: [
				defineArrayMember({
					type: 'link'
				})
			],
			description: 'All relevant links for the project.'
		}),
		defineField({
			title: 'Content',
			name: 'content',
			type: 'projectObjects',
			group: 'projectContent',
			description: 'The main content of the project.',
		})
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
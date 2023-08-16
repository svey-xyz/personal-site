import { defineType, defineField } from "@sanity-typed/types";
import { RiFilmFill } from "react-icons/ri";

export const video = defineType({
	title: 'Video',
	name: 'video',
	type: 'object',
	icon: RiFilmFill,
	fields: [
		defineField({
			name: 'url',
			type: 'url',
			title: 'Link to the video.',
			description: 'Works with Vimeo and YouTube.',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			title: 'Title',
			name: 'title',
			type: 'string',
			description: 'Title of the video.'
			// validation: Rule => Rule.required()
		}),
		defineField({
			title: 'Description',
			name: 'description',
			type: 'string',
			description: 'A brief description of the embed, this could be the content, the medium, etc.'
			// validation: Rule => Rule.required()
		}),
		defineField({
			title: 'Date',
			name: 'date',
			type: 'date',
		}),
	],
	preview: {
		select: {
			title: 'title',
			url: 'url'
		},
		prepare(value: any) {
			return {
				title: value.title ? value.title : 'Video',
				subtitle: `URL: ${value.url}`,
				media: RiFilmFill
			}
		}
	}
})
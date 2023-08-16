import { defineType, defineField } from "@sanity-typed/types";
import { ImEmbed2 } from "react-icons/im";

export const embedObject = defineType({
	title: 'Embed',
	name: 'embedObject',
	type: 'object',
	icon: ImEmbed2,
	fields: [
		defineField({
			name: 'url',
			type: 'url',
			title: 'Link to the content to be embedded.',
			// description: 'Tested working with: Vimeo, YouTube, Instagram, Twitter, and more.',
			validation: (Rule) => Rule.required()
		}),

		defineField({
			title: 'Embed Type',
			name: 'embedType',
			type: 'string',
			description: <>
				<p>The Embed Type field must use a proper MIME type you can read more <a href="https://developer.mozilla.org/en-US/docs/Glossary/MIME_type" target="_blank" >here</ a >.</p>
				<p>Some examples include: <i>video/webm</i>, <i>text/html</i>, etc</p>
			</>,
		}),
		defineField({
			title: 'Height',
			name: 'height',
			type: 'number',
			description: 'The height of the embed in pixels.',
			initialValue: 400,
			validation: Rule => Rule.required()
		}),
		defineField({
			title: 'Width',
			name: 'width',
			type: 'number',
			description: 'The width of the embed as a percent of screen width. 100% for full width embeds.',
			initialValue: 100,
			validation: Rule => Rule.required().max(100).positive()
		}),
		defineField({
			title: 'Title',
			name: 'title',
			type: 'string',
			description: 'Title of the embed.'
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
			textType: 'textType',
			url: 'url'
		},
		prepare(value: any) {
			return {
				title: 'Embedded Content',
				subtitle: `URL: ${value.url}`,
				media: ImEmbed2
			}
		}
	}
})
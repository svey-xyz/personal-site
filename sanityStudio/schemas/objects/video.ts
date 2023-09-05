import { defineType, defineField } from "@sanity-typed/types";
import { RiFilmFill } from "react-icons/ri";

export const video = defineType({
	title: 'Video',
	name: 'video',
	type: 'object',
	icon: RiFilmFill,
	fields: [
		defineField({
			title: 'Title',
			name: 'title',
			type: 'string',
		}),
		defineField({
			title: 'Description',
			name: 'description',
			type: 'string',
		}),
		defineField({
			title: 'Video',
			name: 'video',
			type: 'mux.video',
		})
	],
	preview: {
		select: {
			title: 'title',
			desc: 'description'
		},
		prepare(value: any) {
			return {
				title: value.title ? value.title : 'Untitled Video',
				subtitle: value.desc ? value.desc : `no description`,
				media: RiFilmFill
			}
		}
	}
})
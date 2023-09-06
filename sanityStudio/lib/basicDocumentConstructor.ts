import { camelCaseToWords } from "@/lib/stringFunctions";
import { defineField, defineType } from "sanity";
import { IconType } from "react-icons";
import { BsFileEarmarkRichtextFill } from "react-icons/bs";
import { IoMdOptions } from "react-icons/io";

export function basicDocumentConstructor(args: {name: string, contentFields: Array<any>, icon?: IconType | undefined}) {
	const { name, contentFields, icon} = args
	contentFields.forEach(field => {
		field.fieldset = 'content'
		field.group = 'content'
	});

	return defineType({
		title: camelCaseToWords(name),
		name: name,
		type: 'document',
		icon: icon,
		fieldsets: [
			{
				name: 'content',
				title: 'Content',
				options: { collapsible: true },
			}
		],
		groups: [
			{
				name: 'options',
				title: 'Options',
				icon: IoMdOptions
			},
			{
				name: 'content',
				title: 'Content',
				icon: BsFileEarmarkRichtextFill
			},
		],
		fields: [
			defineField({
				title: 'Basic Document Fields',
				name: 'basicDocumentOptions',
				type: 'basicDocumentOptions',
				group: 'options'
			}),
			...contentFields
		],
		preview: {
			select: {
				title: 'title',
				thumbnail: 'thumbnail'
			},
			prepare(value: any) {
				return {
					title: value.title,
					media: value.thumbnail ? value.thumbnail : icon
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
	})
}
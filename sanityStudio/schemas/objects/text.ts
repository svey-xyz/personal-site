import { Bars3BottomLeftIcon } from "@heroicons/react/24/solid";
import { defineType, defineField, defineArrayMember } from "sanity";

const textBlockTypes = [
	{ title: 'Plain', value: 'plain' },
	// { title: 'Highlighted', value: 'highlighted' },
	// { title: 'Block', value: 'block' },
]

export const textObject = defineType({
	title: 'Text',
	name: 'textObject',
	type: 'object',
	icon: Bars3BottomLeftIcon,
	fields: [
		defineField({
			title: 'Text',
			name: 'text',
			type: 'array',
			of: [
				defineArrayMember({
					type: 'block'
				})
			],
		}),
		defineField({
			title: 'Text Type',
			name: 'textType',
			type: 'string',
			description: 'The type of text.',
			options: {
				list: textBlockTypes,
				layout: 'radio',
			},
			initialValue: 'plain',
			validation: Rule => Rule.required()
		})
	],
	preview: {
		select: {
			blocks: 'text',
			textType: 'textType'
		},
		prepare(value: any) {
			const block = (value.blocks || []).find((block: any) => block._type === 'block')
			const textBlockTypeTitle = value.textType && textBlockTypes.flatMap(option => option.value === value.textType ? [option.title] : [])

			return {
				title: block ?
					block.children.filter((child: any) => child._type === 'span').map((span: any) => span.text).join('') :
					'No text entered',
				subtitle: `Text Block Style: ${textBlockTypeTitle}`,
				media: Bars3BottomLeftIcon
			}
		}
	}
})
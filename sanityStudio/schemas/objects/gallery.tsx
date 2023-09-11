import { defineType, defineField, defineArrayMember } from "sanity";
import { mediaAssetSource } from "sanity-plugin-media";
import { PhotoIcon, Squares2X2Icon } from "@heroicons/react/24/solid";

export const gallery = defineType({
	title: 'Gallery',
	name: 'gallery',
	type: 'object',
	icon: Squares2X2Icon,
	fields: [
		defineField({
			title: 'Editing Image Data',
			name: 'imageNote0',
			type: 'note',
			description: <>To edit an image's <i>Name</i>, <i>Alt Text</i>, or <i>Description</i> head to the <i>Media</i> tab or click on the name of the file in the media browser.</>,
			options: {
				icon: PhotoIcon,
				tone: 'primary',
			}
		}),
		defineField({
			title: 'Image Data Fields',
			name: 'imageNote1',
			type: 'note',
			description: <>
					<p><b>Title</b>: should be the title of the image.</p>
					<p><b>Alt Text</b>: should be a description of what is shown in the image and is used for accessibility.</p>
					<p><b>Description</b>: can be a description of the medium, process, or anything else and will appear next to the image with the title.</p>
				</>,
			options: {
				icon: PhotoIcon,
				tone: 'caution',
			}
		}),
		defineField({
			title: 'Gallery',
			name: 'gallery',
			type: 'array',
			of: [
				defineArrayMember({
					type: 'image',
					options: {
						sources: [mediaAssetSource]
					},
					preview: {
						select: {
							asset: 'asset',
							title: 'asset.title',
							description: 'asset.description'

						},
						prepare(value: any) {
							return {
								title: value.title ? value.title : 'Untitled Gallery Image',
								subtitle: value.description,
								media: value.asset
							}
						}
					}
				})
			]
		}),
	],
	preview: {
		select: {
			title: 'title',
			description: 'description'
		},
		prepare(value) {
			return {
				title: 'Gallery',
				subtitle: 'A gallery of images.',
				media: Squares2X2Icon
			}
		}
	}
})
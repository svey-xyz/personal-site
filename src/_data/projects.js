const sanityFetch = require("../../lib/utils/sanityFetch");
const groq = require('groq')

const serializers = require('../../lib/utils/serializers')
const BlocksToMarkdown = require('@sanity/block-content-to-markdown')
const imageURL = require('../../lib/utils/imageURL')
const client = require('../../lib/utils/sanityClient.js')

module.exports = async () => {
	const filter = groq`*[_type == "project"]`
	const projection = groq`{
			title,
			date,
			blurb,
			"tags":projectTags[]->title,
			thumbnail,
			description,
			content[]{
				...,
				children[]{
					...
				}
			}
		}`

	const order = `| order(publishedAt asc)`
	const query = [filter, projection, order].join(' ').toString()
	const data = await sanityFetch('projects', query)

	const preparePosts = data.map(generateContent);
	
	return preparePosts;
}

function generateContent(post) {
	return {
		...post,
		thumbnail: imageURL(post.thumbnail),
		description: BlocksToMarkdown(post.description, { serializers, ...client.config() }),
		content: BlocksToMarkdown(post.content, { serializers, imageOptions: { w: 1080, h: 1080, fit: 'max' }, ...client.config() })
	}
}
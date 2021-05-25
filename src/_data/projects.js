const sanityFetch = require("../../lib/utils/sanityFetch");
const groq = require('groq')

const serializers = require('../../lib/utils/serializers')
const BlocksToMarkdown = require('@sanity/block-content-to-markdown')
const imageURL = require('../../lib/utils/imageURL')
const client = require('../../lib/utils/sanityClient.js')

module.exports = async () => {
	const query = groq`{
		"work":*[_type == "project"]{
			title,
			"slug":slug.current,
			date,
			blurb,
			"tags":projectTags[]->{...},
			thumbnail,
			description,
			content[],
			links[] {
				title,
				url
			}
		},
		"tags":*[_type == "projectTag"]{...}
	}`

	// const order = `| order(publishedAt asc)`
	// const query = [filter, projection, order].join(' ').toString()
	const data = await sanityFetch('projects', query)

	// const preparePosts = data.map(generateContent);
	
	return data;
}

function generateContent(post) {
	return {
		...post,
		thumbnail: imageURL(post.thumbnail),
		description: BlocksToMarkdown(post.description, { serializers, ...client.config() }),
		content: BlocksToMarkdown(post.content, { serializers, ...client.config() })
	}
}
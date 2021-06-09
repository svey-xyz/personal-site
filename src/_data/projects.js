const sanityFetch = require("../../lib/utils/sanity/sanityFetch");
const groq = require('groq')

module.exports = async () => {
	const query = groq`{
		"work":*[_type == "project"]{
			...,
			"slug":slug.current,
			projectTags[]->,
			client->,
		} | order(date desc),
		"tags":*[_type == "projectTag"]{...}
	}`

	// const order = `| order(publishedAt asc)`
	// const query = [filter, projection, order].join(' ').toString()
	const data = await sanityFetch('projects', query)

	// const preparePosts = data.map(generateContent);
	
	return data;
}

// function generateContent(post) {
// 	return {
// 		...post,
// 		thumbnail: imageURL(post.thumbnail),
// 		description: BlocksToMarkdown(post.description, { serializers, ...client.config() }),
// 		content: BlocksToMarkdown(post.content, { serializers, ...client.config() })
// 	}
// }
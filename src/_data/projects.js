const serializers = require('../../lib/utils/serializers')
const groq = require('groq')
const BlocksToMarkdown = require('@sanity/block-content-to-markdown')
const overlayDrafts = require('../../lib/utils/overlayDrafts')

const client = require('../../lib/utils/sanityClient.js')
const hasToken = !!client.config().token

const fs = require('fs'); 

function generatePost(post) {
	return {
		...post,
		content: BlocksToMarkdown(post.content, { serializers, ...client.config() })
	}
}

async function getPosts() {
	const filter = groq`*[_type == "project"]`
	const projection = groq`{
			title,
			date,
			description,
			tags,
			content[]{
				...,
				children[]{
					...
				}
			}
		}`

	const order = `| order(publishedAt asc)`
	const query = [filter, projection, order].join(' ').toString()

	const docs = await client.fetch(query).catch(err => console.error(err))
	const reducedDocs = overlayDrafts(hasToken, docs)
	const preparePosts = reducedDocs.map(generatePost)

	fs.writeFileSync('./cachedContent.json', JSON.stringify(preparePosts), 'utf8', (err) => {
		if (err) return console.log(err);
	});

	return preparePosts
}

module.exports = async () => {

	// Limits API calls to Sanity while rebuilding multiple times for testing
	const cache = true;
	let projectData

	if (!cache) projectData = getPosts();
	else projectData = JSON.parse(fs.readFileSync('./cachedContent.json', 'utf8', function (err, data) {
		if (err) throw err;
		return data
	}));

	// console.log(projectData)

	return projectData;
}
const serializers = require('../../lib/utils/serializers')
const BlocksToMarkdown = require('@sanity/block-content-to-markdown')
const overlayDrafts = require('../../lib/utils/overlayDrafts')

const client = require('../../lib/utils/sanityClient.js')
const hasToken = !!client.config().token

const fs = require('fs'); 

module.exports = async (dataName, query) => {

	if (process.env.ELEVENTY_ENV == "production") return networkFetch(dataName, query);
	else return readCache(dataName, query);

}

async function networkFetch(dataName, query) {
	const docs = await client.fetch(query).catch(err => console.error(err))
	const reducedDocs = overlayDrafts(hasToken, docs)
	let preparePosts

	if (Array.isArray(reducedDocs)) preparePosts = reducedDocs.map(generatePost)
	else preparePosts = generatePost(reducedDocs)

	fs.writeFile(`./cache/cached-${dataName}.json`, JSON.stringify(preparePosts), 'utf8', (err) => {
		if (err) return console.log(err);
	});

	return preparePosts;
} 

function readCache(dataName) {
	return JSON.parse(fs.readFileSync(`./cache/cached-${dataName}.json`, 'utf8', function (err, data) {
		if (err) throw err;
		return data
	}));
}

function generatePost(post) {
	return {
		...post,
		content: BlocksToMarkdown(post.content, { serializers, ...client.config() })
	}
}
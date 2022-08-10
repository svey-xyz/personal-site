const overlayDrafts = require('./overlayDrafts')

const client = require('./sanityClient')
const hasToken = !!client.config().token

module.exports = async (dataName, query) => {
	const data = await networkFetch(query)
	
	return data;
}

async function networkFetch(query) {
	const docs = await client.fetch(query).catch(err => console.error(err))
	const reducedDocs = overlayDrafts(hasToken, docs)

	return reducedDocs;
} 
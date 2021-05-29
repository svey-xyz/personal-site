const overlayDrafts = require('./overlayDrafts.js')

const client = require('./sanityClient.js')
const hasToken = !!client.config().token

const fs = require('fs'); 

module.exports = async (dataName, query) => {

	if (process.env.NODE_ENV == "production") {
		var data = await networkFetch(query)

		writeCache(dataName, data)
		
		return data;
	}
	else {
		return readCache(dataName, query);
	}
}

async function networkFetch(query) {
	const docs = await client.fetch(query).catch(err => console.error(err))
	const reducedDocs = overlayDrafts(hasToken, docs)

	return reducedDocs;
} 

function writeCache(dataName, data) {
	fs.mkdir('cache/', { recursive: true }, (err) => {
		if (err) return console.log(err);

		fs.writeFile(`./cache/cached-${dataName}.json`, JSON.stringify(data), 'utf8', (err) => {
			if (err) return console.log(err);
		});
	});
}

function readCache(dataName) {
	return JSON.parse(fs.readFileSync(`./cache/cached-${dataName}.json`, 'utf8', function (err, data) {
		if (err) throw err;
		return data
	}));
}
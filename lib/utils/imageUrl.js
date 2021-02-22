const imageUrl = require('@sanity/image-url')
const sanityClient = require('./sanityClient')
const builder = imageUrl(sanityClient)

// Learn more: https://www.sanity.io/docs/asset-pipeline/image-urls
function urlFor(source) {
	return builder.image(source).url()
}

module.exports = urlFor

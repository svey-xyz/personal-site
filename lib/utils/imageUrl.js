const imageUrl = require('@sanity/image-url')
const sanityClient = require('./sanityClient')
const builder = imageUrl(sanityClient)

// Learn more: https://www.sanity.io/docs/asset-pipeline/image-urls
function urlFor(source, size=1080) {
	return builder.image(source).width(size).url()
}

module.exports = urlFor

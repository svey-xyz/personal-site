// Sanity tools
const BlocksToMarkdown = require('@sanity/block-content-to-markdown')

const serializers = require('../utils/sanity/serializers')
const client = require('../utils/sanity/sanityClient')

module.exports = (sanityBlcoks) => {
	return BlocksToMarkdown(sanityBlcoks, { serializers, ...client.config() })
}
const groq = require('groq')
const BlocksToMarkdown = require('@sanity/block-content-to-markdown')
const client = require('../../lib/utils/sanityClient.js')
const serializers = require('../../lib/utils/serializers')
const overlayDrafts = require('../../lib/utils/overlayDrafts')

const hasToken = !!client.config().token

function generateAuthor (author) {
  return {
    ...author,
    bio: BlocksToMarkdown(author.bio, { serializers, ...client.config() })
  }
}

async function getAuthors () {
  const filter = groq`*[_type == "author"]`
  const docs = await client.fetch(filter).catch(err => console.error(err))
  const authors = docs.map(generateAuthor)
  const reducedAuthors = overlayDrafts(hasToken, authors)
  return reducedAuthors
}

module.exports = getAuthors

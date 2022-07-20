// Sanity tools
const BlocksToMarkdown = require('@sanity/block-content-to-markdown')
// const toHTML = require('@portabletext/to-html')

const serializers = require('../utils/sanity/serializers')
const client = require('../utils/sanity/sanityClient')

module.exports = async(sanityBlcoks) => {
	const toHTML = await import('@portabletext/to-html')

	const myPortableTextComponents = {
		marks: {
			link: ({ children, value }) => {
				// ⚠️ `value.href` IS NOT "SAFE" BY DEFAULT ⚠️
				// ⚠️ Make sure you sanitize/validate the href! ⚠️
				const href = value.href || ''

				if (uriLooksSafe(href)) {
					const rel = href.startsWith('/') ? undefined : 'noreferrer noopener'
					return html`<a href="${href}" rel="${rel}">${children}</a>`
				}

				// If the URI appears unsafe, render the children (eg, text) without the link
				return children
			},
		},
	}
	// console.log(sanityBlcoks)
	return toHTML.toHTML(sanityBlcoks, { myPortableTextComponents })
}
module.exports = async(sanityBlcoks) => {
	const htm = require('htm')
	const vhtml = require('vhtml')

	const html = htm.bind(vhtml)
	const toHTML = await import('@portabletext/to-html')

	const myPortableTextComponents = {
		marks: {
			link: ({ children, value }) => {
				// ⚠️ `value.href` IS NOT "SAFE" BY DEFAULT ⚠️
				// ⚠️ Make sure you sanitize/validate the href! ⚠️
				const href = value.href || ''

				if (toHTML.uriLooksSafe(href)) {
					const rel = href.startsWith('/') ? undefined : 'noreferrer noopener'
					return html`<a class="underline text-primary-accent hover:text-secondary-accent" href="${href}" target="_blank" rel="${rel}">${children}</a>`
				}

				// If the URI appears unsafe, render the children (eg, text) without the link
				return children
			},
		},
	}
	// console.log(sanityBlcoks)
	return toHTML.toHTML(sanityBlcoks, { components:myPortableTextComponents })
}
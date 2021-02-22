const BlocksToMarkdown = require('@sanity/block-content-to-markdown')

// Make Sanity's Portable Text something 11ty can understand
module.exports = {
	types: {
		vimeo: ({ node }) => {
			const { url } = node
			// const id = getYouTubeId(url)
			return (url)
		},
		block: ({ node }) => {
			return (`${BlocksToMarkdown(node)} {.className #id and=attributes}`)
			// return (`<span class="project-text">${BlocksToMarkdown(node)}</span>`)
		},
		// image: ({ node }) => {
		// 	return (`<span class="project-text">${BlocksToMarkdown(node)}</span>`)
		// },
		code: ({node}) => '```' + node.language + '\n' + node.code + '\n```'
  	}
}

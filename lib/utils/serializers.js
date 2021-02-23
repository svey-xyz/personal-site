const BlocksToMarkdown = require('@sanity/block-content-to-markdown')
const imageURL = require('../../lib/utils/imageURL')

// Make Sanity's Portable Text something 11ty can understand
module.exports = {
	types: {
		vimeo: ({ node }) => {
			const { url } = node
			// const id = getYouTubeId(url)
			return (url)
		},
		block: ({ node }) => {
			return (`<span class="project-text">${BlocksToMarkdown(node)}</span>`)
		},
		// image: ({ node }) => {
		// 	const url = imageURL(node)
		// 	// return (`<span class="project-image">${BlocksToMarkdown(node)}</span>`)
		// 	return (` <img class="project-img" src='${url}'/> `)
		// },
		code: ({node}) => '```' + node.language + '\n' + node.code + '\n```'
  	}
}

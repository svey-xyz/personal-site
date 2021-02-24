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
		image: ({ node }) => {
			const url = imageURL(node)
			// console.log(node)
			// return (`<span class="project-image">${BlocksToMarkdown(node)}</span>`)
			return (` <img src='${url}' class="project-img" /> `)
		},
		code: ({node}) => '```' + node.language + '\n' + node.code + '\n```'
  	}
}

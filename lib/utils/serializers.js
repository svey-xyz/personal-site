const imageURL = require('./imageURL.js')

// Make Sanity's Portable Text something 11ty can understand
module.exports = {
	types: {
		vimeo: ({ node }) => {
			const { url } = node
			// const id = getYouTubeId(url)
			return (url)
		},
		embed: ({ node }) => {
			return node.url // the URL is parsed by 'eleventy-plugin-embed-everything'
		},
		altImage: ({ node }) => {
			const url = imageURL(node.asset)
			const alt = node.alt

			return (` <img src='${url}' class='project-img' alt='${alt}'/> `)
		},
		projectText: ({ node }) => {
			const text = node.text

			return (`<p class='project-highlight-text'>${text}</p>`)
		},
		code: ({node}) => '```' + node.language + '\n' + node.code + '\n```'
  	}
}

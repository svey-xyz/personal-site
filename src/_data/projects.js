const sanityFetch = require("../../lib/utils/sanityFetch");
const groq = require('groq')

module.exports = async () => {
	const filter = groq`*[_type == "project"]`
	const projection = groq`{
			title,
			date,
			description,
			tags,
			content[]{
				...,
				children[]{
					...
				}
			}
		}`

	const order = `| order(publishedAt asc)`
	const query = [filter, projection, order].join(' ').toString()
	const data = sanityFetch('projects', query)

	return data;
}
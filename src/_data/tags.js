const sanityFetch = require("../../lib/utils/sanityFetch");
const groq = require('groq')

module.exports = async () => {
	const filter = groq`*[_type == "projectTag"]`
	const projection = groq`{
			title,
			description
		}`

	const order = `| order(publishedAt asc)`
	const query = [filter, projection, order].join(' ').toString()
	const data = sanityFetch('tags', query)

	return data;
}
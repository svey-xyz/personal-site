const sanityFetch = require("../../lib/utils/sanityFetch");
const groq = require('groq')

module.exports = async () => {
	const filter = groq`*[_id == "siteSettings"]`
	const projection = groq`{
			title,
	 		description,
	  		keywords,
	  		author
		}[0]`

	const query = [filter, projection].join(' ').toString()
	const data = sanityFetch('siteSettings', query)

	return data;
}
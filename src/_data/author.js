const sanityFetch = require("../../lib/utils/sanityFetch");
const groq = require('groq')

module.exports = async () => {
	const filter = groq`*[_id == "aboutMe"]`
	const projection = groq`{
			name,
	 		bio,
	  		content,
	  		avatar,
			email,
			social
		}[0]`

	const query = [filter, projection].join(' ').toString()
	const data = sanityFetch('aboutMe', query)

	return data;
}
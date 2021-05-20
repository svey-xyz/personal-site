const sanityFetch = require("../../lib/utils/sanityFetch");
const groq = require('groq')

module.exports = async () => {
	const filter = groq`*[_type == "page"]`
	const projection = groq`{
			title,
			"slug":select(
				*[_id == "navigation"]{
					"_id":homePage->_id
				}[0]._id == _id => "/",
				defined(slug) => slug,
				title
			),
			blurb,
			...pageContent {
				"template":condition,
				"content":select(
					condition == "defaultPage" => defaultPage,
					condition == "homePage" => homePage
				)
			}
		}`

	// const order = `| order(publishedAt asc)`
	const query = [filter, projection].join(' ').toString()
	const data = await sanityFetch('pages', query)

	return data.map(preProcessData);
}

function preProcessData(data) {
	return {
		...data,
		slug: data.slug == "/" ? "" : `/${data.slug}`
	}
}
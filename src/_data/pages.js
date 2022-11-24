const sanityFetch = require("../../lib/utils/sanity/sanityFetch");
const groq = require('groq')

module.exports = async () => {
	const defaultPageQuery = groq`{
			...,
			blocks[]{
				_type,
				...,
				_type == "projectsArchive" => {
					"tags":tags[]->{...},
				},
				_type == "itemCard" => {
                	"linkID":link->_id
              	}
          	}
		}`

	const homePageQuery = groq`{
			blocks[]{
				_type,
				...,
				_type == "projectsArchive" => {
					"tags":tags[]->{...},
				},
				_type == "itemCard" => {
                	"linkID":link->_id
              	}
          	}
		}`

	const filter = groq`*[_type == "page"]`
	const projection = groq`{
			_id,
			title,
			"slug":select(
				*[_id == "navigation"]{
					"_id":homePage->_id
				}[0]._id == _id => "/",
				slug.current
			),
			descriptiveTitle,
			description,
			"template":pageType,
			"content":select(
				pageType == "defaultPage" => defaultPage${defaultPageQuery},
				pageType == "homePage" => homePage${homePageQuery}
			)
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
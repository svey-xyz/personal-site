const sanityFetch = require("../../lib/utils/sanityFetch");
const groq = require('groq')

module.exports = async () => {
	const query = groq`{
		"siteSettings":*[_id == "siteSettings"]{
			title,
			description,
			keywords,
			author,
		}[0],
		"about":*[_id == "about"] {
			name,
			bio,
			content,
			avatar,
			email,
			socail
		}[0],
		"navigation":*[_id == "navigation"] {
			primaryNavigation[] {
				"slug":page->slug.current,
				"title":select(
					defined(title) => title,
					page->title
				)
			},
			"archivePageSlug":archivePage->slug.current
		}[0]
	}`

	const data = sanityFetch('siteSettings', query)

	return data;
}
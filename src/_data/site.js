const sanityFetch = require("../../lib/utils/sanity/sanityFetch");
const groq = require('groq')

module.exports = async () => {
	const accentColourNames = ['primaryAccent','secondaryAccent','mediumAccent','successAccent','failureAccent']
	const calculatedColourNames = ['secondaryBackground', 'oppositeBackground', 'primaryBorder']

	function queryCombiner(strings) {
		let fetchString = '';
		for (const name of strings) {
			fetchString += `"${name}": select(defined(${name}) => ${name}, ^.defaultTheme.${name}),`
		}
		return fetchString;
	}

	let darkColourCopyFetch = queryCombiner([...accentColourNames, ...calculatedColourNames])

	const query = groq`{
		"siteSettings":*[_id == "siteSettings"]{...}[0],
		"about":*[_id == "about"] {
			"curriculumVitaeURL": curriculumVitae.asset->url,
			...
		}[0],
		"navigation":*[_id == "navigation"] {
			primaryNavigation[] {
				"slug":page->slug.current,
				"title":select(
					defined(title) => title,
					page->title
				)
			},
			"archivePageSlug":archivePage->slug.current,
			"homePageSlug":homePage->slug.current
		}[0],
		"theme":*[_id == "theme"] {
			...,
			"defaultTheme":defaultTheme{
				...
			},
			"darkTheme":darkTheme {
				${darkColourCopyFetch}
				...
			}
		}[0]
	}`

	const data = sanityFetch('siteSettings', query)

	return data;
}
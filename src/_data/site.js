const groq = require('groq')
const client = require('../../lib/utils/sanityClient.js')

module.exports =  async function() {
  let siteSettings =  await client.fetch(groq`
    *[_id == "siteSettings"]{
      title,
	  description,
	  keywords,
	  author
    }[0]
  `)

  return siteSettings
}

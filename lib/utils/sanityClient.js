const sanityClient = require("@sanity/client");
const { api } = require('../../../studio/sanity.json')

module.exports = sanityClient({
	...api,
	useCdn: true,
	apiVersion: '2021-03-25'
});

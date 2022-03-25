const sanityClient = require("@sanity/client");
const { api } = {
	"api": {
		"projectId": process.env.SANITYPROJECTID,
		"dataset": process.env.SANITYDATASET
	}
}

module.exports = sanityClient({
	...api,
	useCdn: true,
	apiVersion: '2021-03-25'
});

const slugify = require("slugify");

const options = {
	replacement: "-",
	remove: /[&,+()$~%.'":*?<>{}]/g,
	lower: true
};

// Overwrite 11ty built in slug filter to allow for backslashes to remain
module.exports = (input) => {
	return slugify(input, options);
};
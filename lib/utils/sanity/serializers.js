// Make Sanity's Portable Text something 11ty can understand
module.exports = {
	types: {
		code: ({node}) => '```' + node.language + '\n' + node.code + '\n```'
  	}
}


module.exports = (email) => {

	return [email.slice(0, email.indexOf("@")), email.slice(email.indexOf("@"))];
}
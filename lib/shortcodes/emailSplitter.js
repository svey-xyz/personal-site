
module.exports = (email) => {
	let emailParts = []
	emailParts[0] = email.slice(0, email.indexOf("@"));
	emailParts[1] = email.slice(email.indexOf("@") + 1);

	emailParts[0].length < emailParts[1].length ? emailParts[0] = `${emailParts[0]}@` : emailParts[1] = `@${emailParts[1]}`
	console.log(emailParts)

	return emailParts;
}
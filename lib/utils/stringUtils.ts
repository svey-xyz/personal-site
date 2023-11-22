export function camelCaseToWords(string: string) {
	var words = string.match(/[A-Za-z][a-z]*/g) || [];

	return words.map(capitalize).join(" ");
}

export function capitalize(word: string) {
	return word.charAt(0).toUpperCase() + word.substring(1);
}
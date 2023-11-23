export class stringUtils {
	constructor() {
	}

	camelCaseToWords(string: string) {
		var words = string.match(/[A-Za-z][a-z]*/g) || [];

		return words.map(this.capitalize).join(" ");
	}		

	capitalize(word: string) {
		return word.charAt(0).toUpperCase() + word.substring(1);
	}
}

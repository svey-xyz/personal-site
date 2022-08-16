const Colour = require('color');

module.exports = (theme) => {
	const calculatedColourOverrideNames = ['secondaryBackground', 'darkerBackground', 'oppositeBackground', 'primaryBorder', 'mediumAccent']

	for (let key in theme) {
		if (!theme.hasOwnProperty(key)) continue;
		let themeColObj = theme[key];

		if (!themeColObj || !themeColObj._type || themeColObj._type != "color") continue;
		theme[key] = createColourObj(themeColObj);
		// console.log(themeColObj.hex)
	}

	for (const calcColName of calculatedColourOverrideNames) {
		if (!theme.calculatedColourOverride || !theme[calcColName]) {
			let calcCol;
			switch (calcColName) {
				case ('secondaryBackground'):
					calcCol = createColourObj(theme.primaryBackground).darken(0.1);
					break;
				case ('darkerBackground'):
					calcCol = createColourObj(theme.primaryBackground).darken(0.3);
					break;
				case ('oppositeBackground'):
					calcCol = createColourObj(theme.primaryBackground).negate();
					break;
				case ('primaryBorder'):
					calcCol = createColourObj(theme.primaryText);
					break;
				case ('mediumAccent'):
					calcCol = createColourObj(theme.primaryAccent).darken(0.2);
					break;
			}

			theme[calcColName] = calcCol;
		}
	}

	let themeString = constructString(theme)
	console.log(themeString)
	return themeString;
}

function constructString(theme) {
	let themeString = ``;

	for (let key in theme) {
		if (!theme.hasOwnProperty(key)) continue;
		let themeColObj = theme[key];

		if (!themeColObj || !themeColObj.color) continue;

		themeString += `--${key}: ${themeColObj.hex()}; `
	}

	return themeString;
}

function createColourObj(colourObj) {
	return Colour(colourObj.hex)
}
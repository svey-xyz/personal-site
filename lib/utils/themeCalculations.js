const Colour = require('color');

module.exports = (theme) => {
	let constructedTheme = {}
	const calculatedColourOverrideNames = ['secondaryBackground', 'darkerBackground', 'oppositeBackground', 'primaryBorder', 'mediumAccent']

	for (const calcColName of calculatedColourOverrideNames) {
		if (!theme.calculatedColourOverride || !theme[calcColName]) {
			let calcCol;
			switch (calcColName) {
				case ('secondaryBackground'):
					calcCol = createColourObj(theme.primaryBackground).darken(0.05);
					break;
				case ('darkerBackground'):
					calcCol = createColourObj(theme.primaryBackground).darken(0.1);
					break;
				case ('oppositeBackground'):
					calcCol = createColourObj(theme.primaryBackground).negate();
					break;
				case ('primaryBorder'):
					calcCol = createColourObj(theme.primaryText);
					break;
				case ('mediumAccent'):
					calcCol = createColourObj(theme.primaryAccent).darken(0.5);
					break;
			}

			for (let key in theme) {
				if (!theme.hasOwnProperty(key) || calculatedColourOverrideNames.includes(key)) continue;
				let themeColObj = theme[key];

				if (!themeColObj || !themeColObj._type || themeColObj._type != "color") continue;
				constructedTheme[key] = createColourObj(themeColObj);
			}

			constructedTheme[calcColName] = calcCol;
		}
	}

	let themeString = constructString(constructedTheme)
	// console.log(themeString)
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
var convert = require('color-convert');
const Colour = require('color');

module.exports = (data) => {
	// console.log(data)
	let theme = data.defaultTheme
	if (!theme.calculatedColourOverride) {
		const secondaryBackground = createColourObj(theme.primaryBackground)
		secondaryBackground.darken(0.1);
		theme.secondaryBackground = secondaryBackground;
	}
}

function createColourObj(colourObj) {
	return Colour(colourObj.hex)
}
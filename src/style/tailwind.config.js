const colors = require('tailwindcss/colors')

module.exports = {
	purge: {
		content: ["./src/_includes/**/*.njk"],
		options: {
			keyframes: true
		},
	},
	theme: {
		screens: {
			sm: '480px',
			md: '768px',
			lg: '976px',
			xl: '1440px',
		},
		colors: {
			gray: colors.coolGray,
			blue: colors.lightBlue,
			red: colors.rose,
			pink: colors.fuchsia,
		},
		fontFamily: {
			sans: ['Graphik', 'sans-serif'],
			serif: ['Merriweather', 'serif'],
		},
	},
	variants: {},
	plugins: [],
};
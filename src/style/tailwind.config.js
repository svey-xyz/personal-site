const colors = require('tailwindcss/colors')

module.exports = {
	mode: (process.env.NODE_ENV === 'production' ? '' : 'jit'),
	purge: {
		content: ["./src/_includes/layouts/**/*.njk", "./src/*.njk"],
		options: {
			keyframes: true
		},
	},
	theme: {
		screens: {
			sm: "480px",
			md: "768px",
			lg: "976px",
			xl: "1440px",
		},
		colors: {
			white: colors.white,
			black: colors.black,
			grey: colors.coolGray,
			blue: colors.lightBlue,
			red: colors.rose,
			pink: colors.fuchsia,

			primaryColour: 'var(--primary-colour)',
			secondaryColour: 'var(--secondary-colour)',
			accentColour: 'var(--accent-colour)',
			charcoal: '#3B454E',
			textColour: '#3B454E'
		},
		boxShadow: {
			DEFAULT: '0 0px 6px -1px rgba(0,0,0,0.1), 0 0px 5px -1px rgba(0,0,0,.06)',
		},
		fontFamily: {
			sans: ['Graphik', 'sans-serif'],
			serif: ['Merriweather', 'serif'],
		},
	},
	variants: {
		extend: {
			fontWeight: ['hover'],

		}
	},
	plugins: [],
};
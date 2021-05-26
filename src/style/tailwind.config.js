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
		extend: {
			minWidth: {
				'0': '0',
				'1/4': '25%',
				'1/2': '50%',
				'3/4': '75%',
				'full': '100%',
				'sm': '12rem',
				'md': '20rem'
			},
			minHeight: {
				'3/5': '60%',
				'full': '100%',
			},
			maxHeight: {
				'3/5': '60%',
				'full': '100%',
			},
			colors: {
				primaryColour: 'var(--primary-colour)',
				secondaryColour: 'var(--secondary-colour)',
				accentColour: 'var(--accent-colour)',
				charcoal: '#3B454E',
				textColour: '#3B454E'
			},
			boxShadow: {
				DEFAULT: '0 0px 6px -1px rgba(0,0,0,0.1), 0 0px 5px -1px rgba(0,0,0,.06)',
				lg: '0 0px 12px -3px rgba(0,0,0,0.6), 0 0px 6px -1px rgba(0,0,0,.06)',
			},
			fontFamily: {
				heading: ['DM Serif Display', 'serif'],
				body: ['Montserrat', 'sans-serif']
			},
		}
	},
	variants: {
		extend: {
			fontWeight: ['hover'],

		}
	},
	plugins: [],
};
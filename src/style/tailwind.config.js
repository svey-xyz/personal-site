const textShadow = require('tailwindcss-textshadow')

module.exports = {
	darkMode: 'class',
	content: [
		"./src/_includes/layouts/**/*.njk",
		"./src/*.njk",
		"./lib/**/*.{ts,js}"
	],
	options: {
		keyframes: true
	},
	theme: {
		screens: {
			sm: "480px",
			md: "768px",
			lg: "976px",
			xl: "1440px",
		},
		extend: {
			maxWidth: {
				'prose-full': '85ch',
				'prose': '65ch',
				'prose-short': '45ch'
			},
			padding: {
				'16/9': '56.25%',
				'header': 'var(--header-padding)'
			},
			margin: {
				'1/8': '12%',
				'1/7': '15%',
				'1/5': '20%',
				'1/4': '20%',
				'1/3': '33%'
			},
			backgroundImage: {
			},
			colors: {
				'primary-bg': 'var(--primaryBackground)',
				'header-bg': 'var(--header-bg)',
				'opposite-bg': 'var(--oppositeBackground)',
				'primary-border': 'var(--primaryBorder)',
				'primary-text': 'var(--primaryText)',
				'secondary-bg': 'var(--secondaryBackground)',
				'primary-accent': 'var(--primaryAccent)',
				'secondary-accent': 'var(--secondaryAccent)',
				'medium-accent': 'var(--mediumAccent)',
				'failure-accent': 'var(--failureAccent)',
				'success-accent': 'var(--successAccent)',

				// 'mixed-accent': 'mix(var(--primaryAccent),  var(--secondaryAccent))',


			},
			boxShadow: {
				DEFAULT: '0 0px 6px -1px rgba(0,0,0,0.1), 0 0px 5px -1px rgba(0,0,0,.06)',
				lg: '0 0px 12px -3px rgba(0,0,0,0.6), 0 0px 6px -1px rgba(0,0,0,.06)',
				xl: '0 0px 15px -5px rgba(0,0,0,0.8), 0 0px 8px -1px rgba(0,0,0,.06)',
				'md-soft': '0 6px 8px -2px rgb(0 0 0 / 0.1), 0 4px 6px -3px rgb(0 0 0 / 0.1)',
				'inner-dark': 'inset 0 2px 4px 0 rgb(0 0 0 / 0.25)',
				'inner-xdark': 'inset 0 4px 8px 0 rgb(0 0 0 / 0.95)',
				'md-dark': ' 0 4px 6px -1px rgb(0 0 0 / 0.5), 0 2px 4px -2px rgb(0 0 0 / 0.5)'

			},
			textShadow: {
				'md-dark': '0px 1px 2px rgb(30 29 39 / 0.5), 1px 2px 4px rgb(54 64 147 / 0.5)'
			},
			fontFamily: {
				heading: ['DM Serif Display', 'serif'],
				body: ['Montserrat', 'sans-serif']
			},
			lineHeight: {
				'xs': '0.8'
			},
			transitionProperty: {
				'spacing': 'margin, padding',
			},
			zIndex: {
				'-1': '-1'
			},
			animation: {
				'breathing': 'bounceScale 2s linear infinite', 
			},
			keyframes: { 
				bounceScale: {
					'0%, 100%': { transform: 'scale(1)' },
					'50%': { transform: 'scale(1.2)' },
				}
			}
		}
	},
	plugins: [
		textShadow
	],
};
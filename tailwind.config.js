/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',

  ],
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
			colors: {
				'primary-text': 'var(--primary-text)',
				'primary-bg': 'var(--primary-bg)',
				'secondary-bg': 'var(--secondary-bg)',
				'opposite-bg': 'var(--opposite-bg)',
				'primary-accent': 'var(--primary-accent)',
				'secondary-accent': 'var(--secondary-accent)',
				'failure-accent': 'var(--failure-accent)',
				'warning-accent': 'var(--warning-accent)',
				'success-accent': 'var(--success-accent)',
			},
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
				'linear-accent-gradient':
					'linear-gradient(to right, var(--primaryAccent), var(--secondaryAccent))',
      },
			boxShadow: {
				DEFAULT: '0 0px 6px -1px rgba(0,0,0,0.1), 0 0px 5px -1px rgba(0,0,0,.06)',
				lg: '0 0px 12px -3px rgba(0,0,0,0.6), 0 0px 6px -1px rgba(0,0,0,.06)',
				xl: '0 0px 15px -5px rgba(0,0,0,0.8), 0 0px 8px -1px rgba(0,0,0,.06)',
				'md-soft': '0 6px 8px -2px rgb(0 0 0 / 0.1), 0 4px 6px -3px rgb(0 0 0 / 0.1)',
				'inner-dark': 'inset 0 2px 4px 0 rgb(0 0 0 / 0.25)',
				'inner-xdark': 'inset 0 18px 16px -16px rgb(0 0 0 / 0.7), inset 0 -18px 16px -16px rgb(0 0 0 / 0.8)',
				'md-dark': ' 0 4px 6px -1px rgb(0 0 0 / 0.5), 0 2px 4px -2px rgb(0 0 0 / 0.5)'

			},
			fontFamily: {
				heading: ['DM Serif Display', 'serif'],
				body: ['Montserrat', 'sans-serif']
			},
			animation: {
				'breathing': 'bounceScale 2s linear infinite',
			},
			keyframes: {
				bounceScale: {
					'0%, 100%': { transform: 'scale(1)' },
					'50%': { transform: 'scale(1.2)' },
				}
			},
			zIndex: {
				'-1': '-1'
			},
    },
  },
	plugins: [require('@tailwindcss/typography')],
}

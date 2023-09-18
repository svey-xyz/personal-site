/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	future: {
		hoverOnlyWhenSupported: true,
	},
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',

  ],
  theme: {
		screens: {
			sm: "480px",
			md: "768px",
			lg: "976px",
			xl: "1200px",
			'2xl': "1440px",
		},
    extend: {
			height: {
				'icon': 'var(--icon-size)'
			},
			width: {
				'icon': 'var(--icon-size)'
			},
			maxWidth: {
				'prose-full': '85ch',
				'prose': '65ch',
				'prose-short': '45ch'
			},
			margin: {
				'1/8': '12%',
				'1/6': '16%',
				'1/7': '15%',
				'1/5': '20%',
				'1/4': '20%',
				'1/3': '33%'
			},
			colors: {
				'primary-text': 'var(--primary-text)',
				'secondary-text': 'var(--secondary-text)',
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
				'linear-accent-gradient':
					'linear-gradient(to right, var(--primary-accent), var(--secondary-accent))',
      },
			fontFamily: {
				heading: ['var(--font-fira-code)'],
				body: ['var(--font-fira-code)']
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
	plugins: [
		require('@tailwindcss/typography'),
		require('@pyncz/tailwind-mask-image'),
	],
}

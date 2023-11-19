/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	future: {
		hoverOnlyWhenSupported: true,
	},
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./lib/**/*.{js,ts,jsx,tsx,mdx}',

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
			colors: {
				'primary-text': 'var(--primary-text)',
				'secondary-text': 'var(--secondary-text)',
				'primary-bg': 'var(--primary-bg)',
				'secondary-bg': 'var(--secondary-bg)',
				'primary-accent': 'var(--primary-accent)',
				'secondary-accent': 'var(--secondary-accent)',
				'failure-accent': 'var(--failure-accent)',
				'warning-accent': 'var(--warning-accent)',
				'success-accent': 'var(--success-accent)',
			},
			fontFamily: {
				heading: ['var(--font-mona-space)'],
				body: ['var(--font-mona-space)']
			},
			zIndex: {
				'-1': '-1'
			},
    },
  },
	plugins: [
		require('@tailwindcss/typography'),
	],
}

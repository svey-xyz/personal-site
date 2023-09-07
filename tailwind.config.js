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
			}
    },
  },
  plugins: [],
}

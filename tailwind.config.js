/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',

  ],
  theme: {
    extend: {
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
    },
  },
  plugins: [],
}

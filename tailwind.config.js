/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',

  ],
  theme: {
    extend: {
			colors: {
				'custom-white': 'var(--custom-white)',
				'custom-black': 'var(--custom-black)',
				'custom-grey': 'var(--custom-grey)',
				'xyz-accent': 'var(--xyz-accent)',
				'custom-red': 'var(--custom-red)',
				'custom-yellow': 'var(--custom-yellow)',
				'custom-green': 'var(--custom-green)',
				'primary-text': '#000000'
			},
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}

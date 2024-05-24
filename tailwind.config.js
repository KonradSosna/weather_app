/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			spacing: {
				50: '3.125rem',
				110: '6.875rem',
				270: '16.875rem',
				600: '37.5rem',
			},
		},
	},
	plugins: [],
};

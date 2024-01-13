/** @type {import('prettier').Config} */
const config = {
	htmlWhitespaceSensitivity: 'ignore',
	useTabs: true,
	singleQuote: true,
	trailingComma: 'all',
	plugins: ['prettier-plugin-tailwindcss'],
};

export default config;

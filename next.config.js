/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	experimental: {},
	images: {
		domains: ["cdn.sanity.io"]
	}
}

module.exports = nextConfig

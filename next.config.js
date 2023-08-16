/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	experimental: {},
	images: {
		domains: ["cdn.sanity.io", "api.sanity.io"]
	}
}

module.exports = nextConfig

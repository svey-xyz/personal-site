/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	experimental: {
		serverActions: true // Add,
	},
	images: {
		domains: ["cdn.sanity.io", "api.sanity.io"]
	}
}

module.exports = nextConfig

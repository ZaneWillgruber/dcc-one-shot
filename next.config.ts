import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	output: 'standalone',
	images: {
		remotePatterns: [new URL('https://placehold.co/**')],
	},
};

export default nextConfig;

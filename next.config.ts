import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	output: 'standalone',
	images: {
		remotePatterns: [
			new URL('https://placehold.co/**'),
			{
				protocol: 'https',
				hostname: '*.googleusercontent.com',
				pathname: '/**',
				search: '',
			},
		],
	},
};

export default nextConfig;

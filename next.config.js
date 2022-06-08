/** @type {import('next').NextConfig} */
import withPlugins from 'next-compose-plugins';
import withBundleAnalyzer from '@next/bundle-analyzer';

export default withPlugins([
    [withBundleAnalyzer({
        enabled: process.env.ANALYZE === 'true',
    })],
],
    {
        webpack5: true,
        reactStrictMode: true,
        esmExternals: true,
        swcLoader: true,
        swcMinify: true,
        experimental: {
            modern: true,
        }
    }
);

/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer');

module.exports = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})(
  {
    reactStrictMode: true,
    swcMinify: true,
    experimental: {
      esmExternals: true,
    }
  }
);

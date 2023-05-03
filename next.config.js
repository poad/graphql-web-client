const withBundleAnalyzer = require('@next/bundle-analyzer');

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
};

module.exports = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})(config);

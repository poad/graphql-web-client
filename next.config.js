/** @type {import('next').NextConfig} */
const config = {
  output: 'export',
  reactStrictMode: true,
  cleanDistDir: true,
  images: {
    unoptimized: true,
  },
  compiler: {
    emotion: true,
  },
  trailingSlash: true,
};

export default config;

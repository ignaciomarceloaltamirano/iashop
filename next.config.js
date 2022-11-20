/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['fakestoreapi.com', 'lh3.googleusercontent.com'],
  },
  // env: {
  //   stripe_public_key: process.env.NEXT_PUBLIC_STRIPE_PUBLIC,
  // },
};

module.exports = nextConfig;

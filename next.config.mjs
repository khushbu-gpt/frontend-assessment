/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */

  images: {
   remotePatterns: [new URL('https://cdn.dummyjson.com/**')],
  },

};

export default nextConfig;

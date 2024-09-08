/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Disable React strict mode
  images: {
    remotePatterns: [
      {
        hostname: "lh3.googleusercontent.com",
      },
      {
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;

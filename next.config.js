/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    outputFileTracingIncludes: {
      "/": ["./meals.db"],
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nextlevelfoodapp.s3.us-east-2.amazonaws.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;

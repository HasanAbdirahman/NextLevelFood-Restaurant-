/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    outputFileTracingIncludes: {
      "/": ["./app/meals"],
      "/[mealSlug]": ["./app/meal/mealSlug"],
      "/share": ["./app/share"],
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

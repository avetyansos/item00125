/** @type {import('next').NextConfig} */
const nextConfig = {
  // Suppress the punycode warning
  webpack: (config, { isServer, dev }) => {
    // This replaces the punycode module with a no-op module
    config.resolve.alias = {
      ...config.resolve.alias,
      punycode: false,
    };
    
    return config;
  },
};

export default nextConfig;


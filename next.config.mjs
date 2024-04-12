import withPWA from "@ducanh2912/next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Enable React strict mode for improved error handling
  swcMinify: true, // Enable SWC minification for improved performance
  compiler: {
    removeConsole: process.env.NODE_ENV !== "development", // Remove console.log in production
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s4.anilist.co",
        port: "",
        pathname: "/file/anilistcdn/media/anime/**",
      },
      {
        protocol: "https",
        hostname: "images.metahub.space",
        port: "",
        pathname: "/logo/medium/**",
      },
    ],
  },
};

const PWA = withPWA({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggresiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swcMinify: true,
  disable: false,
  workboxOptions: {
    disableDevLogs: true,
  },
});
// We basically don’t have to do anything since the next-pwa will generate the sw.js automatically
export default PWA({
  ...nextConfig,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
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

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // All artwork is local and already optimised by the artist; keep the
    // pipeline simple and let next/image handle sizing only.
    formats: ["image/webp"],
  },
};

export default nextConfig;

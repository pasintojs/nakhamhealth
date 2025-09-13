/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "haflbpiaslmgpvndmyfk.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/**",
      },
    ],
    qualities: [75, 90, 95, 100],
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'htwijjddwzuxqslqxkmw.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'htwijjddwzuxqslqxkmw.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      }
    ],
  },
}

export default nextConfig

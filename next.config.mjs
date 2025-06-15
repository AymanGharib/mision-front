/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // ✅ This enables `next export` compatibility

  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true, // ✅ Required for `next export` to avoid next/image optimization
  },
}

export default nextConfig

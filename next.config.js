/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["i.postimg.cc", "picsum.photos", "cdnjs.cloudflare.com", "images.unsplash.com", "api.directorioturismo.com"]
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/directory',
        permanent: true,
      },
    ];
  },
}

module.exports = nextConfig

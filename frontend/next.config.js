/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/github",
        destination: "https://github.com/cyberkutti-iedc",
        permanent: false,
      },
      {
        source: "/deploy",
        destination: "https://vercel.com",
        permanent: false,
      },
    ];
  },
};

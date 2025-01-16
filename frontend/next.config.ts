module.exports = {
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: "http://backend:3000/api/v1/:path*", // Docker Compose のサービス名を指定
      },
    ];
  },
};

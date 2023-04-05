const config = {
  // reactStrictMode: true,
  images: {
    domains: ["firebasestorage.googleapis.com"],
  },
};

// eslint-disable-next-line import/no-extraneous-dependencies
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer(config);

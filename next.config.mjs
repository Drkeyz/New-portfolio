import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx"],
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

const withMDX = createMDX({ options: { development: false } });

// Next only aliases React to its bundled build for .ts/.tsx/.js files. MDX
// case studies render on the server (RSC), so point their JSX runtime at the
// same bundled React — otherwise `next dev` crashes on mismatched internals.
const vendored = "next/dist/server/route-modules/app-page/vendored/rsc";
const withMdxReact = (config) => ({
  ...config,
  webpack(webpackConfig, options) {
    const out = config.webpack ? config.webpack(webpackConfig, options) : webpackConfig;
    out.module.rules.push({
      test: /\.mdx$/,
      resolve: {
        alias: {
          "react/jsx-runtime$": `${vendored}/react-jsx-runtime`,
          "react$": `${vendored}/react`,
        },
      },
    });
    return out;
  },
});

export default withMdxReact(withMDX(nextConfig));

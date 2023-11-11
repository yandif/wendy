/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  postcss: true,
  ignoredRouteFiles: ['**/.*'],
  // appDirectory: 'app',
  // assetsBuildDirectory: "public/build",
  // serverBuildPath: "build/index.js",
  // publicPath: "/build/",
  // future: {
  //   v2_routeConvention: true,
  // },
  serverDependenciesToBundle: ['wendy-tiptap'],
};

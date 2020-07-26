const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
const ManifestPlugin = require("webpack-manifest-plugin");
const SWPrecacheWebpackPlugin = require("sw-precache-webpack-plugin");

const manifest = new ManifestPlugin({
  fileName: "asset-manifest.json"
});

const sw = new SWPrecacheWebpackPlugin({
  dontCacheBustUrlsMatching: /\.\w{8}\./,
  filename: "service-worker.js",
  logger(message) {
    if (message.indexOf("Total precache size is") === 0) {
      // eslint-disable-next-line no-useless-return
      return;
    }
  },
  minify: true,
  navigateFallback: "/index.html",
  staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/]
});

const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: path.join(__dirname, "public/index.html"),
  filename: "./index.html"
});
module.exports = env => ({
  entry: ["babel-polyfill", path.join(__dirname, "src/index.js")],
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      },
      {
        test: /\.(png|jpg|gif|svg|ico)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    htmlWebpackPlugin,
    new Dotenv(),
    new MiniCssExtractPlugin({
      filename: "[name].css"
    }),
    new webpack.DefinePlugin({
      "process.env.ENVIRONMENT": JSON.stringify(env.ENVIRONMENT),
      "process.env.GA_TOKEN": JSON.stringify(env.GA_TOKEN)
    }),
    manifest,
    sw
  ],
  resolve: {
    extensions: [".js", ".jsx"]
  },
  devServer: {
    port: 3001
  }
});

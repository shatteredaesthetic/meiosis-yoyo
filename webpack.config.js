/*global process*/
var isProd = process.env.NODE_ENV === "prod";
var isDev = process.env.NODE_ENV === "dev";
var isLib = !(isProd || isDev);

var webpack = require("webpack");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: isLib ? "./lib" : "./dist",
    devtool: "source-map",
    filename: isProd ? "meiosis-yoyo.min.js" : "meiosis-yoyo.js",
    library: "meiosisYoyo",
    libraryTarget: isLib ? "commonjs2" : "umd"
  },
  module: {
    loaders: [
      {
        loader: "babel",
        test: /\.js$/,
        exclude: /node_modules/
      }
    ]
  },
  plugins: isProd ? [
    new webpack.optimize.UglifyJsPlugin()
  ] : []
};

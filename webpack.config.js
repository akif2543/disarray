const path = require("path");

module.exports = {
  entry: "./frontend/index.jsx",
  output: {
    path: path.resolve(__dirname, "app", "assets", "javascripts"),
    filename: "bundle.js",
    chunkFilename: "[name].bundle.js",
    publicPath: path.resolve(__dirname, "app", "assets", "javascripts"),
  },
  module: {
    rules: [
      {
        test: [/\.jsx?$/],
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ["@babel/env", "@babel/react"],
        },
      },
    ],
  },
  devtool: "source-map",
  resolve: {
    extensions: [".js", ".jsx", "*"],
  },
};

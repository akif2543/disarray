const path = require("path");

// const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

module.exports = (env) => {
  const isDev = env === "development";
  return {
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
    // plugins: [new BundleAnalyzerPlugin()],
    devtool: isDev ? "inline-source-map" : "source-map",
    resolve: {
      extensions: [".js", ".jsx", "*"],
    },
  };
};

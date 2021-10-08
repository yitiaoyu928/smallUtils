const Path = require("path")
const TerserPlugin = require("terser-webpack-plugin")
module.exports = {
  mode: "none",
  entry: {
    "small-utils": "./src/index.js",
    "small-utils.min": "./src/index.js"
  },
  watch: true,
  output: {
    clean: true,
    path: Path.resolve(__dirname, "dist"),
    filename: "[name].js",
    library: {
      name: "smallUtils",
      type: "umd",
      export: "default",
      umdNamedDefine: true
    }
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        include: /\.min\.js$/
      })
    ]
  }
}
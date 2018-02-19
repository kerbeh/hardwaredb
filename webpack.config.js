const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: "./main.webpack.js",
  output: {
    filename: "./public/javascripts/bundle.js",
    filename: "./public/stylesheets/styles.bundle.css"
  },
  watch: false,

  module: {
    loaders: [
      {
        test: /\.js$/,
        include: "/public/javascripts/",
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ["es2015"]
        }
      }
    ],
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            { loader: "css-loader", options: { importLoaders: 1 } },
            "postcss-loader"
          ]
        })
      }
    ]
  },
  plugins: [new ExtractTextPlugin("./public/stylesheets/styles.bundle.css")]
};

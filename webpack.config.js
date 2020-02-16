const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    app: "./src/app.ts",
    styles: "./src/styles/app.less"
  },
  output: {
    path: path.resolve(__dirname, "docs"),
    filename: "scripts/[name].js"
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ["ts-loader", "tslint-loader"]
      },
      {
        test: /\.js$/,
        use: "babel-loader"
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      },
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"]
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: "file-loader"
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: {
              attrs: ["img:src", "img:ng-src"]
            }
          }
        ]
      },
      {
        test: /\.(woff2?|ttf|eot|otf)$/,
        use: "file-loader"
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
      inject: "body"
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ]
};

var webpack = require('webpack')
var path = require('path')
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  mode: "development", // "production" | "development" | "none"
  entry: './app.js',
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'public')
  },
  module: {
    rules: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel-loader']},
      {
         test: /\.s?css$/,
         use: ['style-loader', 'css-loader', 'sass-loader']
       },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif|ico)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  }
}

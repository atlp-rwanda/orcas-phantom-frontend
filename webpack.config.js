const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const dotEnv = require('dotenv-webpack');
const { SourceMapDevToolPlugin } = require("webpack");

module.exports = {
  entry: path.join(__dirname, 'src', 'index.js'),
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader'
        },
        {
          loader: "eslint-loader"
        }],
      },
      {
        test: /.(css|scss)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /.html$/,
        use: {
          loader: 'html-loader'
        }
      },
      {
        test: /.(jpg|jpeg|png|gif|mp3|svg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[hash].[ext]',
            outputPath: 'assets'
          },
        },
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, 'src', 'index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new dotEnv({
      path: './.env',
      allowEmptyValues: false,
      systemvars: true
    }),
    new SourceMapDevToolPlugin({
      filename: "[file].map"
    }),
  ],
  resolve: {
    // allows us to do absolute imports from "src"
    modules: [path.join(__dirname, 'src'), 'node_modules'],
    extensions: ['*', '.js', '.jsx'],
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    port: 8080
  }
};

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BabelMinifyWebpackPlugin = require('babel-minify-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const rootDir = path.resolve(__dirname, '../..');

module.exports = {
  entry: {
    app: path.join(rootDir, 'app/index.js')
  },
  output: {
    path: path.join(rootDir, 'build/assets'),
    publicPath: '/assets/',
    filename: 'js/[name].bundle.[hash:5].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true, // Inject all files that are generated by webpack, e.g. bundle.js
      template: path.join(rootDir, 'app/index.html'),
      filename: path.join(rootDir, 'build/index.html')
    }),
    new ExtractTextPlugin('css/global.[hash:5].css'),
    new BabelMinifyWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      PRODUCTION: JSON.stringify(true)
    })
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [ 'react', 'stage-2' ],
              plugins: [ 'transform-decorators-legacy' ]
            }
          }
        ]
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'img/'
            }
          }
        ]
      },
      {
        test: /.styl$/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader', 'stylus-loader']
        })
      }
    ]
  },
  resolve: {
    modules: [ 'app', 'node_modules' ],
    extensions: [ '.js', '.jsx', '.styl' ]
  }
};

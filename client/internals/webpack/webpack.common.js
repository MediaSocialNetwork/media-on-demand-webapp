const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const StyleExtHtmlWebpackPlugin = require('style-ext-html-webpack-plugin')
const path = require('path')

const rootDir = path.resolve(__dirname, '../..')

module.exports = ({
  devtool,
  entry = {
    app: [ path.join(rootDir, 'app/index.js') ]
  },
  plugins = [],
  rules = [],
  resolve = {}
}) => {
  return {
    devtool,
    entry: Object.assign({}, entry),
    output: {
      path: path.join(rootDir, 'build/assets'),
      publicPath: '/assets/',
      filename: 'js/[name].bundle.[hash:5].js'
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: true, // Inject all files that are generated by webpack, e.g. bundle.js
        template: path.join(rootDir, 'assets/html/index.html'),
        filename: path.join(rootDir, 'build/index.html'),
        minify: require('./html-minifier')
      }),
      new ExtractTextPlugin('css/global.[hash:5].css'),
      new StyleExtHtmlWebpackPlugin({
        minify: true
      })
    ].concat(plugins),
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [ 'es2015', 'react', 'stage-2' ],
                plugins: [
                  'transform-decorators-legacy',
                  [ 'transform-runtime', {
                    polyfill: false,
                    regenerator: true
                  } ]
                ]
              }
            }
          ]
        },
        {
          test: /\.(jpg|png|gif|svg)$/,
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
          test: /\.(ttf|eot|woff|woff2)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: 'fonts/'
              }
            }
          ]
        },
        {
          test: /.styl$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader', 'stylus-loader']
          })
        }
      ].concat(rules)
    },
    resolve: Object.assign({
      modules: [ 'app', 'node_modules', 'assets' ],
      extensions: [ '.js', '.jsx', '.styl' ]
    }, resolve)
  }
}

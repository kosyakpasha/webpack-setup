const path = require('path');
const autoprefixer = require('autoprefixer');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const common = configDirs => {
  return {
    entry: configDirs.APP_DIR + '/scripts/main.js',

    output: {
      filename: 'bundle.[hash].js',
      path: path.resolve('dist'),
      chunkFilename: "vendor.min.jsvendor.min.js",
      publicPath: '/'
    },

    optimization: {
      minimizer: [
        new TerserJSPlugin(),
        new OptimizeCSSAssetsPlugin()
      ],
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'async',
        maxInitialRequests: Infinity,
        minSize: 0,
          cacheGroups: {
            jqueryVendor: {
              test: /[\\/]node_modules[\\/](jquery)[\\/]/,
              name: "jqueryVendor"
            },
          },
      },
    },

    resolve: {
      modules: [
        'node_modules'
      ]
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          }
        },
        {
          test: /\.scss/,
          exclude: /node_modules/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: [
                  autoprefixer(),
                ]
              }
            },
            'sass-loader'
          ]
        },
        {
          test: /\.html$/i,
          loader: 'html-loader',
        },
        {
          test: /\.(png|svg|jpe?g|gif)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'assets/images/',
              },
            },
          ],
        },
      ]
    },

    plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: 'bundle.min.css',
      }),
      new CopyPlugin([
        { from: 'src/images' },
        { from: 'src/index.html' },
      ]),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '../src', 'index.html'),
      }),
    ]
  }
};

module.exports = common;

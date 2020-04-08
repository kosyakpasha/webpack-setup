const merge = require('webpack-merge');
const webpack = require('webpack');
const path = require('path');

module.exports = configDirs => {
  const commonConfig = Object.assign({}, require('./common')(configDirs));
  const devConfig = {
    devServer: {
      contentBase: path.resolve('dist'),
      historyApiFallback: true,
      compress: false,
      port: 9999,
    },
    plugins: [
      new webpack.SourceMapDevToolPlugin({
        filename: '[name].js.map',
        exclude: ['vendor.js']
      }),
    ]
  };

  console.log('\x1b[36m%s\x1b[0m', 'Building for developing ...');

  return merge(commonConfig, devConfig);
};

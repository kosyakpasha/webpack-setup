const webpack = require('webpack');
const merge = require('webpack-merge');
const PACKAGE = require('../package.json');

module.exports = function(configDirs) {
  const commonConfig = Object.assign({}, require('./common')(configDirs));
  const banner = PACKAGE.name + ' - ' + PACKAGE.version;
  const prodConfig = {
    module: {
      rules: [
        {
          test: /\.(png|svg|jpe?g|gif)$/,
          use: [
            {
              loader: 'image-webpack-loader',
              options: {
                mozjpeg: {
                  progressive: true,
                  quality: 10,
                },
                pngquant: {
                  quality: '65-90',
                  speed: 4,
                },
                gifsicle: {
                  interlaced: true,
                  quality: 10,
                },
              },
            },
          ],
        },
      ]
    },
    plugins: [
      new webpack.BannerPlugin(banner)
    ]
  };

  console.log('\x1b[36m%s\x1b[0m', 'Building for production ...');

  return merge(commonConfig, prodConfig);
};

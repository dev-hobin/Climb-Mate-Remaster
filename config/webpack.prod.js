const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const paths = require('./paths');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(common, {
  mode: 'production',
  target: 'browserslist',
  devtool: false,
  module: {
    rules: [
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles/[name].[contenthash].css',
      chunkFilename: '[id].css',
    }),
  ],
  output: {
    path: paths.build,
    filename: 'js/[name]_bundle.[contenthash].js',
  },
  optimization: {
    minimize: true,
    splitChunks: {
      cacheGroups: {
        swiper: {
          test: /[\\/]node_modules[\\/]swiper[\\/]/,
          name: 'swiper',
          chunks: 'all',
        },
        swiperStyle: {
          test: /[\\/]node_modules[\\/](swiper)[\\/]swiper-bundle\.(s[ac]|c)ss$/,
          name: 'swiper-style',
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
});

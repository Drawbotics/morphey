const webpack = require('webpack');
const webpackBaseConfig = require('./webpack.base.config');


module.exports = Object.assign({}, webpackBaseConfig, {
  devtool: 'source-map',
  plugins: [
    ...webpackBaseConfig.plugins,
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
    }),
  ],
});

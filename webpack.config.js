const TerserPlugin = require('terser-webpack-plugin');
const webpackBaseConfig = require('./webpack.base.config');


module.exports = Object.assign({}, webpackBaseConfig, {
  mode: 'production',
  devtool: 'source-map',
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          sourceMap: true,
        },
      }),
    ],
  },
  plugins: [
    ...webpackBaseConfig.plugins,
  ],
});

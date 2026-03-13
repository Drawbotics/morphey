const path = require('path');


const rootDirs = [
  path.resolve(__dirname, 'src'),
];


module.exports = {
  resolve: {
    modules: [
      ...rootDirs,
      'node_modules',
    ],
    extensions: ['.js', '.json'],
  },
  entry: [ './src/index.js' ],
  output: {
    filename: 'morphy.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'morphy',
    libraryTarget: 'umd',
  },
  plugins: [
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        include: rootDirs,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [['@babel/preset-env', { modules: false }]],
            },
          },
        ],
      },
    ],
  },
};

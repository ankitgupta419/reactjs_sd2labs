const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'src', 'main.js'),
  output: {
      path: __dirname,
      publicPath: '/',
      filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  resolve: {
        extensions: ['.js', '.jsx', '.css']
  }
};

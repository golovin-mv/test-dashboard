import webpack from 'webpack';
import { resolve as _resolve } from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const config = {
  entry: [
    'react-hot-loader/patch',
    './src/index.js',
  ],
  output: {
    path: _resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [
      '.js',
      '.jsx',
    ],
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  devServer: {
    contentBase: './dist',
  },
  plugins: [
    new HtmlWebpackPlugin({
      appMountId: 'app',
      filename: 'index.html',
    }),
  ],
};

export default config;

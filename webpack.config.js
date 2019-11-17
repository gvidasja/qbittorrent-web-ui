const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const argv = require('yargs').argv

const ENV = {
  DEV: 'development',
  PROD: 'production',
}

const entries = {
  login: resolve('./src/login.js'),
  index: resolve('./src/index.js'),
}

const OUTPUT_DIR = resolve('dist')

module.exports = {
  devServer: {
    contentBase: OUTPUT_DIR,
    port: 3000,
    hot: true,
    inline: true,
    overlay: true,
    proxy: {
      '/api': {
        logLevel: 'debug',
        target: 'https://torrent.gvidasja.com',
        secure: false,
        changeOrigin: true,
      },
    },
  },

  entry: entries,
  plugins: [
    new HtmlWebpackPlugin({
      chunks: ['login'],
      filename: `login.html`,
      template: resolve('./src/index.html'),
    }),
    new HtmlWebpackPlugin({
      chunks: ['index'],
      filename: `index.html`,
      template: resolve('./src/index.html'),
    }),
  ],
  output: {
    path: OUTPUT_DIR,
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: { presets: ['@babel/preset-env', '@babel/preset-react'] },
          },
        ],
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
}

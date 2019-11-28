const { resolve, join } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const OUTPUT_DIR = resolve('dist')

const baseConfig = {
  devServer: {
    contentBase: OUTPUT_DIR,
    host: '0.0.0.0',
    disableHostCheck: true,
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

  devtool: 'cheap-eval-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      chunks: ['index'],
      path: 'private',
      filename: `index.html`,
      template: resolve('./src/index.html'),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: ['@babel/plugin-proposal-class-properties'],
              presets: [
                [
                  '@babel/preset-env',
                  {
                    targets: {
                      browsers: 'last 1 chrome versions',
                    },
                  },
                ],
                '@babel/preset-react',
              ],
            },
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

const publicConfig = {
  ...baseConfig,
  entry: resolve('./src/app/public.js'),
  output: {
    path: join(OUTPUT_DIR, 'public'),
    filename: 'login.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'login.html',
      template: resolve('./src/index.html'),
    }),
  ],
}

const privateConfig = {
  ...baseConfig,
  entry: resolve('./src/app/private.js'),
  output: {
    path: join(OUTPUT_DIR, 'private'),
    filename: 'index.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: resolve('./src/index.html'),
    }),
  ],
}

module.exports = [privateConfig, publicConfig]

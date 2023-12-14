const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const dotenv = require('dotenv')
const { javascript, HotModuleReplacementPlugin } = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

dotenv.config()

module.exports = {
  // webpack will take the files from ./src/index
  entry: ['babel-polyfill', './src/index'],

  // and output it into /dist as bundle.js
  output: {
    publicPath: `${process.env.SUB_DIR}/`,
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },

  // adding .ts and .tsx to resolve.extensions will help babel look for .ts and .tsx files to transpile
  resolve: {
    modules: [path.resolve(__dirname, './src'), 'node_modules'],
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@src': path.resolve(__dirname, 'src/')
    }
  },

  module: {
    rules: [
      // we use babel-loader to load our jsx and tsx files
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot|woff|woff2|ttf)$/i,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      },
      // css-loader to bundle all the css files into one file and style-loader to add all the styles  inside the style tag of the document
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      // scss-loader to bundle all the css files into one file and style-loader to add all the styles  inside the style tag of the document
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      // less-loader to bundle all the css files into one file and style-loader to add all the styles  inside the style tag of the document
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true
              }
            }
          }
        ]
      }
    ]
  },
  devServer: {
    host: '0.0.0.0',
    port: 3000,
    historyApiFallback: true,
    contentBase: path.join(__dirname, `${process.env.SUB_DIR}`, 'dist'),
    publicPath: `${process.env.SUB_DIR}/`,
    hot: false
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['./dist']
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      favicon: './src/assets/img/ohmslaw_logo.png',
      title: "Ohm's Law",
      template: './src/index.html',
      social_share_image: `${process.env.SOCIAL_SHARE_IMAGE}`,
    }),
    new Dotenv({
      systemvars: true
    }),
    new HotModuleReplacementPlugin()
  ],
  performance: {
    hints: false
  }
}

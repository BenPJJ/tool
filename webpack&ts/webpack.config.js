const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');
const config = require('./package.json');

module.exports = {
  entry: {
    'index': './src/index.ts',
    'index.min': './src/index.ts',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './dist'),
    libraryExport: "default",
    libraryTarget: 'umd',
    library: config.name
  },
  resolve: {
    extensions: ['.js', '.ts', '.json'],
  },
  devtool: 'source-map',// 打包出的js文件是否生成map文件（方便浏览器调试）
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true
            }
          }
        ]
      }
    ]
  },
  optimization: {
    minimizer: 
      process.env.NODE_ENV === 'production'
        ? [
          new UglifyJSPlugin(),
          new CleanWebpackPlugin()
        ]
        : [
          new UglifyJSPlugin({
            include: /\.min\.js$/
          }),
          new CleanWebpackPlugin()
        ]
  }
}
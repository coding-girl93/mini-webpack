const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin= require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config ={
  mode:"development",
  entry:{
    'index':"./src/01-base/index",
    'add':'./src/01-base/add.js'
  },
  output:{
    path:path.resolve(__dirname,'build'),
    filename:'[name]_[chunkhash:8].js'
  },
  module:{
    rules:[
      {
        test:/\.js$/,
        use:'babel-loader'
      },{
        test:/\.css$/,
        use:[
          MiniCssExtractPlugin.loader,
          'css-loader']
      },{
        test:/\.less$/,
        use:[
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader'
        ]
      },
      {
        test:/\.(png|jpg|git|jpeg)$/,
        use:{
          loader:'file-loader',
          options:{
            name:'[name]_[hash:8].[ext]'
          }
        }
       
      } ,
      {
        test:/\.(woff|woff2|otf|ttf)$/,
        use:{
          loader:'file-loader',
          options:{
            name:'[name]_[hash:8].[ext]'
          }
        }
      }
    ]
  },
  plugins:[
    new MiniCssExtractPlugin({
      filename:'[name]_[contenthash:8].css'
    }),
    new OptimizeCssAssetsWebpackPlugin({
      assetNameRegExp:/\.css$/,
      cssProcessor:require('cssnano')
    }),
    new HtmlWebpackPlugin({
      template:path.resolve(__dirname,'./src/index.html')
    })
  ],
}

module.exports = config
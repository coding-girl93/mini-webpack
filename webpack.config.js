/*
 * @Author: your name
 * @Date: 2021-07-01 14:40:29
 * @LastEditTime: 2021-07-01 18:24:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /FE/mini-webpack/webpack.config.js
 */
const path = require('path')
const webpack = require('webpack')
const config ={
  mode:"development",
  entry:{
    'index':"./src/01-base/index",
    'add':'./src/01-base/add.js'
  },
  output:{
    path:path.resolve(__dirname,'build'),
    filename:'[name].js'
  },
  module:{
    rules:[
      {
        test:/\.js$/,
        use:'babel-loader'
      },{
        test:/\.css$/,
        use:['style-loader','css-loader']
      },{
        test:/\.less$/,
        use:[
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      {
        test:/\.(png|jpg|git|jpeg)$/,
        use:'file-loader'
      },
      {
        test:/\.(woff|woff2|otf|ttf)$/,
        use:'file-loader'
      }
    ]
  },
  plugins:[
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer:{
    hot:true,
    contentBase:'./build'
  }
}

module.exports = config

const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

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
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin()

  ],
  devServer:{
    hot:true,
    contentBase:'./build'
  }
}

module.exports = config
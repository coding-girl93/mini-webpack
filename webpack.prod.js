const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin= require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const glob = require('glob')
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const webpack = require('webpack');

const setMPA = ()=>{
  const entry ={};
  const htmlWebpackPlugins =[]
  const entryPaths = glob.sync(path.join(__dirname,'src/pages/*/index.js'))
  entryPaths.map(entryPath=>{
    const match = entryPath.match(/pages\/(.*)\/index\.js/)
    const pathName = match && match[1]
    entry[pathName] = entryPath
    
    htmlWebpackPlugins.push(
      new HtmlWebpackPlugin({
        template:path.resolve(__dirname,`./src/pages/${pathName}/index.html`),
        filename:`${pathName}.html`,
        chunks:['venders',pathName]
      })
    )
  })
  return {
    entry,
    htmlWebpackPlugins
  }
}
const {entry,htmlWebpackPlugins} = setMPA()
const config ={
  mode:"none",
  entry,
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
          'less-loader',
          {
            loader: "postcss-loader",
            options: {
              postcssOptions:{
                plugins:[
                  require('autoprefixer')
                ]
              }
             
            }
          },{
            loader:'px2rem-loader',
            options:{
              remUnit:75,
              // remPrecesion:8
            }
          }
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
    new webpack.optimize.ModuleConcatenationPlugin(),
    new MiniCssExtractPlugin({
      filename:'[name]_[contenthash:8].css'
    }),
    new OptimizeCssAssetsWebpackPlugin({
      assetNameRegExp:/\.css$/,
      cssProcessor:require('cssnano')
    }),
    new CleanWebpackPlugin(),
    // new HtmlWebpackExternalsPlugin({
    //   externals:[
    //     {
    //       module:'react',
    //       entry:'https://unpkg.com/react@17/umd/react.development.js',
    //       global:'React'
    //     },
    //     {
    //       module:'react-dom',
    //       entry:'https://unpkg.com/react-dom@17/umd/react-dom.development.js',
    //       global:'ReactDOM'
    //     }
    //   ]
    // })
  ].concat(htmlWebpackPlugins),

  optimization:{
    splitChunks:{
      cacheGroups:{
        venders:{
          test:/(react|react-dom)/,
          name:'venders',
          chunks:'all'
        },
        // styles: {
        //   name: 'styles',
        //   test: /\.less$/,
        //   chunks: 'all',
        //   enforce: true,
        //   priority: 20, 
        // },
        common:{
          name:"common",
          chunks:'all',
          minChunks:2,
          reuseExistingChunk:false
        }
      }
    }
  }
}

module.exports = config


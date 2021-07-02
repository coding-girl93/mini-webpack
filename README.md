## webpack4

#### Why 为什么需要构建工具
-  浏览器只能识别基础的js的语法，es6的语法，Vue的指令、react的jsx语法是不能识别 因此需要构建工具来进行翻译
-  随着工程的不断迭代。文件不断增加，对于前端性能来说是一个比较大的瓶颈，构建工具可以进行压缩、打包

#### 发展历史

- grunt
- gulp、fis
- webpack、rollup、parcle、vite

#### 为什么选择
- 社区生态丰富
- 配置灵活和插件化配置
- 更新迭代比较快

## 基础
### 环境安装
- node  v16.3.0
- npm install webpack@4.31.0 webpack-cli@3.3.2 --save-dev

### 01基础使用
- 创建webpack.config.js `一定要module.exports的方式导出么 esm是否可行`
```
  ./node_modules/.bin/webpack
```
- 通过npm script 运行
原理：package.json script会从node_modules/.bin中去寻找，模块局部安装的时候会在node_modules/.bin目录下面创建软链接

```
  "build": "webpack --watch" // 开启文件监听，需要手动刷新浏览器
```

#### entry
- 单入口 
```
  entry:"./src/01-base/index"

```
- 多入口

#### output
> output告诉webpack如何将编译后的文件输出到磁盘
```
 output:{
    path:path.resolve(__dirname,'build'),
    filename:'[name].js'
  }
```
#### loader webpack的翻译
> webpack只支持js和json两种文件类型，loader可以理解为是一个翻译官，将其他文件类型转化为有效的模块并添加到依赖图中，本身是一个函数，接受一个参数

常见的loader
- babel-loader e6、es7语法转化
- css-loader 支持.css文件的加载和解析
- less-loader 将less文件转化为css
- ts-loader 将ts转化为js
- file-loader 图片、字体进行打包
- raw-loader 将文件以字符串的形式导入
- thread-loader 多进行打包js、css

##### 支持es6 react语法
npm i @babel/preset-env @babel/core babel-loader -d
npm i  @babel/preset-react react react-dom -d

配置loader
```
 rules:[
    {
      test:/\.js$/,
      use:'babel-loader'
    }
  ]
```
配置.babelrc文件

```
{
  "presets": [
    "@babel/preset-env", // 解析es6 7 
    "@babel/preset-react" // 解析react 
  ]
}
```
##### 支持css、less
npm i style-loader@2.0.0  `webpack4.41.0版本下安装最新的style-loader@3.0.0会出错`
npm i css-loader less-loader less  `webpack4.41.0版本 npm i less-loader@7.0.0`

```
{
  test:/\.css$/,
  use:['style-loader','css-loader'] // 主要书写顺序，webpack是从右到左侧
},
{
  test:/\.less$/,
  use:[
    'style-loader',
    'css-loader',
    'less-loader'
  ]
}
```
##### 解析图片、字体
npm i file-loader
自定义字体下载：https://www.ztxz.org.cn/ruizijiazu/3802.html

```
 {
  test:/\.(png|jpg|git|jpeg)$/,
  use:'file-loader'
  },
  {
    test:/\.(woff|woff2|otf|ttf)$/,
    use:'file-loader'
  }
```
引入字体
```
@font-face {
  font-family: 'S';
  src: url('../asset/1.ttf');
}
@font-face {
  font-family: 'A';
  src: url('../asset/2.otf');
}
.name{
  font-family: "S";
  color: rebeccapurple;
}
.add{
  font-family: "A";
  color: blue;
}
```
#### plugins webpack的增强
> 作用在整个构建过程
- bundle文件的优化
- 资源管理
- 环境注入

常用的plugins
- CommonsChunkPlugin 将相同的代码提取成功过的js  `webpack5是怎么做得`
- CleanWebpackPlugin 清理文件目录
- ExtractTextWebpackPlugin 将css从js中提取出来成为单独的css文件
- CopyWebpackPlugin 拷贝文件到输出目录
- HtmlWebpackPlugin 创建html文件承载输出的bundle
- UglifyWebpackPlugin 压缩js文件

#### mode
> 告知 webpack 使用相应模式的内置优化。
- none
- development
- production js压缩


#### 文件监听 --watch
原理：轮询判断文件最后编辑的时间是否变化

缺点：需要手动刷新

#### 热更新（HRM）

##### 使用
npm i webpack-dev-server 

- package配置
    "dev": "webpack-dev-server --open"
- webpack.config.js配置
```
 plugins:[
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer:{
    hot:true,
    contentBase:'./build'
  }
```
##### 热更新原理
- webpack complier :将js编译成Bundle
- HMR server:将热更新的模块输送给HMR runtime
- Bundle Server：提供文件在浏览器访问
- HMR runtime：会被注入到浏览器的bundle文件中，更新文件的变化

##### 文件指纹
- Hash：和整个项目的构建相关，只要项目文件有修改，整个项目构建的hash值就会改变
- ChunkHash：和webpack打包的chunk有关系，不同的entry会生成不同的chunkHash值
- ContentHash:根据文件内容定义的Hash,只要内容改变就会生成一个新的值

##### 代码压缩
- html: html-webpack-plugin
- css: optimize-css-assets-webpack-plugin cssnano
- js : 内置了 uglifyjs-webpack-plugin


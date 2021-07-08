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



## 进阶篇

### 清理构建目录

npm i clean-webpack-plugin -d

### css兼容处理 (注意版本)

npm i autoprefixer postcss-loader -d

- package.json添加浏览器兼容列表

```
 "browserslist": [
    "Firefox > 20",
    "iOS >= 7",
    "ie >= 8",
    "last 5 versions",
    "> 5%"
  ],
```
- 配置
```
{
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
    }
  ]
}
```
### rem单位处理
> rem 相对于页面根元素
npm i px2rem-loader -d
npm i lib-flexible -s


### 资源内联
- 代码层面
    - 页面框架的初始化脚本
    - 上报打点
    - css内联避免闪动
- 请求层面：减少http网络请求
    - 小图片或者小字体内联（url-loader）

#### css内联
- 借助style-loader
- html-inline-css-webpack-plugin 将打包好的css资源文件插入到js中
#### html js内联
- npm i raw-loader@0.5.1
·设置之后未成功，待修改·
```
 <script>${require('raw-loader!babel-loader!./meta.html')}</script>
  <script>${require('raw-loader!babel-loader!../node_modules/lib-flexible')}</script>
```

### 多页面打包

利用glob.sync

```
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
        chunks:[pathName]
      })
    )
  })
  return {
    entry,
    htmlWebpackPlugins
  }
}
const {entry,htmlWebpackPlugins} = setMPA()
```

### source map
> 作用：通过source map定位到源代码，一般是开发环境开启，线上环境关闭，线上排查问题的时候可以将sourcemap上传到错误监控系统
#### 类型
https://webpack.js.org/configuration/devtool/

### 提取公共资源

#### 基础库分离
- 使用html-webpack-externals-plugin ,在页面中引入cdn资源
  ```
    new HtmlWebpackExternalsPlugin({
      externals:[
        {
          module:'react',
          entry:'https://unpkg.com/react@17/umd/react.development.js',
          global:'React'
        },
        {
          module:'react-dom',
          entry:'https://unpkg.com/react-dom@17/umd/react-dom.development.js',
          global:'ReactDOM'
        }
      ]
    })
  ```
- splitChunksPlugins webpack4内置，代替了CommonsChunkPlugin
提取公共第三方包
文档：https://webpack.docschina.org/plugins/split-chunks-plugin/

  ```
   optimization:{
    splitChunks:{
      cacheGroups:{
        commons:{
          test:/(react|react-dom)/,
          name:'venders',
          chunks:'all'
        }
      }
    }
  }
  ```
  提取公共文件
  ```
   commons:{
      name:"common",
      chunks:'all',
      minChunks:2
    }
  ```

### tree-shaking摇树优化
#### DCE (Elimination 消除)
- 代码不会被执行，不可到达
- 代码执行的结果不会被用到
- 代码只会影响死变量（只读不写）
#### tree-shaking原理（mode为production默认开启）
- 利用ES6模块的特点 `待深入了解`
    - 只能作为模块顶层的语句出现（编译式静态分析）
    - import 的模块只能是字符串常量 
    - import binding的是immutable的
- 代码擦除：uglify阶段删除无用代码

### scope hosting 的使用和原理
现象：构建后的代码存在大量的闭包
导致：代码体检变大、运行代码时创建的函数作用域变多内存开销变大
原理：将所有模块的代码按照引用顺序放在一个函数作用域里，然后适当的重命名变量，减少函数声明代码和内存开销

未开启前bundle文件
```
[
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _common_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _hello__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
console.log(_common_index__WEBPACK_IMPORTED_MODULE_0__["default"]);
Object(_hello__WEBPACK_IMPORTED_MODULE_1__["default"])();

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var name = "sss";
/* harmony default export */ __webpack_exports__["default"] = (name);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function hello() {
  console.log('hello');
}

/* harmony default export */ __webpack_exports__["default"] = (hello);

/***/ })
/******/ 
```
开启之后
```
{

/***/ 0:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var name = "sss";
/* harmony default export */ __webpack_exports__["default"] = (name);

/***/ }),

/***/ 12:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./src/common/index.js
var common = __webpack_require__(0);

// CONCATENATED MODULE: ./src/pages/home/hello.js
function hello() {
  console.log('hello');
}

/* harmony default export */ var home_hello = (hello);
// CONCATENATED MODULE: ./src/pages/home/index.js


console.log(common["default"]);
home_hello();

/***/ })
```

### 代码分割

#### 场景
- 抽离共享模块
- 懒加载

#### 懒加载js脚本的方式
- CommonJS ：require.ensure
- ES6:动态import（需要babel转换）

```
 npm install --save-dev @babel/plugin-syntax-dynamic-import
```
.babelrc配置
```
  "plugins": [
    "@babel/plugin-syntax-dynamic-import"
  ]
```
通过jsonp的方式动态

### ESLint规范

业界规范：

npm i eslint-config-airbnb
npm i eslint-config-airbnb-base

制定团队ESLint规范

#### 落地方案

- CI/CD系统集成
- webpack集成

### 打包组件库
支持 ESM、CJS、AMD 

```
const TerserPlugin = require('terser-webpack-plugin')

module.exports ={
  entry:{
    'add':'./src/index.js',
    'add.min':'./src/index.js'
  },
  output:{
    filename:'[name].js',
    library:'add', // 库名字
    libraryExport:'default', 
    libraryTarget:'umd' // 通用打包模式
  },
  mode:'none',
  optimization:{
    minimize:true,
    minimizer:[
      new TerserPlugin({
        include:/\.min\.js$/
      })
    ]
  }
}

```


### SSR 服务端渲染

浏览器渲染：html,js,css加载，渲染页面
服务器渲染：直出页面，减少了请求

#### 优势：
- 减少白屏
- seo友好
#### 实现
服务端：
- 使用react-dom/server的renderToString方法将React组件渲染成字符串
- 服务端路由返回对应的模板
客户端
- 打包出针对服务端的组件


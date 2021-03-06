//webpack相关配置，使用node语法进行配置
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devServer: {//开发服务器的配置
    //端口号配置，默认为8080
    port: 3000,
    //进度条
    progress: true,
    //指定打开浏览器显示的目录，默认为根目录（项目目录）
    contentBase: './dist',
    compress: true
  },
  //配置模式，默认两种：production(生产模式)、development(开发者模式)
  //production：对打包后的代码进行压缩，不利于查看
  //development：开发者模式，利于看相应打包后的代码
  mode: 'development',
  //配置入口文件，即从哪个文件开始执行打包。默认为src下的index.js文件；
  entry: './src/index.js',
  output:{
    //配置打包后的文件名，即出口文件。默认为main.js文件；
    filename: 'bundle.js',
    //配置打包后文件的所属目录路径，即将bundle.js文件存放在哪个文件下，此路径必须是一个绝对路径，因此需要引入node的path模块
    //path.resolve([...paths])
      //参数：<string>-路径名
      //返回值：<string>-所生成的绝对路径
    //path.resolve(__dirname)-显示当前绝对路径（f:\font-end\代码\webpack\webpackDemo1）
    //path.resolve(__dirname,'dist')等同于path.resolve('dist')-在当前绝对路径下构造dist文件夹，并返回绝对路径（f:\font-end\代码\webpack\webpackDemo1\dist）
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [ //数组：放着所有的webpack插件
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html'
    })
  ]
}
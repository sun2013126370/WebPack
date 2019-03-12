一、webpack介绍
1. 什么是webpack
webpack可以看做是模块打包机：它做的事情是，分析你的项目结构，找到JavaScript模块以及其它的一些浏览器不能直接运行的扩展语言（Scss,TypeScript等），并将其打包为合适的格式以供浏览器使用。
2. 作用
* 代码转换：如ES6转ES5，Scss（Less）转CSS；
* 文件优化：如压缩代码体积、合并文件；
* 代码分割：如公共模块的抽离、路由懒加载；
* 模块合并：如多个模块合并一个模块，按功能分配；
* 自动刷新：如自启本地服务，实时刷新更改后的页面、热更新；
* 代码校验：如错误代码提示；
* 自动发布：如写好的项目发布到服务器上；
二 、webpack基础配置
3. webpack安装
* 本地安装
新建项目webpackDemo1，在当前文件夹下，打开命令行，运行如下命令：
> yarn init -y 
> yarn add webpack webpack-cli -D
4. webpack 零配置（默认配置）-index.js打包生成main.js
（1）新建src文件夹，并在src文件夹下新建index.js（/webpackDemo1/index.js）文件和a.js（/webpackDemo1/index.js）文件，内容如下：
```javascript
//a.js
module.exports = 'hello webpack!';
```
```javascript
//index.js
let str = require('./a.js');
console.log(str);
```
上述js文件涉及到ES6命令，直接在HTML文件中引入是不能正确运行的，因此需要通过webpack打包转化成浏览器可运行的ES5语法。
（2）运行`npx webpack`命令
看到当前目录自动生成了dist文件夹及main.js文件，将光标放置main.js文件内，右键点击`Run Code`，运行结果如下：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190305172203341.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2EyMDEzMTI2Mzcw,size_16,color_FFFFFF,t_70)
（3）在浏览器中使用生成的main.js
在dist文件夹下新建index.html，引入main.js文件

```html
<script src="./main.js"></script>
```
使用浏览器打开index.html文件，可以在浏览器控制台下看到如下输出：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190305173310814.png)
5. 手动配置webpack
默认配置文件名为webpack.config.js，就是说在根目录下新建一个文件名为webpack.config.js的文件，里面写我们关于webpack的配置。
在上一个例子中，我们并没有并没有对webpack进行配置，运行`npx webpack`打包命令后，生成了dist/main.js文件，且为生产环境下的压缩代码。本例子将基于原来代码的基础上进行webpack的简单配置。删除上一个例子产生的dist文件夹，根目录的文件如下：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190305212650459.png)
（1）mode、entry、output相关配置

```javascript
//webpack相关配置，使用node语法进行配置

//引入node的path模块
let path = require('path');

module.exports = {
  //配置模式：production(生产模式)、development(开发者模式)
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
  }
}
```
（2）运行`npx webpack`打包命令
webpackDemo1根目录下生成了dist/bundle.js文件
（3）新建index.html文件
将bundle.js文件在index.html文件中进行引入，可以看到控制台打印输出

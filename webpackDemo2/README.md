**上一节补充：**
如果存在`webpack.config.js`文件，则运行`npx webpack`命令后，将会自动读取文件内的相关配置。我们将`webpack.config.js`文件名改为`webpack.config.my.js`文件，那么怎么才能手动指定webpack读取`webpack.config.my.js`文件里的配置内容呢？别着急，你可以通过如下命令进行实现。

> npx webpack --config webpack.config.my.js

**1. webpack-dev-server**
`webpack-dev-server` 为你提供了一个简单的 web 服务器，并且能够实时重新加载(live reloading)，仅在开发环境中使用。

* （1）安装命令，如下：

> yarn add webpack-dev-server -D

* （2）运行命令，如下：

> npx webpack-dev-server 

* 打开浏览器，输入：http://localhost:8080/， 我们可以访问当前路径（webpackDemo1）的所有文件（当前路径：为运行`npx webpack-dev-server` 命令的路径）
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190306162623799.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190306162908262.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2EyMDEzMTI2Mzcw,size_16,color_FFFFFF,t_70)
* （3）在webpack.config.js文件中配置devServer

```javascript
module.exports = {
  devServer: {//开发服务器的配置
    //端口号配置，默认为8080
    port: 3000,
    //进度条
    progress: true,
    //指定打开浏览器显示的目录，默认为根目录（项目目录）
    contentBase: './dist'
  },
  ...
}
```
* （4）重新开启服务器`npx webpack-dev-server`

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190306164546921.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2EyMDEzMTI2Mzcw,size_16,color_FFFFFF,t_70)
（5）从上述运行结果可以看到，开启了3000端口，打开浏览器，输入http://localhost:3000/，可以看到进入了`dist`目录下，也可以点击打开bundle.js文件
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190306164857182.png)
其他关于`devServer`的配置参数
**2. html-webpack-plugin**
其实上面的配置的真正用途并不是让我们显示js文件内容，而是将打包生成的js文件自动引入到我们自己的html文件中。接下来我们去看看如何实现？
* （1）安装`html-webpack-plugin`插件

> yarn add html-webpack-plugin -D

* （2）在`webpack.config.js`文件中对`html-webpack-plugin`插件进行引入及配置

```js
//引入
let HtmlWebpackPlugin = require('html-webpack-plugin');
...
module.exports = {
...
 plugins: [ //数组：放着所有的webpack插件
 	// 配置
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index1.html'
    })
  ]
}
```
* （3）我们来解释一下上述中的配置，其中，`template`意为模板，值为自己所创建编写的html文件路径。
我们在src目录下，创建一个名为index.html文件，代码如下：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  <div>
    Hello Webpack!
  </div>
</body>
</html>
```
`template`就是指定打包的`bundle.js`文件所引入的HTML文件。而`filename`属性的意思就是所生成HTML文件名（任意），内容只是比`template`所指的HTML文件多引入了`bundle.js`
* （4）运行打包命令`npx webpack`
生成了`dist`文件夹及`bundle.js`、`index1.html`文件

```
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  <div>
    Hello Webpack!
  </div>
<script type="text/javascript" src="bundle.js"></script></body>
</html>
```
我们可以看到`index1.html`文件只是多了一个<script type="text/javascript" src="bundle.js"></script>标签。
* （5）运行开启服务器命令`npx webpack-dev-server`，打开浏览器，输入http://localhost:3000/
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190306185207900.png)
点击index1.html文件
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190306185338892.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2EyMDEzMTI2Mzcw,size_16,color_FFFFFF,t_70)
那如何一输入http://localhost:3000/就能打开html文件呢。很简单啦！在配置文件内，将`filename`值为index.html，而不是index1.html，这样生成的HTML文件名为index.html。输入一个有效网址，将自动打开index.html文件。

有用的话，给点个赞或评论一下呗！要找工作啦

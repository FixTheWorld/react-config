# react-config
react通用webpack config以及package.json
[react-config](https://forceking3.github.io/react-config "点击查看")
![git](https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1496917053852&di=e47e4e57b13b9e5a1f733dc8cd778399&imgtype=0&src=http%3A%2F%2Fwww.th7.cn%2Fd%2Ffile%2Fp%2F2016%2F08%2F10%2Fa25959f80491d3d4bd26975deb9457c1.jpg)

# package.json

  "dependencies": {
  
    "babel-polyfill": "^6.16.0",//babel补充包
    "es6-promise": "^4.1.0",//promise补充包
    "isomorphic-fetch": "^2.2.1",//使fetch可以全局使用
    "jsonwebtoken": "^7.4.0",//授权加密工具
    "material-ui": "^0.17.4",//react组件库
    "moment": "^2.18.1",
    "node-sass": "^3.7.0",
    "numeral": "^2.0.6",
    "react": "^15.3.2",//核心
    "react-bootstrap": "^0.30.8",//ui布局工具
    "react-dom": "^15.3.2",//核心
    "react-localization": "0.0.13",//本地化
    "react-redux": "^5.0.4",//核心
    "react-router": "^3.0.5",//核心，路由
    "react-tap-event-plugin": "^2.0.1",
    "redux": "^3.6.0",//核心，状态管理器
    "redux-thunk": "^2.2.0",//中间件，可以在Action发出后异步执行reducer
    "sass": "^0.5.0",//css编程工具
    "sass-loader": "^4.0.0",//webpack sass加载器
    "webpack": "^2.4.1"//核心工具
  },
  
  "devDependencies": {
  
    "autoprefixer": "^6.7.7",//webpack postcss插件css自动增加浏览器前缀
    "babel-loader": "^6.4.1",
    "babel-plugin-import": "^1.1.1",
    "babel-preset-es2015": "^6.22.0",
    "babel-preset-react": "^6.23.0",
    "babel-preset-stage-0": "^6.22.0",
    "css-loader": "^0.25.0",//webpack css加载器
    "cssnano": "^3.10.0",//webpack postcss插件，去除空格
    "express": "^4.15.2",//服务器
    "file-loader": "^0.11.1",//webpack 文件加载器
    "html-webpack-plugin": "^2.28.0",//webpack 压缩html以及注入js
    "postcss": "^5.2.17",//css工具集
    "postcss-loader": "^1.3.3",//webpack postcss加载器
    "redux-logger": "^3.0.1",//中间件，redux调试工具
    "rimraf": "^2.6.1",//移除文件的命令行工具
    "style-loader": "^0.13.1",//webpack css加载器
    "url-loader": "^0.5.8",//webpack 图片加载器
    "webpack-dev-server": "^2.4.2",//webpack 测试服务器，热替换
    "webpack-spritesmith": "^0.3.3"//webpack插件，生成雪碧图
    }

/**
 * Created by changjin.zhang on 4/13/2017.
 */
const webpack=require('webpack');
const path=require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const prefix=require('autoprefixer');
const SpritesmithPlugin = require('webpack-spritesmith');
// const px2rem = require('postcss-px2rem');
// const CompressionWebpackPlugin = require('compression-webpack-plugin');//gzip压缩，需要服务器开启gzip转换
const config=require('./config');
const env=config.env;
const webpackConfig= {
    entry: {
        "js/app": path.resolve('', "./index.js"),
        "js/vendor":[
            'react',
            'react-redux',
            'react-router',
            'redux'
        ]
    },
    output: {
        path:path.resolve('',"./build"),
        filename: "[name].[hash].js",
        // publicPath:'',//默认是当前路径，可以写入“/”来做成绝对路径
        chunkFilename:"js/[name].[hash].js"//按需加载的js文件的路径和后缀名
    },
    module:{
        rules:
            [{
                test:/\.(js|jsx)$/,
                exclude:/node_modules/,
                loader:'babel-loader',
                query:{
                    presets:['es2015','react','stage-0']
                }
            },{
                test: /\.css$/,
                use:ExtractTextPlugin.extract({fallback:"style-loader", use:"css-loader"})
            },{
                test:/\.scss$/,
                use:ExtractTextPlugin.extract({
                    fallback:"style-loader",
                    use:["css-loader",{
                        loader:"postcss-loader",
                        options: {
                            plugins:
                                function () {
                                    return [
                                        prefix({browsers : ['last 2 versions']}),
                                        // px2rem({remUnit:32})
                                    ];
                                }

                        }
                    },"sass-loader"]
                })
            },{
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader?limit=8192&name=images/[name].[ext]'//8192B,8KB
            }
        ]
    },
    devServer: {
        port:2355,
        hot:true,
        historyApiFallback: true,//不跳转
        inline: true//实时刷新
    }
};
webpackConfig.plugins=[
    //定义全局变量
    new webpack.DefinePlugin({
        'process.env.NODE_ENV':JSON.stringify(config.env)
    }),
    //提取html并将相应打包后的js注入到body底部
    new HtmlWebpackPlugin({
        template :path.resolve('',"./index.html"),
        hash     : false,
        filename : 'index.html',
        inject   : 'body',

    }),
    //将指定路径下的图片合并为雪碧图
    new SpritesmithPlugin({
        src: {
            cwd: path.resolve('', 'src/assets/img'),
            glob: '*.png'
        },
        //图片和样式的输出目录
        target: {
            image: path.resolve('', 'src/assets/img/sprite/sprite.png'),
            css: path.resolve('', 'src/assets/css/sprite.css')
        },
        apiOptions: {
            cssImageRef: '/src/assets/img/sprite/sprite.png'//css文件相对sprite文件的路径
        },
        spritesmithOptions: {
            algorithm: 'top-down'
        }
    }),
    new ExtractTextPlugin({filename:"styles.css",allChunks:true}),
    //提取通用js文件，缺省chunks参数将会把入口entry中的通用文件提取到vendor中
    new webpack.optimize.CommonsChunkPlugin({
        names : ['js/vendor']
    }),
    // new CompressionWebpackPlugin({ //gzip 压缩,需要服务器开启gzip转换
    //     asset: '[path].gz[query]',
    //     algorithm: 'gzip',
    //     test: new RegExp(
    //         '\\.(js|css)$'    //压缩 js 与 css
    //     ),
    //     threshold: 10240,
    //     minRatio: 0.8
    // })
];
//按环境加载插件
if(env==='development') {
    webpackConfig.devtool="cheap-module-eval-source-map";
    webpackConfig.plugins.push(
        new webpack.HotModuleReplacementPlugin(),//hmr热替换
        new webpack.NoEmitOnErrorsPlugin());//出错不影响执行
}else if(env==='production'){
    webpackConfig.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            comments: false,
            compress : {
                unused    : true,
                dead_code : true,
                warnings  : false
            }
        }),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin()//按发生次数分配模块和块id，减少总文件大小
    );
}
module.exports=webpackConfig;
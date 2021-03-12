'use strict'
const path = require('path')
// 【utils 工具方法】
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
// 【创建Linting规则，对.vue的文件进行eslint进行检查】
const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  options: {
    // 【表示当前检测到错误时候，会友好的提示错误信息，以提供ES6的官网链接，以提供查看错误原因】
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})

module.exports = {
  // 【这里应该是定义当前项目的根目录】
  context: path.resolve(__dirname, '../'),
  // 【入口配置】
  entry: {
    // 【给app置为./src/main.js为对象的配置】替
    // 【它表示webpack编译入口JS文件是指向./src/main.js】
    app: './src/main.js'
  },
  // 【项目外部输出的配置】
  output: {
    // 【输出的路径，这对应config文件夹下index.js中的 51行】
    path: config.build.assetsRoot,
    // 【输出的文件名称，这里的name对应的就是app.js，所以，在刷新页面，在network中的app.js就是从这里形成的】
    filename: '[name].js',
    // 【是请求资源的绝对路径，对应在config下index.js中的54行，其实就是“/”根路径】
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  // 【表示关于在我们代码中，require或者是ES6 ecort模块的相关配置，】
  resolve: {
    // 【表示可以在reqire的路径中自动补全后缀】
    extensions: ['.js', '.vue', '.json'],
    // 【提供一些自己定义的一些配置路径的别名】
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'my-tab-content': resolve('src/components/tab-content'),
      'my-assets': resolve('src/assets')
    }
  },
  // 【loader对应的xxx-loader】
  // 【这都是对某种类型的文件，应用某一个loader去做处理，在webpack编译阶段就是利用loader对文件进行编译】
  // 【他的原理就会扫描当前工程目录，然后去根据后缀名匹配不同的文件，文件内容作为输入，对应的loader会做一番处理】
  // 【输入新的文件内容】
  module: {
    rules: [
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        // 【表示值检查匹配到的文件，exclude就是排除匹配到的文件目录】
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          // 【表示当图片大小小于10KB时，会生成base64串打包到编译后的JS文件里】
          // 【超过10KB就会生成一个文件，这个文件名字的命名规则，就是利用utils.assetsPath生成的】
          // 【对应 build文件里的utils.js的 7行】
          limit: 10000,
          // 【然后生成一个static/img/文件名称.哈希7位字符串.扩展名】
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.sass$/,
        loaders: ['style', 'css', 'sass']
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}

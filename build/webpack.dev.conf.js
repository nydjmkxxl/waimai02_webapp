'use strict'
const utils = require('./utils')
// 【webpack 核心编译工具】
const webpack = require('webpack')
// 【config 表示配置文件，文件在根目录里的config的index.js中】
const config = require('../config')
// 【混合】
const merge = require('webpack-merge')
// 【path 是node提供的API，他是表示文件路径操作的一些方法】
const path = require('path')
// 【webpack的相关配置，然后在当前目录找到webpack.base.conf.js】
// 【webpack.base.conf是开发环境生产环境共享的】
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
// 【定义了一些端口号，】
const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)
// 【hot-load 在不用刷新浏览器的的情况系，也能看到改变后的效果，
// 如果这个过程失败了，他就会自动刷新浏览器】
const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    // 【调用了utils.styleLoaders 转到config下index.js的 43行看cssSourceMap的值】
    // 【调用了utils.styleLoaders 转到utils下的styleLoaders 76行】
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  // 廉价模块-eval-source-map对开发来说更快
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.因为我们使用复制WebPack插件
    compress: true,
    // 【端口号】
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    // 【配置自动打开浏览器】
    open: config.dev.autoOpenBrowser,
    // 【错误时候在遮罩增显示错误】
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    // 【资源公共路径的配置】
    publicPath: config.dev.assetsPublicPath,
    // 【一些端口的代理，转发】
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin 必要的友好错误插件
    // 【观察选项】
    watchOptions: {
      // 【在config的index.js 21 poll为 false】
      // 【自定义监视模式的选项】
      poll: config.dev.poll,
    }
  },
  // 【定义了插件】
  plugins: [
    // 【作用是把 process.env 替换成请求到的值 转到 config下dev.env.js下 导出的对象 含有development】
    // 【基于这点来判断开发时还是运行时的判断，】
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    // 【webpack相关的插件】
    // 【热加载的插件】
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.HMR在更新时在控制台显示正确的文件名
    // 【当编译发生错误时，会跳过那部分代码，然后是运行时发生错误，】
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    // 【编译后通过fileName的值为指定文件名】
    // 【模板文件也一样】
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      // 【表示打包和输出的一些css，js的路径会自动添加到index.html文件里】
      // 【inject 添加之意】
      inject: true
    }),
    // copy custom static assets
    // 【复制自定义静态资产】
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port

  // var express = require('express')
  // var app = express()
  // console.log(1111)
  // var appData = require('../static/data.json')
  // var seller = appData.seller
  // var goods = appData.goods
  // var ratings = appData.ratings
  // var apiRoutes = express.Router()

  // apiRoutes.get('/seller', function (req, res) {
  //   res.json({
  //     errorNo: 0,
  //     data: seller
  //   })
  // })

  // apiRoutes.get('/goods', function (req, res) {
  //   res.json({
  //     errorNo: 0,
  //     data: goods
  //   })
  // })

  // apiRoutes.get('/ratings', function (req, res) {
  //   res.json({
  //     errorNo: 0,
  //     data: ratings
  //   })
  // })

  // app.use('/api', apiRoutes)
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      // 【发布e2e测试所必需的新端口】
      process.env.PORT = port
      // add port to devServer config
      // 【将端口添加到devServer配置中】
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})

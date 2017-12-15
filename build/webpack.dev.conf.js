'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

const ip = require('ip');
const IP = ip.address();

const appData = require('./data.json');
const bodyParser = require('body-parser');

const timer = null;

const HOST = IP || process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)
const API_ENV = process.env.API_ENV || 'dev'
const API_ORIGIN = config.useProxy ? '/': config.sites[API_ENV]
const httpProxy = API_ENV === 'mock' || !config.useProxy ? {} : {
  "/linktownFront": {
    target: API_ORIGIN,
    changeOrigin: true
  }
}
console.log(httpProxy)

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: true,
    hot: true,
    compress: true,
    open: config.dev.autoOpenBrowser,    
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: httpProxy,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    },
    before (app) {
      app.use(bodyParser.json({limit: '1mb'}));
      app.use(bodyParser.urlencoded({
        extended: true
      }));
      
      appData.map(val => {
        app[val.metheod](val.api, (req, res) => {
          res.json({
            code: '000000',
            data: val.data
          })
        })
      });
      // app.post('/api/imgList', function(req, res) {
      //   // console.log(req.body);
      //   var imageListData = imgListData;
      //   var type = req.body.type || 0;
      //   var pageSize = +req.body.pageSize || 10;
      //   var pageNo = +req.body.pageNo || 0;
      //   var count = pageSize * pageNo;
      //   if (+type) {
      //     var imgListArr = [];
      //     imageListData.forEach((val) => {
      //       if (val.type == type) {
      //         imgListArr.push(val);
      //       }
      //     });
      //     var imageListData = imgListArr;
      //   }
      //   var imgList = imageListData.slice(count, count + pageSize);
      //   var isLast = imageListData.slice(count + pageSize + 1).length === 0;
      //   clearTimeout(timer);
      //   timer = setTimeout(function () {
      //     res.json({
      //       code: '000001',
      //       data: {
      //         imgList: imgList,
      //         isLast: isLast,
      //         total: imageListData.length
      //       }
      //     });  
      //   }, 1000);
      // });
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env'),
      VERSION: JSON.stringify(config.version),
      API_ENV: JSON.stringify(API_ENV),
      API_ORIGIN: JSON.stringify(API_ORIGIN)
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      title: config.title,
      filename: 'index.html',
      template: 'index.html',
      inject: true,
      sites: config.sites
    }),
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
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

require('./check-versions')()

var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()

// mock data start
var apiData = require('../src/api/workflow.json')
var chinaData = require('../src/api/China_area.json');
var provinces = chinaData.provinceJson;
var cities = chinaData.cityJson;
var counties = chinaData.countyJson;
//路由器
var apiRouter = express.Router()
//注册路由
apiRouter.get('/workflow', function (req, res) {
  res.json({
    code: 0,  //正确的数据
    data: apiData
  })
})
// 获取省
apiRouter.get('/provinces', function (req, res) {
  res.json({
    code: 0,  //正确的数据
    data: provinces
  })
})
// 获取市
apiRouter.get('/cities', function (req, res) {
  var citiesData = []
  var id = req.query.provinceID
  cities.forEach((ele, index) => {
    if (ele.parent === id || ele.id === id) {
      citiesData.push(ele)
    }
  })
  // 获取县
  res.json({
    code: 0,  //正确的数据
    data: citiesData
  })
})
apiRouter.get('/counties', function (req, res) {
  var countiesData = []
  var id = req.query.cityID
  counties.forEach(function (ele, index) {
    if (ele.parent === id) {
      countiesData.push(ele)
    }
  })
  res.json({
    code: 0,  //正确的数据
    data: countiesData
  })
})

//启动路由器
app.use('/api', apiRouter)
// mock data end

var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {
  }
})
// force pages reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({action: 'reload'})
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = {target: options}
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})

var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}

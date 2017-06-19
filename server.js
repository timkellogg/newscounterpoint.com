require('dotenv').config()

const koa       = require('koa')
const serve     = require('koa-static')
const app       = new koa()
const router    = require('./router')
const logging   = require('koa-logger')
const views     = require('koa-views')
const mount     = require('koa-mount')

const config = {
  assetPath: __dirname + '/public',
  viewsPath: __dirname + '/views',
}

if (process.env.development) {
  app.use(require('koa-browser-sync')({ init: true }));
}

app.use(logging())
app.use(serve(config.assetPath))
app.use(mount('/articles', serve(config.assetPath)))
app.use(views(config.viewsPath, { extension: 'pug' }))
app.use(router.routes())

app.listen(3000)

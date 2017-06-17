const koa     = require('koa')
const serve   = require('koa-static')
const app     = new koa()
const router  = require('./router')
const logging = require('koa-logger')
const views   = require('koa-views')

if (process.env.development) {
  app.use(require('koa-browser-sync')({init: true}));
}

app.use(logging())
app.use(serve(__dirname + '/assets/dist'))
app.use(views(__dirname + '/views', { extension: 'pug' }))
app.use(router.routes())

app.listen(3000)

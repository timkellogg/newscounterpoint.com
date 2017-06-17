const koa = require('koa')
const app = new koa()

// middlewares
const logging    = require('koa-logger')
const templating = require('koa-views')

app.use(logging())
app.use(templating(__dirname + '/views'), {
  map: {
    html: 'hbs',
  }
})

app.use(async ctx => {
  ctx.state = { title: 'My title' }
  await ctx.render('pages/')
})

app.listen(3000)


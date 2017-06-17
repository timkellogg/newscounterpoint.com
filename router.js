const router       = require('koa-router')()
const controllers  = require('./controllers/index')

router
  .get('/', controllers.pages.index)

module.exports = router

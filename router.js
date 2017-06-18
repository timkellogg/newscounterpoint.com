const router       = require('koa-router')()
const controllers  = require('./controllers/index')

router
  .get('/', controllers.pages.index)
  .get('/styleguide', controllers.pages.styleguide)

module.exports = router

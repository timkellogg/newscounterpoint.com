const router       = require('koa-router')()
const controllers  = require('./controllers/index')

router
  .get('/', controllers.pages.Index)
  .get('/styleguide', controllers.pages.Styleguide)
  .get('/articles', controllers.articles.Index)
  .get('/articles/new', controllers.articles.New)
  .get('*', controllers.pages.Index)

module.exports = router

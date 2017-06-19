const prefix  = 'articles'

const Article = require('../models/user')

async function Index(ctx) {
  const articles = await Article.find({})

  ctx.state = { articles }
  
  console.log('articles', articles)

  await ctx.render(`${prefix}/index`)
}

async function New(ctx) {
  await ctx.render(`${prefix}/new`)
}

module.exports = {
  Index,
  New,
}

const prefix  = 'articles'

const Article = require('../models/article')

async function Index(ctx) {
  const articles = await Article.find({})

  ctx.state = { articles }

  await ctx.render(`${prefix}/index`)
}

async function New(ctx) {
  const action = `/${prefix}`
  const method = 'POST'

  ctx.state = { action, method }

  await ctx.render(`${prefix}/new`)
}

async function Create(ctx) {
  const { title, body, published } = ctx.request.body

  try {
    const article = new Article({ title, body, published })

    await article.save()
    await ctx.redirect(`${prefix}`)
  } catch(err) {
    console.error(err)

    ctx.status = 422

    await ctx.render(`${prefix}/new`)
  }
}

module.exports = {
  Index,
  New,
  Create,
}

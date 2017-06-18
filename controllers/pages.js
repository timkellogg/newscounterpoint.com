const prefix = 'pages'

async function index(ctx) {
  ctx.state = { title: 'Blog' }
  await ctx.render(`${prefix}/index`)
}

async function styleguide(ctx) {
  await ctx.render(`${prefix}/styleguide`)
}

module.exports = {
  index,
  styleguide,
}

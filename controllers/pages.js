const prefix = 'pages'

async function Index(ctx) {
  ctx.state = { title: 'Blog' }
  await ctx.render(`${prefix}/index`)
}

async function Styleguide(ctx) {
  await ctx.render(`${prefix}/styleguide`)
}

module.exports = {
  Index,
  Styleguide,
}

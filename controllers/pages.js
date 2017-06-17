const prefix = 'pages'

async function index(ctx) {
  ctx.state = { title: 'Blog' }
  await ctx.render(`${prefix}/index`)
}

module.exports = {
  index,
}

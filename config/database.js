const mongoose  = require('mongoose')

// use native promises
mongoose.Promise = global.Promise

module.exports = mongoose.connect(process.env.DATABASE_URL)

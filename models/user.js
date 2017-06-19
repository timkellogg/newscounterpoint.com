const mongoose = require('../config/database')

const userSchema = mongoose.Schema({
  fname: { type: String, trim: true },
  lname: { type: String, trim: true },
})

module.exports = mongoose.model('User', userSchema)

const mongoose = require('../config/database')

const articleSchema = mongoose.Schema({
  title: String,
  body: String,
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  published: Boolean,
  commentable: Boolean,
})

module.exports = mongoose.model('Article', articleSchema)

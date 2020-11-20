const mongoose = require('mongoose')
const scheme = mongoose.Schema

const commentScheme = new scheme({
    name: String,
    msg: String
})

// const Comment = commentScheme.model('comment', commentScheme)
module.exports = mongoose.model('comment',commentScheme)
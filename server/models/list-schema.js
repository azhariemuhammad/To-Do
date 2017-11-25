const mongoose = require('mongoose')
const Schema = mongoose.Schema


const listSchema = new Schema({
  userId   : {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  to_do  : [{type: String}]
})



const List = mongoose.model('List', listSchema)

module.exports = List;

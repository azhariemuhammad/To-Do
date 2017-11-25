const mongoose = require('mongoose')
const Schema = mongoose.Schema


const todoSchema = new Schema({
  name       : String,
  userId     : {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  task       : String,
  tags       : [{type: String}],
  isComplete : Boolean,
  createdAt  : {
    type     : Date,
    default  : Date.now
  }
})



const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo;

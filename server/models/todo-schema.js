const mongoose = require('mongoose')
const Schema = mongoose.Schema


const todoSchema = new Schema({
  name       : String,
  userId     : {
    type: Schema.Types.ObjectId,
    ref: 'Usertodo'
  },
  task       : String,
  tag        : String,
  isComplete : Boolean,
  createdAt  : {
    type     : Date,
    default  : Date.now
  }
})



const Todo = mongoose.model('Todoist', todoSchema)

module.exports = Todo;

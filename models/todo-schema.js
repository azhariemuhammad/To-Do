const mongoose = require('mongoose')
const Schema = mongoose.Schema


const todoSchema = new Schema({
  task      : String,
  user      : String,
  tags      : String,
  createdAt : {
    type    : Date,
    default : Date.now
  }
})



const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo;

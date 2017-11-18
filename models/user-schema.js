const mongoose = require('mongoose')
const Schema = mongoose.Schema


const userSchema = new Schema({
  username  : String,
  email     : {
  type      : String,
  validate  : {
    validator : function(email) {
      let emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
      return emailReg.test(email)
    },
    message : '{VALUE} is not a valid email'
  },
  required : [true, 'Email required']
},
  password  : String,
  createdAt : {
    type    : Date,
    default : Date.now
  }
})



const User = mongoose.model('User', userSchema)

module.exports = User;

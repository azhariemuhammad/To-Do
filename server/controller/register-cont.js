const User = require('../models/user-schema')
const bcrypt  = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken')
require('dotenv').config()
const secret = process.env.SECRET_KEY
const { createFaceListId, addingFaceId } = require('../middleware/facialDetection')



const login = (req, res) => {
  console.log(req.headers, '-----')
  console.log(req.body.email, '=======')
  User.findOrCreate({ username: req.body.username }, { email: req.body.email}, (err, result) => {
    if (!err) {
      console.log('ressult: ', result)
      let payload = {
        userId: result._id,
        username: result.username,
        email: result.email
      }
      let token = jwt.sign(payload, secret)
      console.log(token, 'ini token server')
      res.status(200).send(token)
    } else {
      console.log('err: ', err)
      res.status(500).send({ msg: 'wrong input', err: err })
    }
  })
}





module.exports = {
  login
};

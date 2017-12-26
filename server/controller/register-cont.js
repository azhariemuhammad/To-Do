const User = require('../models/user-schema')
const bcrypt  = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken')
require('dotenv').config()
const secret = process.env.SECRET_KEY
const { createFaceListId, addingFaceId } = require('../middleware/facialDetection')



const login = (req, res) => {
  console.log(req.headers, '-----')
  console.log(req.body.faceId, '=====erge==')
  User.find(
    {faceId: req.body.faceId},  (err, result) => {
    if (!err) {
      console.log('ressult: ', result)
      let payload = {
        userId: result[0]._id,
        username: result[0].username,
        email: result[0].email,
        faceId: result[0].persistedFaceId
      }
      let token = jwt.sign(payload, secret)
      console.log(token, ' token server')
      res.status(200).send(token)
    } else {
      console.log('err: ', err)
      res.status(500).send({ msg: 'wrong input', err: err })
    }
  })
}

const signup = (req, res) => {
  console.log(req.headers, '-----')
  console.log(req.body.username, '=====erge==')
  User.create({
    faceId: req.body.faceId,
    username: req.body.username
    }, (err, result) => {
      if (!err) {
        console.log(result, ' token server')
        res.status(200).send(result)
      } else {
        console.log('err: ', err)
        res.status(500).send({ msg: 'wrong input', err: err })
      }
    })
}





module.exports = {
  login,
  signup
};

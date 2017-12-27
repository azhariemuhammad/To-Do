const functions = require('firebase-functions')
const express = require ('express')
const jwt = require('jsonwebtoken')
const cors = require("cors")
const app = express()
app.use(cors({ origin: true }))


const FB = require('fb'),
  fb = new FB.Facebook({ appSecret: '215caaa9a859161d3cf8e19380e9341a' })

const setAccessToken = (req, res, next) => {
  FB.setAccessToken(req.query.accesstoken);
  next()
}




app.get('/facebooklogin', setAccessToken, (req, res) => {
  FB.api('/me', { fields: 'id,name, email' }, function (response) {
    if (response) {
      res.json(response)      
    } else {
      res.status(500).json({
        error: 'error'
      })
    }
  })
})


exports.app = functions.https.onRequest(app)
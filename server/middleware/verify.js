const jwt = require('jsonwebtoken')
require('dotenv').config()
const secret = process.env.SECRET_KEY


const isLogin = (req, res, next) => {
  let token = req.headers.token
  console.log(req.headers, 'ini token');
  jwt.verify(token , secret, function(err, decoded) {
    if (!err) {
      console.log(decoded, '------');
      next()
    } else {
      res.status(401).send('Please signin')
    }
  })
}

const isOwner = (params, req, res) => {
  console.log(params);
  let token = req.headers.token
  let decoded = jwt.decode(token, {complete: true})
  console.log('-------------------');
  console.log(decoded.header);
  console.log(decoded.payload, '===========');
  res.send(decoded.payload)
}




module.exports = {
  isLogin,
  isOwner
};

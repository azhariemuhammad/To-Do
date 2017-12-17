const URL = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/facelists/'
const URL_FaceId = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false'
const URL_FindSimilars = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/findsimilars'
const axios = require('axios')
const facialKey = process.env.Opc_APIM_SUBCRIPTIONS_KEY
const faceListName = 'kookaburra'
require('dotenv').config()

const createFaceListId = (req, res, next) => {
  axios.put(URL + faceListName, {
    name: req.body.name,
    userData: req.body.userData
  }, {
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": "5a95fb4811864b1e8826dbf79285d2b5"
    }})
  .then(res => {
    console.log('result Facial List: ', res.headers)
    next()
  })
  .catch(err => {
    console.log('err createFaceListId', err)
  })
}

const getFacelist = (req, res, next) => {
  axios.get(URL, {
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": "5a95fb4811864b1e8826dbf79285d2b5"
    }
  })
  .then(res => {
    console.log('faceLists: ', res.data)
    next()
  })
  .catch(err => {
    console.log('err getFacelist: ', err)
  })
  
}

const addingFaceId = (req, res) => {
  axios.post(URL + faceListName + `/persistedFaces?userData=${req.body.username}`, {
    url: req.body.url
  }, {
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": "5a95fb4811864b1e8826dbf79285d2b5"
    }})
  .then(res => {
    console.log('added FaceId: ', res)
    return res.data
  })
  .catch(err => {
    console.log('err addingFaceId ', err)
  })
}

const faceDetect = (req, res, next) => {
  axios.post(URL_FaceId, {
    url: req.body.url
  },{
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": "5a95fb4811864b1e8826dbf79285d2b5"
    }
  })
  .then(res => {
    console.log('faceDetect: ', res.data)
  })
  .catch(err => {
    console.log('err facedetect: ', err)
  })
}

const findSimilars = (req, res) => {
  axios.post(URL_FindSimilars, {
    'faceId': req.body.faceId,
    'faceListId': faceListName,
    'maxNumOfCandidatesReturned': 10,
    mode: 'matchPerson'
  }, {
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": "5a95fb4811864b1e8826dbf79285d2b5"
    }
  })
  .then(res => {
    console.log('findSimilars: ', res.data)
  })
  .catch(err => {
    console.log('err findsimilars: ', err)
  })
}


module.exports = {
  createFaceListId,
  addingFaceId,
  getFacelist,
  faceDetect,
  findSimilars
}
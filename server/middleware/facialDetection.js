const URL = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/facelists/'
const URL_FaceId = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false'
const URL_FindSimilars = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/findsimilars'
const axios = require('axios')
const facialKey = process.env.Opc_APIM_SUBCRIPTIONS_KEY
const faceListName = 'kookaburra'
require('dotenv').config()

const createFaceListId = (req, response, next) => {
  axios.put(URL + faceListName, {
    name: req.body.name,
    userData: req.body.userData
  }, {
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": facialKey
    }})
  .then(res => {
    console.log('result Facial List: ', res.headers)
    next()
  })
  .catch(err => {
    console.log('err createFaceListId', err)
    response.status(500).send({ msg: err })
  })
}

const getFacelist = (req, response, next) => {
  axios.get(URL, {
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": facialKey
    }
  })
  .then(res => {
    console.log('faceLists: ', res.data)
    next()
  })
  .catch(err => {
    console.log('err getFacelist: ', err)
    response.status(500).send({ msg: err })
  })
  
}

// req.headers: {
//   host: 'localhost:3000',
//     connection: 'keep-alive',
//       'content-length': '2',
//         accept: 'application/json, text/plain, */*',
//           origin: 'http://localhost:8080',
//             'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.91 Safari/537.36',
//               'content-type': 'application/json;charset=UTF-8',
//                 referer: 'http://localhost:8080/login',
//                   'accept-encoding': 'gzip, deflate, br',
//                     'accept-language': 'en-US,en;q=0.8,id;q=0.6'
// }

const addingFaceId = (req, response) => {
  console.log('body : ', req.body)
  // req.body = JSON.parse(req.body)
  console.log('req.headers: ', req.headers)
  let fileName = req.body.uniqueName
  let url = req.body.url
  console.log('url === : ', url)
  console.log('uniqueName ===== : ', fileName)
  axios.post(URL + faceListName + `/persistedFaces?userData=${fileName}`, {
    url: url
  }, {
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": facialKey
    }})
  .then(res => {
    console.log('added FaceId: ', res)
    response.status(200).send({ data: res.data, msg: 'succes adding persistedFaceId' })
  })
  .catch(err => {
    // console.log('err addingFaceId ', err)
    response.status(500).send({ msg: err })
  })
}

const faceDetect = (req, response, next) => {
  axios.post(URL_FaceId, {
    url: req.body.url
  },{
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": facialKey
    }
  })
  .then(res => {
    console.log('faceDetect: ', res.data)
    req.body.faceId = res.data[0].faceId
    next()
    // response.status(200).send({ data: res.data, msg: 'succes create faceId'})
  })
  .catch(err => {
    console.log('err facedetect: ', err)
    response.status(500).send({msg: err})
  })
}

const findSimilars = (req, response) => {
  axios.post(URL_FindSimilars, {
    'faceId': req.body.faceId,
    'faceListId': faceListName,
    'maxNumOfCandidatesReturned': 10,
    mode: 'matchPerson'
  }, {
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": facialKey
    }
  })
  .then(res => {
    console.log('findSimilars: ', res.data)
    if (res.data.length === 0) {
      response.status(200).send({ data: res.data, msg: 'no matched' })
    } else {
      response.status(200).send({ data: res.data, msg: 'matched' })
    }
  })
  .catch(err => {
    console.log('err findsimilars: ', err)
    response.status(500).send({ msg: err })
  })
}


module.exports = {
  createFaceListId,
  addingFaceId,
  getFacelist,
  faceDetect,
  findSimilars
}
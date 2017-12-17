const express = require('express')
const router  = express.Router()
const todoController = require('../controller/todo-cont')
const userController = require('../controller/user-cont')
const registerController = require('../controller/register-cont')
const listController = require('../controller/list-cont')
const verify = require('../middleware/verify')
const { createFaceListId, addingFaceId, getFacelist, faceDetect, findSimilars } = require('../middleware/facialDetection')
var cors = require('cors')


/// ================= register ====================////
// router.post('/login', registerController.login)
router.post('/facialdetect', createFaceListId, getFacelist, addingFaceId)

router.post('/facedetection', faceDetect)

router.post('/findsimilars', findSimilars)


/// ================= todo ====================////
// router.get('/todo/:id', todoController.findAllTodo)
router.get('/todo/:userId', todoController.findAllTodo)

router.post('/todo', todoController.create)

router.put('/todo/:id', todoController.findAndUpdate)

router.get('/todo/edit/:id', todoController.findOne)

router.post('/todo/:userId', todoController.findTasks)

router.post('/todo/:userId', todoController.findbyTag)

router.delete('/todo/:id', todoController.findByIdAndRemove)


/// ================= user ====================////
router.get('/users', userController.findAllUsers)

router.get('/users/:username', userController.findOne)

router.post('/users', userController.create)

router.put('/users/:id', userController.findAndUpdate)

router.delete('/users/:id', userController.findByIdAndRemove)


/// ================= List ====================////
router.get('/list/:userId', listController.findAllList)

router.put('/list/:userId/:id', listController.findAndUpdate)

router.post('/list/:userId', listController.create)

router.delete('/list/:id', listController.findByIdAndRemove)



module.exports = router

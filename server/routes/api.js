const express = require('express')
const router  = express.Router()
const todoController = require('../controller/todo-cont')
const userController = require('../controller/user-cont')
const registerController = require('../controller/register-cont')
const verify = require('../middleware/verify')
const { createFaceListId, addingFaceId, getFacelist, faceDetect, findSimilars } = require('../middleware/facialDetection')



/// ================= register ====================////
router.post('/login', registerController.login)

router.post('/signup', registerController.signup)

router.post('/facialdetect', createFaceListId, getFacelist, addingFaceId)

router.post('/addingfaceid', addingFaceId)

router.post('/facedetection', faceDetect, findSimilars)

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


module.exports = router

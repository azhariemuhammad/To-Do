const express = require('express')
const router  = express.Router()
const todoController = require('../controller/todo-cont')
const userController = require('../controller/user-cont')
const registerController = require('../controller/register-cont')
const verify = require('../middleware/verify')



/// ================= register ====================////
router.post('/signin', registerController.signin)

router.post('/signup', registerController.signup)


/// ================= todo ====================////
router.get('/todo', verify.isLogin, todoController.findAllTodo)

router.post('/todo', todoController.create)

router.put('/todo/:id', todoController.findAndUpdate)

router.get('/todo/:id', todoController.findOne)

router.post('/todo/:userId', todoController.findTasks)

router.post('/todo/:userId', todoController.findbyTag)

router.delete('/todo/:id', todoController.findByIdAndRemove)


/// ================= user ====================////
router.get('/user', userController.findAllUsers)

router.post('/user', userController.create)

router.put('/user/:id', userController.findAndUpdate)

router.delete('/user/:id', userController.findByIdAndRemove)



module.exports = router

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
router.get('/todo/:id', todoController.findAllTodo)

router.post('/todo', todoController.create)

router.put('/todo/:id', todoController.findAndUpdate)

router.get('/todo/edit/:id', todoController.findOne)

router.post('/todo/:userId', todoController.findTasks)

router.post('/todo/:userId', todoController.findbyTag)

router.delete('/todo/:id', todoController.findByIdAndRemove)


/// ================= user ====================////
router.get('/users', userController.findAllUsers)

router.post('/users', userController.create)

router.put('/users/:id', userController.findAndUpdate)

router.delete('/users/:id', userController.findByIdAndRemove)



module.exports = router

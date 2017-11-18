const express = require('express')
const router  = express.Router()
const todoController = require('../controller/todo-cont')
const userController = require('../controller/user-cont')


/// ================= todo ====================////
router.get('/todo', todoController.findAllTodo)

router.post('/todo', todoController.create)

router.put('/todo/:id', todoController.findAndUpdate)

router.get('/todo/:tag', todoController.findWhere)

router.delete('/todo/:id', todoController.findByIdAndRemove)


/// ================= user ====================////
router.get('/user', userController.findAllUsers)

router.post('/user', userController.create)

router.put('/user/:id', userController.findAndUpdate)

router.delete('/user/:id', userController.findByIdAndRemove)



module.exports = router

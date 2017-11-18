const express = require('express')
const router  = express.Router()
const todoController = require('../controller/todo-con')


router.get('/todo', todoController.findAllTodo)

router.post('/todo', todoController.create)

router.put('/todo/:id', todoController.findAndUpdate)

router.get('/todo/:user/:tag', todoController.findWhere)

router.delete('/todo/:id', todoController.findByIdAndRemove)



module.exports = router

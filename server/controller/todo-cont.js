const Todo = require('../models/todo-schema')
let msg = ''
const verify = require('../middleware/verify')
const jwt = require('jsonwebtoken')
let decoded = ''



// find all todo list
const findAllTodo = (req, res) => {
  decoded = jwt.decode(req.headers.token)
  Todo.find({userId:decoded.id}).
  populate('userId').
  exec((error, todolists) => {
    if (!error) {
      res.status(200).send(todolists)
    } else {
      res.status(500).send(error)
    }
  })
}

//TODO: ini harus edit
const findOne = (req, res) => {
  decoded = jwt.decode(req.headers.token)
  Todo.find({_id : req.params.id, userId : decoded.id }).
  populate('userId').
  exec((error, todo) => {
    if (!error) {
      res.status(200).send(todo)
    } else {
      res.status(500).send(error)
    }
  })
}

//create one todo using method save
const create = (req, res) => {
  let todo = new Todo(
    {
      userId     : req.body.userId,
      task       : req.body.task,
      tags       : req.body.tags,
      isComplete : req.body.isComplete
    }
  )
  todo.save()
  .then(todo => {
    console.log(todo);
    msg = 'succes create one todo'
    res.status(201).send({todo:todo, message:msg})
  })
  .catch(err => {
    res.status(200).send({err:err})
  })
}


const findAndUpdate = (req, res) => {
  decoded = jwt.decode(req.headers.token)
  Todo.findByIdAndUpdate(
    {_id : req.params.id, userId : decoded.id},
    {
      userId     : req.body.userId,
      task       : req.body.task,
      tags       : req.body.tags,
      isComplete : req.body.isComplete
    }
  )
  .then(newtodo => {
    msg = 'succes update one data'
    res.status(201).send({newtodo:newtodo, message:msg})
  })
  .catch(err => {
    console.log(err);
    res.status(500).send({err:err})
  })
}


// TODO: disini buat agar bisa menacari todo berdasarkan query yang di minta
const findTasks = (req, res) => {
  Todo.find({'task': req.body.task}).
  where('userId').in(req.params.userId).
  select('task').
  select('tags').
  select('createdAt').
  populate('userId').
  exec((error, todos) => {
    if (!error) {
      res.send(todos)
    } else {
      res.send(error)
    }
  })
}

const findbyTag = (req, res) => {
  console.log('fooo');
  console.log(req.params)
  Todo.find({tags : {$all : [req.body.tag]}}).
  where('userId').in(req.params.userId).
  select('userId').
  select('task').
  select('tags').
  select('createdAt').
  populate('userId').
  exec((error, todos) => {
    if (!error) {
      res.send(todos)
    } else {
      res.send(error)
    }
  })
}

const findByIdAndRemove = (req, res) => {
  Todo.findByIdAndRemove({_id : req.params.id})
  .then(todoDel => {
    msg = 'Todo succesfully deleted'
    res.status(200).send({todo:todoDel, message:msg})
  })
  .catch(error => {
    console.log(err);
    res.status(500).send({error:err})
  })
}


module.exports = {
  create,
  findAllTodo,
  findAndUpdate,
  findTasks,
  findByIdAndRemove,
  findOne,
  findbyTag

};

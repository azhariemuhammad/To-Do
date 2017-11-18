const Todo = require('../models/todo-schema')
let msg = ''


// find all todo list
const findAllTodo = (req, res) => {
  Todo.find().
  populate('userId').
  exec((error, todolists) => {
    if (!error) {
      res.status(200).send(todolists)
    } else {
      res.status(500).send(error)
    }
  })
}


const findOne = (req, res) => {
  Transaction.find({_id : req.params.id}).
  populate('userId').
  exec((error, todo) => {
    if (!error) {
      res.status(200).send(todo)
    } else {
      res.status(500).send(error)
    }
  })


  .exec((err, transaction) => {
    if (!err) {
      res.status(200).send({transaction:transaction})
    } else {
      res.status(500).send({error:err})
    }
  })
}

//create one todo using method save
const create = (req, res) => {
  let todo = new Todo(
    {
      userId  : req.body.userId,
      task  : req.body.task,
      tags  : req.body.tags
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
  Todo.findByIdAndUpdate(
    {_id : req.params.id},
    {
      userId: req.body.userId,
      task  : req.body.task,
      tags  : req.body.tags
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
  Todo.find('task').
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
  Todo.find({tags : {$all : [req.params.tag]}}).
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

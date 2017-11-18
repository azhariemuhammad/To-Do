const Todo = require('../models/todo-schema')
let msg = ''


// find all todo list
const findAllTodo = (req, res) => {
  Todo.find().then(todolists => {
    res.status(200).send(todolists)
  })
  .catch(err => {
    res.status(500).send({err:err})
  })
}

//create one todo using method save
const create = (req, res) => {
  let todo = new Todo(
    {
      task  : req.body.task,
      user  : req.body.user,
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
      task  : req.body.task,
      user  : req.body.user,
      tags  : req.body.tags
    }
  )
  .then(newtodo => {
    msg = 'succes update one data'
    res.status(201).send({newtodo:newtodo, message:msg})
  })
  .catch(err => {
    res.status(500).send({err:err})
  })
}



const findWhere = (req, res) => {
  Todo.find('user').
  where('user').equals(req.params.user).
  where('tags').in(req.params.tag).
  select('task').
  select('user').
  select('createdAt').
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
  findWhere,
  findByIdAndRemove
};

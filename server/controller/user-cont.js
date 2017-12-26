const User = require('../models/user-schema')
const bcrypt = require('bcrypt');
const saltRounds = 10;
let msg = ''


//find all todo list
const findAllUsers = (req, res) => {
  User.find().then(users => {
    res.status(200).send(users)
  })
  .catch(err => {
    res.status(500).send(err)
  })
}

const findOne = (req, res) => {
  console.log(req.params.username)
  User.find({username: req.params.username}).then(users => {
    res.status(200).send(users)
  })
  .catch(err => {
    res.status(500).send(err)
  })
}
//create one todo using method save
const create = (req, res) => {
  // let password = req.body.password
  // bcrypt.hash(password, saltRounds, function(err, hash) {
    // if (!err) {
    //   console.log('hash of the password is ' + hash);
    //   storehash = hash;
      User.create(
        {
          username  : req.body.username,
          email     : req.body.email
        }
      )
      .then(user => {
        console.log(user);
        msg = 'succes create new user'
        res.status(201).send({user:user, message:msg})
      })
      .catch(err => {
        console.log(err, '======-=-=-==-=');
        res.status(500).send(err)
      })
  //   }
  // })

}

//
const findAndUpdate = (req, res) => {
  User.findByIdAndUpdate(
    {_id : req.params.id},
    {
      username  : req.body.username,
      password  : req.body.password,
      email  : req.body.email
    }
  )
  .then(user => {
    msg = 'succes update one data'
    res.status(201).send({newUser:user, message:msg})
  })
  .catch(err => {
    res.status(500).send(err)
  })
}



const findWhere = (req, res) => {
  User.find('user').
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
  User.findByIdAndRemove({_id : req.params.id})
  .then(userDel => {
    msg = 'User succesfully deleted'
    res.status(200).send({user:userDel, message:msg})
  })
  .catch(error => {
    console.log(err);
    res.status(500).send(error)
  })
}




module.exports = {
   create,
   findOne,
   findAllUsers,
   findAndUpdate,
   findByIdAndRemove,
   findWhere,
};

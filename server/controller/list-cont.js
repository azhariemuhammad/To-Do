const List = require('../models/list-schema')
let msg = ''


const findAllList = (req, res) => {
  //decoded = jwt.decode(req.headers.token)
  List.find({userId : req.params.userId }).
  //Todo.find({userId:decoded.id}).
  populate('userId').
  exec((error, todolists) => {
    if (!error) {
      res.status(200).send(todolists)
    } else {
      res.status(500).send(error)
    }
  })
}


const create = (req, res) => {
  console.log('masuk');
  let list = new List(
    {
      name   : req.body.name,
      userId : req.params.userId,
      to_do  : req.body.to_do
    }
  )
  list.save()
  .then(list => {
    console.log(list);
    msg = 'succes create one list'
    res.status(201).send({list:list, message:msg})
  })
  .catch(err => {
    res.status(200).send({err:err})
  })
}

const findAndUpdate = (req, res) => {
  console.log(req.body, '');
  List.findByIdAndUpdate(
    {_id : req.params.id},
    { name : req.body.name,
      $push: {"to_do": req.body.to_do}
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

const findByIdAndRemove = (req, res) => {
  List.findByIdAndRemove({_id : req.params.id})
  .then(list => {
    msg = 'List succesfully deleted'
    res.status(200).send({list:list, message:msg})
  })
  .catch(error => {
    console.log(err);
    res.status(500).send({error:err})
  })
}



module.exports = {
  create,
  findAllList,
  findAndUpdate,
  findByIdAndRemove
};

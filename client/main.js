// $(document).ready(function () {
//
// })


function performGetRequest1() {
  axios.get('http://localhost:4000/api/todo')
  .then(data => {
    data.data.forEach(item => {
      console.log(item);
      $('#getResult1').append(
        `<p>name      : ${item.userId.username}</p>
         <p>Task      : ${item.task}</p>
         <p>Created at: ${item.createdAt.toString()}</p>
         <p>Complete  : ${item.isComplete}</p>`
      )
    })
  })
  .catch(function (error) {
    console.log(error);
  })
}

function performGetRequest2() {
  axios.post('http://localhost:4000/api/todo', {
    
  })
  .then(data => {
    data.data.forEach(item => {
      console.log(item);
      $('#getResult1').append(
        `<p>name      : ${item.userId.username}</p>
         <p>Task      : ${item.task}</p>
         <p>Created at: ${item.createdAt.toString()}</p>
         <p>Complete  : ${item.isComplete}</p>`
      )
    })
  })
  .catch(function (error) {
    console.log(error);
  })
}


  function createUser(fields) {
    console.log('hello');
    console.log('------' + fields.name);
    axios.post('http://localhost:4000/api/users', {
      username : fields.name,
      email    : fields.email
    })
    .then(user => {
      console.log(user);
    })
    .catch(err => {
      console.log(err);
    })

  }

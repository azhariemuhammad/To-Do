// $(document).ready(function () {
//
// })


function performGetRequest1() {
  let userId = localStorage.getItem('userId')
  axios.get(`http://localhost:3000/api/todo/${userId}`)
  .then(data => {
    data.data.forEach(item => {
      console.log(item);
      let date = item.createdAt.toLocaleString()
      $('#getResult1').html(
        `<p>name      : ${item.userId.username}</p>
         <p>Task      : ${item.task}</p>
         <p id="TaskID">TaskID    : ${item._id}</p>
         <p>Created at: ${date}</p>
         <p>Complete  : ${item.isComplete}</p>
           <button type="button" class="btn btn-info btn-lg" onclick="edit()" data-toggle="modal" data-target="#myModal">Edit</button>`
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
    axios.post('http://localhost:3000/api/users', {
      username : fields.name,
      email    : fields.email
    })
    .then(user => {
      localStorage.setItem('userId', user.data.user._id)
      console.log(user);
    })
    .catch(err => {
      console.log(err);
    })
  }

  $( "#target" ).click(function() {
    console.log('masuk performGetRequest2');
    let userId     = localStorage.getItem('userId')
    let task       = $('input#todoTitle')
    let tags       = $('input#tags')
    let isComplete = $('input#status')
    console.log(task, 'ini task');
    axios.post('http://localhost:3000/api/todo', {
      userId     : userId,
      task       : task.val(),
      tags       : tags.val(),
      isComplete : isComplete.val()
    })
    .then(data => {
      console.log(data, 'ini hasil post');
    })
    .catch(function (error) {
      console.log(error);
    })
  });


  function edit() {
    console.log('masuk ssini bro');
    let d = document.querySelector('#TaskID')
    let value = d.innerHTML
    let spit  = value.split(' ')

    axios.get(`http://localhost:3000/api/todo/edit/${spit[5]}`)
    .then(todo => {
      console.log(todo.data[0].createdAt, 'daper');
      $('#getResult2').html(
        `<form class="form-inline" id="todoInputForm">
          <div class="form-group">
            <label>Task</label>
            <input type="text" class="form-control" id="todoTitle" value="${todo.data[0].task}">
          </div>
          <br>
          <div class="form-group">
            <label>Tag</label>
            <input type="text" class="form-control" id="tags" value="${todo.data[0].tags}">
          </div>
          <br>
          <div class="form-group">
            <label>Status</label>
            <input type="text" class="form-control" id="status" value="${todo.data[0].isComplete}">
          </div>
          <br>
          <button type="submit" class="btn btn-primary" id="target">Send</button>
        </form><br/>`
      )
    })
  }

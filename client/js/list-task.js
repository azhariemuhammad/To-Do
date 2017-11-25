
Vue.component('todo-lists', {
  template: `
          <div>
            <div class="card" v-for="todo in todos">
              <header class="card-header" >
              <div id="round">
                <input type="checkbox" v-model="todo.isComplete" @click="doneTask(todo)"  id="checkbox" />
                <label for="checkbox"></label>
              </div>
                <p class="card-header-title">
                  <span :class="{ taskDone: todo.isComplete }">{{todo.task}}</span>
                </p>

                <a href="#" class="card-header-icon" aria-label="more options">
                  <span class="icon">
                    <i class="fa fa-angle-down" aria-hidden="true"></i>
                  </span>
                </a>
              </header>
              <div class="card-content">
                <div class="content">
                  <time>{{todo.createdAt}}</time>
                </div>
              </div>
                <button class="button is-text" @click.prevent="removeTodo(todo._id)" >Remove</button>
            </div>
        </div>`,
  data () {
    return {
      username: '',
      todos: '',
      isDone : false,
      userId : ''

    }
  },
  created : function () {
   let username = localStorage.getItem("username")
   let userId = localStorage.getItem('userId')
    console.log(username, '----');
    axios.get(`http://localhost:3000/api/todo/${userId}`)
    .then(response => {
      console.log(response);
        this.username = username
        this.userId  = userId
        this.todos = response.data
        console.log(this.todos);
        this.getUsername()
    })
    .catch(err => {
      console.log(err);
    })
  },
  methods : {
    removeTodo : function (TaskID) {
      axios.delete(`http://localhost:3000/api/todo/${TaskID}`)
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      })
    },
    doneTask : function (todo) {
      console.log(todo, '-----');
      this.isDone = !this.isDone
      axios.put(`http://localhost:3000/api/todo/${todo._id}`, {
        task : todo.task,
        userId : todo.userId,
        isComplete : this.isDone
      })
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      })
    },
    getUsername : function () {
      this.$emit('user-emit', {
        username : this.username
      })
    }

  }
})

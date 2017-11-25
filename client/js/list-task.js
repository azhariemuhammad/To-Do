Vue.component('todo-lists', {
  template: `
          <div>
            <div class="card" v-for="todo in todos">
              <header class="card-header" >
              <div class="round">
                <input type="checkbox" v-model="isDone" @click="doneTask(todo)"  id="checkbox" />
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
      name: 'amri',
      todos: '',
      showModal : false
    }
  },
  created : function () {
    console.log('hello');
    axios.get('http://localhost:3000/api/todo')
    .then(response => {
        this.todos = response.data
        console.log(this.todos);
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
      // axios.put(`http://localhost:3000/api/todo/${todo._id}`, {
      //   task : todo.task,
      //   userId : todo.userId,
      //   isComplete : this.isDone
      // })
      // .then(response => {
      //   console.log(response);
      // })
      // .catch(err => {
      //   console.log(err);
      // })
    }

  }
})

new Vue ({
  el: '#app',
  data : {
    task : '',
    userId : '5a18eb33fd91471770d606fa',
    isDone : false
  },
  methods : {
    createNewTodo : function () {
      axios.post('http://localhost:3000/api/todo', {
        userId : this.userId,
        task : this.task,
        isComplete : false
      })
      .then(response => {
          console.log(response);
      })
      .catch(err => {
        console.log(err);
      })
    }

  }
})


Vue.component('todo-lists', {
  template: `
          <div>
            <div class="card" v-for="todo in todos">
              <header class="card-header" >
                <div>
                  <input type="checkbox"  v-model="todo.isComplete" @click="doneTask(todo)" id="checkbox"/>
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
                  <time> {{ todo.tag }}</time>
                </div>
              </div>
                <a class="tag is-delete is-medium" @click.prevent="removeTodo(todo._id)"></a>

            </div>

        </div>`,
 props : ['todos'],
  data () {
    return {
      username: '',
      userId : '',
      taskId : ''
    }
  },
  created : function () {

  },
  methods : {
    removeTodo : function (TaskID) {
      this.taskId = TaskID
      this.sendTaskId()
      axios.delete(`http://35.187.224.235/api/todo/${TaskID}`)
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      })
    },
    doneTask : function (todo) {
      axios.put(`http://35.187.224.235/api/todo/${todo._id}`, {
        userId : this.userId,
        tag : this.tag,
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
    sendTaskId : function () {
      this.$emit('user-emit', {
        taskId : this.taskId
      })
    }
  }
})

<template>
   <div>
      <div class="card" v-for="todo in todos">
        <header class="card-header" >
          <div>
            <input type="checkbox"  v-model="todo.isComplete" @click="doneTask(todo)" id="todo._id"/>
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
          <a class="tag is-delete is-medium" @click.prevent="removeItem(todo._id)"></a>
      </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'TodoContent',
  data () {
    return {
      todo: {
        task: '',
        tag: '',
        isComplete: ''
      }
    }
  },
  computed: {
    ...mapState([
      'todos'

    ])
  },
  methods: {
    ...mapActions([
      'getAllTodos',
      'removeTodo',
      'updateTodo'
    ]),
    removeItem: function (id) {
      this.removeTodo(id)
    },
    doneTask: function (todoist) {
      console.log('todois', todoist)
      todoist.isComplete = todoist.isComplete = !todoist.isComplete
      this.updateTodo(todoist)
    }
  },
  created () {
    console.log('getAllTodos')
    this.getAllTodos(localStorage.getItem('userId'))
  }
}
</script>

<style scoped>

.taskDone {
  text-decoration: line-through;
}

</style>

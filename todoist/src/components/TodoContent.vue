<template>
   <div>
      <div class="card">
        <header class="card-header" >
          <div>
            <input type="checkbox" id="checkbox"/>
            <label for="checkbox"></label>
            </div>
            <p class="card-header-title">
              <!-- <span :class="{ taskDone: todo.isComplete }">{{todo.task}}</span> -->
            </p>

          <a href="#" class="card-header-icon" aria-label="more options">
            <span class="icon">
              <i class="fa fa-angle-down" aria-hidden="true"></i>
            </span>
          </a>
        </header>
        <div class="card-content">
          <div class="content">
            <!-- <time> {{ todo.tag }}</time> -->
          </div>
        </div>
          <!-- <a class="tag is-delete is-medium" @click.prevent="removeTodo(todo._id)"></a> -->
      </div>
    </div>
</template>

<script>
export default {
  name: 'TodoContent'
}
</script>

<style>

</style>

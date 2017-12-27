<template>
<div>


  <main>
    <TheNavBar/>
  </main>

    <div class="container column is-10">
        <div class="section">
          <section class="hero is-info welcome is-small">
            <div class="hero-body">
              <div class="container">
                <h1 class="title">
                  Hello  {{ user }}
                </h1>
                <h2 class="subtitle">
                  I hope you are having a great day!
                </h2>
                <div class="level-center">
                  <p class="level-item"><strong></strong></p>
                  <p class="level-item"><a></a></p>
                </div>
              </div>
            </div>
          </section>

          <TodoForm/>

             <div class="card">
                <TodoContent/>
            </div> 
        </div>
    </div>
 
</div>
</template>

<script>
import TheNavBar from './TheNavBar'
import TodoContent from './TodoContent'
import TodoForm from './TodoForm'
import { mapState } from 'vuex'
export default {
  name: 'Hompage',
  components: { TheNavBar, TodoForm, TodoContent },
  data () {
    return {
      user: localStorage.getItem('username')
    }
  },
  computed: {
    ...mapState([
      'username'
    ])
  }
}
</script>

<style scoped>

.hero-body {
  background-image: url('https://cdn-images-1.medium.com/max/800/1*tRPdusfzHGYIOJ4QxzbTCw.gif');
  background-size: cover;
}
.hero.is-small .hero-body {
    padding-bottom: 5.5rem;
    padding-top: 1.5rem;
}


</style>

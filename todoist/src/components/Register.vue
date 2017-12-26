<template>
  <div>
    <div class="columns is-mobile">
      <div class="container is-mobile">
        <div class="column is-half is-offset-one-quarter">
                <header class="card-header-title">
                  <a class="card-footer-item"><router-link to="/signup">Sign Up</router-link></a>
                  <a class="card-footer-item"><router-link to="/login">Login</router-link></a>
                </header>
                <div class="card-content">
                  <div class="content">
                  <div id="logo">
                    <img src="https://cdn3.iconfinder.com/data/icons/iconic-1/32/check_alt-128.png" alt="todo" style="height:2rem;">
                  </div>
                  <router-view></router-view>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Register',
  data () {
    return {}
  },
  computed: {
    ...mapState([
      'loader'
    ])
  }
}
</script>

<style scoped>
  .columns.is-mobile {
    margin-top: 20px;
  }
  h3{
    text-align: center;
  }
  #logo {
    text-align: center;
    margin-bottom: 0.5em;
    margin-top: 0;
  }
  .v-spinner {
    text-align: center;
  }
</style>

<template>
<div>
    <form>
      <div class="field">
      <label for="Username"></label>
        <div class="control">
          <input class="input" type="text" v-model="user.username" placeholder="username">
        </div>
      </div>
      <div class="field">
        <div class="control">
          <label for="Email"></label>
            <input class="input" type="text" v-model="user.email" placeholder="email">
        </div>
      </div>
    </form>
      <div id="app" class="component">
        <webcam ref="webcam"></webcam>
        <img :src="this.photo" style="width:300px;height:300px; display:none"/>
        <div class="button-get">
          <a class="button is-link tooltip" data-tooltip="You can capture your face,  Make sure the light is good " id="login" @click="loginBtn">GET STARTED</a>
        </div>
  </div>
    
  
</div>
  
</template>

<script>
/* eslint-disable */

import webcam from './WebCam'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'SignUp',
  components: { webcam},
  data: function () {
    return {
      photo: null
    }
  },
  computed: mapState([
    'user',
    'loader'
  ]),
  methods: {
     ...mapMutations([
      'loads'
    ]),
    loginBtn: function () {
      localStorage.setItem('flag', 'signup')
      this.loads()
      this.take_photo()
      this.loads()
      // this.login(user)
    },
    take_photo: function () {
      this.photo = this.$refs.webcam.capture()
    }
  }
}
</script>

<style>
  #login {
    margin-top: 2em;
  }
  .button-get {
    text-align: center;
  }
</style>

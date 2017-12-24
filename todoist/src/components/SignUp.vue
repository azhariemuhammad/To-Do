<template>
<div>
  <div v-if="loader">
    <ring-loader :loading="loading" :color="color1" :size="size"></ring-loader>
  </div>
  <div v-else>
    <form @submit.prevent="loginBtn">
      <label for="Username"></label>
      <input type="text" v-model="user.username" placeholder="username">
      <br>
      <label for="Email"></label>
      <input type="text" v-model="user.email" placeholder="email">
    </form>
    
    <button id="fbLogin" @click="loginBtn">Submit</button>
      <div id="app" class="component">
        <webcam ref="webcam"></webcam>
        <img :src="this.photo" style="width:300px;height:300px; display:none"/>
        <!-- <button type="button" @click="take_photo">Capture Photo</button> -->
      </div>
  </div>
    
  
</div>
  
</template>

<script>
/* eslint-disable */
import RingLoader from 'vue-spinner/src/RingLoader.vue'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import webcam from './WebCam'
import { mapState } from 'vuex'
export default {
  name: 'SignUp',
  components: { PulseLoader, RingLoader, webcam},
  data: function () {
    return {
      photo: null,
      color: '#cc181e',
      color1: '#5bc0de',
      size: '45px',
      margin: '2px',
      radius: '2px',
      loader: false
    }
  },
  computed: mapState([
    'user'
  ]),
  methods: {
    loginBtn: function () {
      localStorage.setItem('flag', 'signup')
      this.loader = true
      this.take_photo()
      // this.login(user)
    },
    take_photo: function () {
      this.photo = this.$refs.webcam.capture()
    }
  }
}
</script>

<style>

</style>

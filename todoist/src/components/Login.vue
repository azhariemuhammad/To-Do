<template>
<div>
  
  <form @submit.prevent="loginBtn">
    <label for="Username"></label>
    <input type="text" v-model="user.username" placeholder="username">
    <br>
    <label for="Email"></label>
    <input type="text" v-model="user.email" placeholder="email">
    <input type="submit" name="submit" value="submit">
  </form>
  <button id="fbLogin" @click="loginBtn">FB Login</button>
     <div id="app" class="component">
      <webcam ref="webcam"></webcam>
      <img :src="this.photo" style="width:300px;height:300px; display:none"/>
      <!-- <button type="button" @click="take_photo">Capture Photo</button> -->
    </div>
</div>
  
</template>

<script>
/* eslint-disable */
import webcam from './WebCam'
import { mapActions } from 'vuex'
import FB from 'fb'
export default {
  name: 'Login',
  components: {webcam},
  data: function () {
    return {
      photo: null,
      user: {
        username: '',
        email: ''
      }
    }
  },
  methods: {
    ...mapActions([
      'login',
      'logout'
    ]),
    loginBtn: function () {
      this.login
      this.$router.push({name: 'Hompage'})
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

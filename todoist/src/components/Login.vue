<template>
<div>
  <button id="fbLogin" @click="loginBtn">FB Login</button>
<!--   
  <div class="camera">
    <video id="video" ref="video">Video stream not available.</video>
    <button id="startbutton">Take photo</button>
  </div>

  <canvas id="canvas" ref="canvas">
  </canvas>
  <div class="output">
    <img id="photo" alt="The screen capture will appear in this box." ref="photo"> 
  </div> -->
     <div id="app" class="component">
      <webcam ref="webcam"></webcam>
      <img :src="this.photo" style="width:500px;height:500px;" />
      <button type="button" @click="take_photo">Capture Photo</button>
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
      photo: null
    }
  },
  methods: {
    ...mapActions([
      'login',
      'logout'
    ]),
    loginBtn: function () {
      this.$router.push('/')
      this.login('foo')
    },
    take_photo: function () {
      this.photo = this.$refs.webcam.capture()
    }
  }
}
</script>

<style>

</style>

<template>
<div>
  <h1 id="text">Welcome Back!</h1>
  <div class="get">
    <a class= "button is-link tooltip" data-tooltip="login with your face, Make sure the light is good" id="fbLogin" @click="loginBtn">Login with Face Id</a>
    <p>or</p>
    <a class="button is-link" @click="facebookLogin">Sign In with Facebook</a>
  </div>
      <div id="app" class="component">
      <webcam ref="webcam"></webcam>
      <img :src="this.photo" style="width:300px;height:300px; display:none"/>
      <!-- <button type="button" @click="take_photo">Capture Photo</button> -->
    </div>
</div>
  
</template>

<script>
/* eslint-disable */
import axios from 'axios'
import webcam from './WebCam'
import { mapActions, mapState, mapMutations } from 'vuex'
export default {
  name: 'Login',
  components: {webcam},
  data: function () {
    return {
      photo: null
    }
  },
  computed: {
    ...mapState([
    'user',
    'loader'
    ])
  },
  methods: {
    ...mapActions([
      'logout',
      'signup'
    ]),
     ...mapMutations([
      'loads',
      'decode'
    ]),
    loginBtn: function () {
      localStorage.setItem('flag', 'login')
      this.loads()
      this.take_photo()
      // this.login(user)
    },
    facebookLogin: function () {
      let self = this
      let url = 'https://us-central1-vue-project-1a9b9.cloudfunctions.net/app/facebooklogin?accesstoken='
      FB.login(function (response) {
        let accesstoken = response.authResponse.accessToken
        axios.get(url + accesstoken)
        .then(function (result) {
          self.signup(result)
        })
        .catch(function (error) {
          console.log(error);
        })
      }, { scope: 'public_profile,email' })
    },
    take_photo: function () {
      this.photo = this.$refs.webcam.capture()
    }
  },
  created () {
     window.fbAsyncInit = function () {
      FB.init({
        appId: '1716111131767072',
        cookie: true,  // enable cookies to allow the server to access
        // the session
        xfbml: true,  // parse social plugins on this page
        version: 'v2.11' // use graph api version 2.8
      });
    };
    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }
}
</script>

<style scoped>
  h1#text {
    text-align: center;
  }
  .get {
    text-align: center;
    margin-bottom: 0;
  }
</style>

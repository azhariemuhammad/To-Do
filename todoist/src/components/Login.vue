<template>
  <button id="fbLogin" @click="loginBtn">FB Login</button>
</template>

<script>
/* eslint-disable */

import { mapActions } from 'vuex'
import FB from 'fb'
export default {
  name: 'Login',
  data: function () {
    return {}
  },
  methods: {
    ...mapActions([
      'login',
      'logout'
    ]),
    loginBtn: function () {
      this.$router.push('/')
      this.login('foo')
    }

//     fbLogin: function () {
//       console.log('hello')
//       FB.login(function (response) {
//         console.log('Response: ', response)
//       }, { scope: 'public_profile, email' })

     
//       (function (d, s, id) {
//         var js, fjs = d.getElementsByTagName(s)[0]
//         if (d.getElementById(id)) return
//         js = d.createElement(s); js.id = id
//         js.src = "https://connect.facebook.net/en_US/sdk.js"
//         fjs.parentNode.insertBefore(js, fjs)
//       }(document, 'script', 'facebook-jssdk'))

//       FB.api('/me', function (response) {
//         console.log('testAPI', response)
//         console.log('Successful login for: ' + response.name)
//       })
//     }
//   }
  
// }
//  window.fbAsyncInit = function () {
//         FB.init({
//           appId: '1826927694265932',
//           cookie: true,  // enable cookies to allow the server to access
//           // the session
//           xfbml: true,  // parse social plugins on this page
//           version: 'v2.11' // use graph api version 2.8
//         })
//       }
  }
  }
</script>

<style>

</style>

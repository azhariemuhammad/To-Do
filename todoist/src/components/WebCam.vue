<template>
  <div>
  <div v-if="loader" id="ringring">
    <pulse-loader :color="color" :size="size"></pulse-loader> 
    </div>
    <div v-else>
      <div id="webcam">
        <video ref="video" :width="this.width" :height="this.height" :src="this.source" :autoplay="this.autoplay"></video>
      </div>
      </div>
    </div>
  </div>
  
  
</template>

<script>
 /* eslint-disable */
import RingLoader from 'vue-spinner/src/RingLoader.vue'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import BounceLoader from 'vue-spinner/src/BounceLoader.vue'
import randomWord from 'get-unique-name'
import { mapActions, mapState, mapMutations } from 'vuex'
import axios from 'axios'
import firebase from 'firebase'
var config = {
  apiKey: 'AIzaSyA6tkCsALPbiLlw038YHJ0izByVMcNgwU8',
  authDomain: 'vue-project-1a9b9.firebaseapp.com',
  databaseURL: 'https://vue-project-1a9b9.firebaseio.com',
  projectId: 'vue-project-1a9b9',
  storageBucket: 'vue-project-1a9b9.appspot.com',
  messagingSenderId: '889735417412'
}

firebase.initializeApp(config)
export default {
  name: 'WebCam',
  components: { PulseLoader, RingLoader, BounceLoader },
  data () {
    return {
      stream: '',
      source: '',
      canvas: null,
      url: '',
      id: '',
      color: '#1a0dab',
      color1: '#1a0dab',
      size: '20px',
      margin: '2px',
      radius: '2px'
    }
  },
  props: {
    width: {
      type: Number,
      default: 500
    },
    height: {
      type: Number,
      default: 400
    },
    autoplay: {
      type: Boolean,
      default: true
    },
    screenshotFormat: {
      type: String,
      default: 'image/png'
    }
  },
  computed: mapState ([
    'user',
    'loader'
  ]),
  mounted () {
    if (!this.hasMedia()) {
      this.$emit('notsupported')
      return
    }
    this.requestMedia()
    if (navigator.getUserMedia) {
      navigator.getUserMedia({ video: true }, stream => {
        this.source = window.URL.createObjectURL(stream)
        console.log('source: ', this.source)
        this.stream = stream
        console.log('stream', this.stream)
        this.$emit('started', stream)
      }, error => {
        this.$emit('error', error)
      })
    }
  },
  methods: {
    ...mapActions([
      'login',
      'signup'
    ]),
    ...mapMutations([
      'loads'
    ]),
    hasMedia () {
      return !!this.getMedia()
    },
    getMedia () {
      return (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia)
    },
    requestMedia () {
      navigator.getUserMedia = this.getMedia()
    },
    capture () {
      if (!this.hasMedia()) {
        this.$emit('notsupported')
        return null
      }
      return this.getCanvas().toDataURL(this.screenshotFormat)
    },
    getCanvas () {
      let video = this.$refs.video
      if (!this.ctx) {
        let canvas = document.createElement('canvas')
        canvas.height = video.clientHeight
        canvas.width = video.clientWidth
        this.canvas = canvas
        console.log('this.Canvas: ', this.canvas)
        this.ctx = canvas.getContext('2d')
      }
      const { ctx, canvas } = this
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
      let imageDataURL = canvas.toDataURL('image/png')
        this.uploadFile(imageDataURL)
      return canvas
    },
    uploadFile (imgDataUrl, cb) {
      let fileName = randomWord()
      console.log(fileName,'peratam')
      let storageRef = firebase.storage().ref()
      var uploadTask = storageRef.child(`images/${fileName}.png`).putString(imgDataUrl, 'data_url')
      if (localStorage.getItem('flag') === 'signup') {
        console.log('hello')
        this.postFace(fileName)
      } else {
        this.faceDetect(fileName)
      }
      uploadTask.on('state_changed', function(snapshot) {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log('Upload is ' + progress + '% done')
        switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused')
              break
            case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running')
              break
          }
        }, function (error) {
        switch (error.code) {
            case 'storage/unauthorized':
              break
            case 'storage/canceled':
              break
             case 'storage/unknown':
              break
          }
        }, function () {
          var downloadURL = uploadTask.snapshot.downloadURL
          console.log('downLoadURL: ', downloadURL)
        })
    },
    postFace (fileName) {
      let self = this
      setTimeout( () => {
        let storageRef = firebase.storage().ref()
        storageRef.child(`images/${fileName}.png`).getDownloadURL().then(function(url) {
          console.log('url ', url)
           axios.post(`http://localhost:3000/api/addingfaceid`, {
            url: url,
            uniqueName: fileName
          })
          .then(res => {
            self.loads()
            console.log('added FaceId: ', res.data.data.persistedFaceId)
            self.user.persistedFaceId = res.data.data.persistedFaceId
            self.signup()
            console.log('self', self)
            self.$router.push({path: '/'})
          })
          .catch(err => {
            self.loads()
            console.log('err addingFaceId ', err)
          })
        }).catch(function(error) {
          // Handle any errors
          console.log('err', error)
        })
      }, 5000)
    },
    faceDetect (fileName) {
      console.log('hello')
      let self = this
      setTimeout( () => {
        let storageRef = firebase.storage().ref()
        storageRef.child(`images/${fileName}.png`).getDownloadURL().then(function(url) {
          console.log('url ', url)
           axios.post(`http://localhost:3000/api/facedetection`, {
            url: url,
          }, {
            headers: {
              // 'Content-Type': 'application/json'
            }
          })
          .then(res => {
            console.log('FaceId: ', res)
            // self.persited = res.data.data.persistedFaceId
            self.login(res.data.data[0])
            self.$router.push({path: '/'})
          })
          .catch(err => {
            console.log('err addingFaceId ', err)
            self.loads()
            alert(err + ' ' + `can't detect your face`)
          })
        }).catch(function(error) {
          // Handle any errors
          console.log('err', error)
        })
      }, 5000)
    }
  }
}
</script>
<style scoped>
  video {
    margin-bottom: -35px;
  }
  #ringring {
    width: 200px;
    margin: 0 auto;
  }
  .v-spinner {
    margin: 0 auto;
    margin-top: 20px;
    margin-left: 4em;
  }
</style>

<template>
  <div>
    <video ref="video" :width="this.width" :height="this.height" :src="this.source" :autoplay="this.autoplay"></video>
    <a id="dl-btn" href="#" download="glorious_selfie.jpeg">Save Photo</a>
  </div>
  
</template>

<script>
 /* eslint-disable */ 
import randomWord from 'get-unique-name'
import { mapActions, mapState } from 'vuex'
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
  data () {
    return {
      stream: '',
      source: '',
      canvas: null,
      url: '',
      id: '',
      persited: ''
    }
  },
  props: {
    width: {
      type: Number,
      default: 500
    },
    height: {
      type: Number,
      default: 500
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
    'user'
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
      'login'
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
      console.log(imageDataURL)
      this.uploadFile(imageDataURL)
      document.querySelector('#dl-btn').href = imageDataURL
      return canvas
    },
    uploadFile (imgDataUrl, cb) {
      let fileName = randomWord()
      console.log(fileName,'peratam')
      let storageRef = firebase.storage().ref()
      var uploadTask = storageRef.child(`images/${fileName}.png`).putString(imgDataUrl, 'data_url')
      this.postFace(fileName)
      uploadTask.on('state_changed', function(snapshot) {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
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
      const URL = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/facelists/'
      let self = this
      setTimeout( () => {
        let storageRef = firebase.storage().ref()
        storageRef.child(`images/${fileName}.png`).getDownloadURL().then(function(url) {
          console.log('url ', url)
          let obj = {url: url, uniqueName: fileName}
          // self.addingFaceId(obj)
           axios.post(`http://localhost:3000/api/addingfaceid`, {
            url: url,
            uniqueName: fileName
          }, {
            headers: {
              // 'Content-Type': 'application/json'
            }
          })
          .then(res => {
            console.log('added FaceId: ', res)
            self.persited = res.data.data.persistedFaceId
            self.login()
            console.log('self', self)
          })
          .catch(err => {
            console.log('err addingFaceId ', err)
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
<template>
  <div>
    <video ref="video" :width="this.width" :height="this.height" :src="this.source" :autoplay="this.autoplay"></video>
    <a id="dl-btn" href="#" download="glorious_selfie.jpeg">Save Photo</a>
  </div>
  
</template>

<script>
export default {
  name: 'WebCam',
  data () {
    return {
      stream: '',
      source: '',
      canvas: null
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
      default: 'image/jpeg'
    }
  },
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
      let imageDataURL = canvas.toDataURL('image/jpeg', 1.0)
      console.log(imageDataURL)
      document.querySelector('#dl-btn').href = imageDataURL
      return canvas
    }
  }
}
</script>
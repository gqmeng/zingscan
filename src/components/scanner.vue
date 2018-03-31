<template>
  <div class="scanner_wrapper">
    <button @click="stop">Stop</button>
    <div ref="quagga" class="camera"/>
    <pre v-if="data">
      {{ data }}
    </pre>
  </div>
</template>

<script>
import Quagga from 'quagga'
export default {
  data: () => ({ data: null }),
  mounted () {
    this.$nextTick(() => {
      Quagga.init({
          inputStream : {
          name : "Live",
          type : "LiveStream",
          target: this.$refs.quagga
        },
        decoder : {
          readers : ["code_128_reader", "upc_reader"],
          debug: {
            drawBoundingBox: false,
          }
        }
      },
      () => this.start())
    })
  },
  methods: {
    start() {
      Quagga.onDetected(this.onDetected)
      Quagga.start()
      console.log('Quagga started!')
    },
    onDetected(data) {
      this.data = data
    },
    stop() {
      Quagga.offDetected(this.onDetected)
      Quagga.stop()
      this.$refs.quagga.querySelector('video').remove()
      this.$refs.quagga.querySelector('canvas').remove()
    }
  }

}
</script>

<style>
.scanner-wrapper {
  width: 80vh;
  border-left: 1px solid grey;
  border-right: 1px solid grey;
}
.camera {
  border: 1px solid red;
  max-height: 160px;
  display: block;

}
</style>

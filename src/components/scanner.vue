<template>
  <div class="scanner_wrapper">
    <!-- <button @click="stop">Stop</button> -->
    <div ref="quagga" class="camera"/>
    <!-- <pre v-if="data">
      {{ data }}
    </pre> -->
  </div>
</template>

<script>
import Quagga from 'quagga'
export default {
  data: () => ({ data: null }),
  mounted () {
    var w = 940
    this.$nextTick(() => {
      Quagga.init({
          inputStream : {
          name : "Live",
          type : "LiveStream",
          target: this.$refs.quagga
        },
        decoder : {
          readers : ["code_128_reader"],
          debug: {
            drawBoundingBox: true,
            showFrequency: false,
            drawScanline: true,
            showPattern: false
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
      this.$emit('barcoderead', data)
      this.data = data
      console.log(data.codeResult.code+" "+data.codeResult.startInfo.error)
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
  /* width: 100vh; */
  border-left: 1px solid grey;
  border-right: 1px solid grey;
}
.camera {
  border: 1px solid #777777;
  max-height: 510px;
  display: block;
  margin:0 auto;
  padding:10px 8px 10px 10px;
}
</style>

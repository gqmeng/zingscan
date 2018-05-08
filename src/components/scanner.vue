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
      Quagga.onProcessed(this.onProcessed)
      Quagga.start()
      console.log('Quagga started!')
    },
    onDetected(data) {
      this.$emit('barcoderead', data)
      this.data = data
      console.log(data.codeResult.code+" "+data.codeResult.startInfo.error)
    },
    onProcessed(result) {
    var drawingCtx = Quagga.canvas.ctx.overlay,
        drawingCanvas = Quagga.canvas.dom.overlay;

    if (result) {
        if (result.boxes) {
            drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute("width")), parseInt(drawingCanvas.getAttribute("height")));
            result.boxes.filter(function (box) {
                return box !== result.box;
            }).forEach(function (box) {
                Quagga.ImageDebug.drawPath(box, {x: 0, y: 1}, drawingCtx, {color: "green", lineWidth: 2});
            });
        }

        if (result.box) {
            Quagga.ImageDebug.drawPath(result.box, {x: 0, y: 1}, drawingCtx, {color: "#00F", lineWidth: 2});
        }

        if (result.codeResult && result.codeResult.code) {
            Quagga.ImageDebug.drawPath(result.line, {x: 'x', y: 'y'}, drawingCtx, {color: 'red', lineWidth: 3});
        }
    }
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
  border: 1px solid #f3f3f3;
  max-height: 510px;
  display: block;
  margin:0 auto;
  padding:0;
}
.drawingBuffer {
  top:0;
  left:0;
  position:absolute;
}
</style>

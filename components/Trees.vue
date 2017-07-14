<template>
  <div>
    <!-- <div class="" id="treesCanvas">

    </div> -->
    <template v-if="processingInstance">
      <div id="treesCanvas"></div>
    </template>
    <template v-else>
      {{ loadingMessage }}
    </template>
  </div>
</template>

<script>
  import Branch from '~plugins/branch.js'
  import sketch from '~plugins/sketch.js'
  // if (process.BROWSER_BUILD) {
  //   var {P5} = require('~assets/scripts/p5-export.js')
  // }

  export default {
    data () {
      return {
        loadingMessage: 'making a landscape...',
        parent: {
          endPoint: {
            x: 10,
            y: 10
          },
          length: 5,
          theta: 90,
          thickness: 10
        },
        trees: null,
        processingInstance: null
      }
    },
    created () {
      // this.trees = new Branch(this.parent)
      if (process.BROWSER_BUILD) {
        this.processingInstance = new p5(sketch, 'treesCanvas')
      }
    }
  }
</script>

<style>
  #treesCanvas {
    height: 100vh;
    width: 100vw;
  }
</style>

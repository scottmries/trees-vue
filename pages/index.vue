<template>
  <section @click="nextLandscape" class="container">
    <!-- <Trees :p="p" :trees="landscapesArray[landscapeIndex]" :tree="landscapesArray[landscapeIndex]"></Trees> -->
    <div class="" id="treesCanvas">

    </div>
  </section>
</template>

<script>
import Trees from '~/components/Trees.vue'
import Branch from '../scripts/branch.js'
import sketch from '~/plugins/sketch.js'
// if (process.browser) {
//   var {P5} = require('~assets/scripts/p5-export.js')
// }

export default {
  components: {
    Trees
  },


  data () {
    return {
        landscapesToMake: 16,
        landscapesArray: [],
        landscapeIndex: 0,
        delayTime: 10000,
        width: 1280,
        height: 800,
        audioCtx: null,
        p: null
      }
  },
    created () {
    this.generateLandscapes()
    if(process.browser){
      this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      this.playAudio()
      this.p = new p5(sketch, 'treesCanvas')
      }
    },
    computed: {
      c () {
        return (this.landscapeIndex + 1) * 128.0/(this.landscapesToMake) + 128.0
      },
      audioOptions () {
        return {
          lengthToTime: 100,
          freqSpread: {
            min: 40,
            max: 4000
          },
          thicknessToAmplitude: 0.01 * this.landscapeIndex,
          width: 1000
        }
      }
    },
    methods: {
      playAudio () {
        this.audioCtx.close()
        this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        this.landscapesArray[this.landscapeIndex].forEach((tree) => {
          tree.playAudio(this.audioCtx, this.audioOptions)
        })
      },
      nextLandscape () {
        this.landscapeIndex++
        this.playAudio()
        this.p.trees = this.trees
        this.draw()
        this.p.reset = true
      },
      draw () {
        this.p.c = this.c
        this.p.p = this.p
        this.p.trees = this.landscapesArray[this.landscapeIndex]
      },
      generateLandscapes () {
        for (var i = 0; i < this.landscapesToMake; i++){
          this.landscapesArray.push(this.trees(i + 1))
        }
      },
      trees (numTrees) {
        let trees = []
        for (var i = 0; i < numTrees; i++) {
          trees.push(this.tree())
        }
        return trees
      },
      tree() {
        let x = Math.random() * this.width
        let branch = new Branch( {
            accumulatedLength: 0,
            endPoint: {
              x: x,
              y: 10
            },
            length: 5,
            theta: 90,
            thickness: 10,
            children: 1
        })
        return branch

    }
  }
}
</script>

<style>
.container
{
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: rgb(50,50,60);
}
#treesCanvas {
  height: 100vh;
  width: 100vw;
}
</style>

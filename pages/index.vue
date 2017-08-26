<template>
  <section @click="nextLandscape" class="container">
    <!-- <Trees></Trees> -->
  </section>
</template>

<script>
// import Trees from '~components/Trees.vue'
import Branch from '../scripts/branch.js'

export default {
  data () {
    return {
        landscapesToMake: 16,
        landscapesArray: [],
        landscapeIndex: 0,
        delayTime: 10000,
        width: 1280,
        height: 800,
        audioCtx: null
      }
  },
    created () {
      this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      this.generateLandscapes()
      this.playAudio()
    },
    methods: {
      playAudio () {
          this.landscapesArray[this.landscapeIndex].forEach((tree) => {
            tree.playAudio(this.audioCtx)
          })
      },
      nextLandscape () {
        this.landscapeIndex++
        console.log(this.landscapesArray[this.landscapeIndex])
      },
      generateLandscapes () {
        for (var i = 0; i < this.landscapesToMake; i++){
          this.landscapesArray.push(this.trees(i + 1))
        }
        console.log(this.landscapesArray)
      },
      trees (numTrees) {
        let trees = []
        for (var i = 0; i < numTrees; i++) {
          trees.push(this.tree())
        }
        return trees
      },
      tree() {
        let branch = new Branch( {
            endPoint: {
              x: 10,
              y: 10
            },
            length: 5,
            theta: 90,
            thickness: 10
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
</style>

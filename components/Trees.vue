<template>
  <div>
    <!-- <div class="" id="treesCanvas">

    </div> -->
    <template v-if="p">
      <div
        id="treesCanvas"
        @click="resetTrees"
        ></div>
    </template>
    <template v-else>
      {{ loadingMessage }}
    </template>
  </div>
</template>

<script>
  import Branch from '~/plugins/branch.js'


  export default {
    props: ['p', 'trees', 'tree'],
    data () {
      return {
        loadingMessage: 'hi'
      }
    },
    created () {
      if (process.build) {
        this.p.trees = this.trees
      }
    },
    methods: {
      resetTrees() {
        this.p.trees = this.trees
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

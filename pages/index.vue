<template>
  <section class="container">
    <Trees></Trees>
  </section>
</template>

<script>
import Trees from '~components/Trees.vue'

export default {
  components: {
    Trees
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
}
</style>

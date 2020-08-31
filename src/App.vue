<template>
  <div id="app" class="container">
    <measurement />
  </div>
</template>

<script>
  import Measurement from './components/Measurement.vue'

  export default {
    name: 'App',
    components: {
      Measurement
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>

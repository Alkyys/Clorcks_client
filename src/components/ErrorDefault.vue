<template>
  <div class="app">
    <img src="../assets/gif/error.gif" alt="Error" class="screen"
        @click="$store.dispatch('toogle_error')">
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  mounted () {
  }
}
</script>

<style scoped lang="scss">
.app {
    z-index: 100;
  .screen {
    position: fixed;
    height: 100%;
    width: 100%;
    top: 0px;
    left: 0px;
    object-fit: cover;
  }
}
</style>

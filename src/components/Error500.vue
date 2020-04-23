<template>
  <div class="app">
    <div class="text">
      <p class="number">500</p>
      <p class="information">Lost in space</p>
      <p class="explication">Something Wrong ...</p>
      <button @click="$store.dispatch('toogleError500')">Back to Home</button>
    </div>
    <img
      src="../assets/img/500.png"
      alt="Error"
      class="screen"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  mounted () {}
}
</script>

<style scoped lang="scss">
.app {
  background-color: white;
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0px;
  left: 0px;
  .screen {
    position: fixed;
    height: 100%;
    top: 0px;
    left: 0px;
  }
  .text {
    z-index: 50;
    position: fixed;
    top: 35%;
    left: 54%;
    .number {
      font-weight: bold;
      font-size: 10rem;
    }
    .information {
      font-weight: bold;
      font-size: 5rem;
    }
    .explication {
      font-size: 2rem;
    }
    button {
      margin-top: 1rem;
      color: #64b5f6;
      padding: 0.5rem 2rem;
      border-radius: 12px;
      border: 3px #64B5F6 solid;
      background-color: white;
    }
  }
}
</style>

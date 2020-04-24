<template>
  <div class="app">
    <div class="text">
      <p class="information">This feature is not ready yet</p>
      <button @click="$store.dispatch('toogleFeature')">Back</button>
    </div>
    <img
      src="../assets/img/feature.png"
      alt="Error"
      class="screen"
    />
  </div>
</template>

<style scoped lang="scss">
.app {
  z-index: 100;
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
    .information {
      font-weight: bold;
      font-size: 5rem;
    }
    button {
      margin-top: 2rem;
      color: #3949ab;
      padding: 0.5rem 2rem;
      border-radius: 12px;
      border: 3px #3949ab solid;
      background-color: white;
    }
  }
}
</style>

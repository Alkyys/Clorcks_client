<template>
  <div class="background" @click.self="$store.dispatch(`toogle_modal_worspace`)">
    <div class="modal">
      <div class="head">
        <h1>Worspace</h1>
      </div>
      <template v-for="workspace in this.$store.state.myitems">
        <div class="myworspace" :key="workspace._id">
          {{workspace.name}}
        </div>
      </template>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style scoped lang="scss">
.background {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  align-items: center;
  display: flex;
  .modal {
    margin: auto;
    width: 60em;
    height: 40em;
    background: #ffffff 0% 0% no-repeat padding-box;
    border: 5px solid #000000;
    border-radius: 30px;
    .head {
      text-align: center;
      padding: 1em;
     font-size: 4em;
    }
  }
}
</style>

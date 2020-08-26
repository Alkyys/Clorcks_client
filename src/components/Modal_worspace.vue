<template>
  <div class="background" @click.self="$store.dispatch(`toogle_modal_workspace`)">
    <div class="modal">
      <div class="head">
        <h1>Workspace</h1>
      </div>
      <div class="content">
        <template v-for="workspace in this.$store.state.workspacejam.all">
          <div :key="workspace._id" class="myworspace">
            {{ workspace.name }}
            <div class="buttom">
              <div class="number">
                <div>0</div>
                <div>100</div>
              </div>
              <div class="line" />
            </div>
          </div>
        </template>
        <div class="addworkspace" @click="$store.dispatch('toogleFeature')">
          <img src="../assets/logo/plus.svg" alt>
          <div class="line" />
        </div>
      </div>
      <button class="annuler" @click="$store.dispatch(`toogle_modal_workspace`)">
        Annuler
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {}
}
</script>

<style scoped lang="scss">
@import '../assets/variables.scss';

.background {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  top: 0px;
  backdrop-filter: blur(10px);
  align-items: center;
  display: flex;
  .modal {
    margin: auto;
    width: 60em;
    height: 40em;
    background: $white 0% 0% no-repeat padding-box;
    border: 5px solid $black;
    border-radius: 30px;
    display: flex;
    flex-direction: column;
    .head {
      text-align: center;
      padding: 1em;
      font-size: 4em;
    }
    .content {
      display: flex;
      justify-content: center;
       margin: auto;
      .line {
        background-color: $grey2;
        width: 6em;
        height: 4px;
        border-radius: 10px;
      }
      .myworspace {
        height: 8em;
        width: 8em;
        border: 5px solid $red;
        border-radius: 10px;
        margin: 1em;
        color: $red;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        .number {
          color: $black;
          display: flex;
          justify-content: space-between;
          font-size: 0.7em;
        }
      }
      .addworkspace {
        height: 8em;
        width: 8em;
        border: 5px solid $grey2;
        border-radius: 10px;
        margin: 1em;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        img {
          width: 4em;
        }
      }
    }
    .annuler {
      border: 2px solid $black;
      border-radius: 10px;
      background-color: $white;
      font-weight: 700;
      padding: 0.8em 2em;
      margin: auto
    }
  }
}
</style>

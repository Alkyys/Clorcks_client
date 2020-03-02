<template>
  <div class="background" @click.self="$store.dispatch(`toogle_modal_worspace`)">
    <div class="modal">
      <div class="head">
        <h1>Worspace</h1>
      </div>
      <div class="content">
        <template v-for="workspace in this.$store.state.myitems">
          <div class="myworspace" :key="workspace._id">
            {{workspace.name}}
            <div class="buttom">
              <div class="number">
                <div>0</div>
                <div>100</div>
              </div>
              <div class="line"></div>
            </div>
          </div>
        </template>
        <div class="addworkspace">
          <img src="../assets/logo/plus.svg" alt />
          <div class="line"></div>
        </div>
      </div>
      <button class="annuler" @click="$store.dispatch(`toogle_modal_worspace`)">Annuler</button>
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
.background {
  position: absolute;
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
    background: #ffffff 0% 0% no-repeat padding-box;
    border: 5px solid #000000;
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
        background-color: #08080e1a;
        width: 6em;
        height: 4px;
        border-radius: 10px;
      }
      .myworspace {
        height: 8em;
        width: 8em;
        border: 5px solid #1ee3cf;
        border-radius: 10px;
        margin: 1em;
        color: #1ee3cf;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        .number {
          color: #000000;
          display: flex;
          justify-content: space-between;
          font-size: 0.7em;
        }
      }
      .addworkspace {
        height: 8em;
        width: 8em;
        border: 5px solid #e5e5e6;
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
      border: 2px solid #08080e;
      border-radius: 10px;
      background-color: white;
      font-weight: 700;
      padding: 0.8em 2em;
      margin: auto
    }
  }
}
</style>

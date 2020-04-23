<template>
  <div class="background" @click.self="$store.dispatch(`toogleModalChooseCreation`)">
    <div class="centrage">
      <div class="modal" @click="openColor">
        <div class="colorcard" style="background-color: black;"></div>
        <div class="iconcard">
          <div></div>
          <img src="../assets/logo/heart grey.svg" alt />
        </div>
      </div>

      <div class="modal" @click="openPalette">
        <div class="colorcard">
          <div class="palette">
            <div style="background-color: #08080E40"></div>
            <div style="background-color: #08080E80"></div>
            <div style="background-color: #08080EBF"></div>
            <div style="background-color: #08080E"></div>
          </div>
        </div>
        <div class="iconcard">
          <div></div>
          <img src="../assets/logo/heart grey.svg" alt />
        </div>
      </div>

      <div class="modal" @click="openGradient">
        <div
          class="colorcard"
          style="background: linear-gradient(311deg, #08080E 0%, #FFFFFF 100%)"
        ></div>
        <div class="iconcard">
          <div></div>
          <img src="../assets/logo/heart grey.svg" alt />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  name: 'Modal_choose',
  props: {},
  methods: {
    openColor () {
      this.$store.dispatch(`toogleModalChooseCreation`)
      this.$store.dispatch(`toogleModalCreationColor`)
    },
    openPalette () {
      this.$store.dispatch(`toogleModalChooseCreation`)
      this.$store.dispatch(`toogleModalCreationPalette`)
    },
    openGradient () {
      this.$store.dispatch(`toogleModalChooseCreation`)
      this.$store.dispatch(`toogleModalCreationGradient`)
    }
  }
}
</script>

<style scoped lang="scss">
@import '../assets/variables.scss';

.background {
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0px;
  left: 0;
  backdrop-filter: blur(33px);
  -webkit-backdrop-filter: blur(33px);
  align-items: center;
  display: flex;
  justify-content: center;
  .centrage {
    display: flex;
  }
  .modal {
    cursor: pointer;
    margin: 4em;
    width: 6rem;
    height: 7.5rem;
    background: $white 0% 0% no-repeat padding-box;
    box-shadow: $size-shadow $black-shadow;
    border-radius: 5px;
    .colorcard {
      margin: 0.25rem auto 0px auto;
      height: 5.5em;
      width: 5.5em;
      border-radius: 5px;
      display: flex;
      .palette {
        display: flex;
        div {
          height: 5.5em;
          width: 1.375em;
        }
        div:first-of-type {
          border-radius: 5px 0px 0px 5px;
        }
        div:last-of-type {
          border-radius: 0px 5px 5px 0px;
        }
      }
    }
    .iconcard {
      align-items: center;
      div:first-of-type {
        background-color: $grey2;
        width: 3rem;
        height: 0.5rem;
      }
      margin: 0.2rem 0.5rem;
      display: flex;
      justify-content: space-between;
      height: 1.5rem;
    }
  }
}
</style>

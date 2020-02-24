<template>
  <div class="modal">
    <div
      class="result"
      :style="{'background': `rgba(${color.red},${color.green},${color.blue},${color.alpha})`}"
    ></div>
    <div class="settings">
      <div class="head">
        <img src="../assets/logo/chevron-down.svg" alt />
        <!-- TODO: copier au clique -->
        <!-- <button @click="copyValue(1234567)"></button> -->
        <select v-model="type">
          <option>Hexadecimal</option>
          <option>RGB</option>
          <option>CMYK</option>
        </select>
        <p v-show="type=='Hexadecimal'">{{rgbToHex()}}</p>
        <img src="../assets/logo/copy.svg" alt />
      </div>

      <div class="wrapper">
        <p>Red</p>
        <input type="range" class="custom-slider" min="0" max="255" step="1" v-model="color.red" />
        <input type="number" v-model="color.red" />
      </div>

      <div class="wrapper">
        <p>Green</p>
        <input type="range" min="0" max="255" step="1" v-model="color.green" />
        <input type="number" v-model="color.green" />
      </div>

      <div class="wrapper">
        <p>Blue</p>
        <input type="range" min="0" max="255" step="1" v-model="color.blue" />
        <input type="number" v-model="color.blue" />
      </div>

      <div class="bouton">
        <button class="bouton_signup">Crée</button>
        <button class="bouton_login">Annuler</button>
      </div>
    </div>
    <div class="close">
      <img src="../assets/logo/x.svg" @click="$store.dispatch(`openModal_creation`)" alt />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      type: 'Hexadecimal',
      color: {
        red: '45',
        green: '53',
        blue: '97',
        alpha: 1
      }
    }
  },
  name: 'ModalCreationColor',
  mounted () {},
  computed: {},
  methods: {
    rgbToHex: function () {
      let r = parseInt(this.color.red).toString(16)
      let g = parseInt(this.color.green).toString(16)
      let b = parseInt(this.color.blue).toString(16)

      if (r.length === 1) r = '0' + r
      if (g.length === 1) g = '0' + g
      if (b.length === 1) b = '0' + b

      return `#${r}${g}${b}`
    },
    copyValue: function (copyText) {
      copyText.select()
      document.execCommand('copy')
    }
  }
}
</script>

<style scoped lang="scss">
.modal {
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  .result {
    height: 100%;
    width: 65%;
  }
  .settings {
    background-color: white;
    width: 35%;
    .head {
      display: flex;
      align-items: baseline;
      font-size: 3rem;
      margin: 2rem;
    }
    .wrapper {
      display: flex;
      padding: 2em;
      input {
        margin-left: 1em;
        border: none;
        background-color: white;
        font-weight: 700;
      }
      input[type="range"] {
        opacity: 0.8;
        cursor: pointer;
        width: 10em;
      }
    }
    .bouton {
      display: flex;
      align-items: center;
      padding-right: 2em;
      .bouton_signup {
        border: none;
        font-weight: 700;
        padding: 0.8em 2em;
        background: #08080e 0% 0% no-repeat padding-box;
        border-radius: 6px;
        color: white;
      }
      .bouton_login {
        background-color: white;
        border: none;
        font-weight: 700;
        padding: 0.8em 2em;
      }
    }
  }
}
</style>

<template>
  <div class="modal">
    <div class="result" @click="$store.dispatch('openFullscreen', color)">
      <template v-for="color in colors">
        <div
          class="palette"
          :key="color.id"
          :style="{'background': `rgba(${color.red},${color.green},${color.blue},${color.alpha})`}"
        ></div>
      </template>
    </div>
    <div class="settings">
      <div class="head">
        <template v-for="color in colors">
          <img src="../assets/logo/chevron-down.svg" alt :key="color.id" />
          <select v-model="type" :key="color.id">
            <option>HEX</option>
            <option>RGB</option>
            <option>HSL</option>
          </select>
          <p v-show="type=='HEX'" :key="color.id">{{rgbToHex(color.red,color.green,color.blue)}}</p>
          <p
            v-show="type=='RGB'"
            :key="color.id"
          >rgb({{color.red}}, {{color.green}}, {{color.blue}})</p>
          <p v-show="type=='HSL'" :key="color.id">{{RGBToHSL(color.red,color.green,color.blue)}}</p>
          <img src="../assets/logo/copy.svg" alt :key="color.id" />
        </template>
      </div>
      <div class="content">
        <template v-for="color in colors">
          <div class="wrapper" :key="color.id">
            <p>Red</p>
            <input
              type="range"
              class="custom-slider"
              min="0"
              max="255"
              step="1"
              v-model="color.red"
            />
            <input type="number" min="0" max="255" v-model="color.red" />
          </div>

          <div class="wrapper" :key="color.id">
            <p>Green</p>
            <input type="range" min="0" max="255" step="1" v-model="color.green" />
            <input type="number" min="0" max="255" v-model="color.green" />
          </div>

          <div class="wrapper" :key="color.id">
            <p>Blue</p>
            <input type="range" min="0" max="255" step="1" v-model="color.blue" />
            <input type="number" min="0" max="255" v-model="color.blue" />
          </div>
        </template>
      </div>
      <div class="buttom">
        <button class="bouton_signup" @click="AddColor">Ajouter une couleur</button>
      </div>
      <div class="buttom">
        <button class="bouton_signup" @click="postColor">Créer</button>
        <button class="bouton_login" @click="$store.dispatch(`openModal_creation`)">Annuler</button>
      </div>
    </div>

    <div class="close">
      <img src="../assets/logo/x.svg" @click="$store.dispatch(`openModal_creation`)" alt />
    </div>
  </div>
</template>

<script>
// import axios from 'axios'

export default {
  data () {
    return {
      type: 'HEX',
      colors: [
        {
          red: '45',
          green: '53',
          blue: '97',
          alpha: 1
        },
        {
          red: '255',
          green: '53',
          blue: '97',
          alpha: 1
        },
        {
          red: '45',
          green: '255',
          blue: '97',
          alpha: 1
        }
      ]
    }
  },
  name: 'ModalCreationColor',
  mounted () {},
  computed: {},
  methods: {
    rgbToHex: function (red, blue, green) {
      let r = parseInt(red).toString(16)
      let g = parseInt(green).toString(16)
      let b = parseInt(blue).toString(16)

      if (r.length === 1) r = '0' + r
      if (g.length === 1) g = '0' + g
      if (b.length === 1) b = '0' + b

      return `#${r}${g}${b}`
    },
    RGBToHSL: function (r, g, b) {
      // Make r, g, and b fractions of 1
      r /= 255
      g /= 255
      b /= 255

      // Find greatest and smallest channel values
      let cmin = Math.min(r, g, b)
      let cmax = Math.max(r, g, b)
      let delta = cmax - cmin
      let h = 0
      let s = 0
      let l = 0
      // Calculate hue
      // No difference
      if (delta === 0) h = 0
      // Red is max
      else if (cmax === r) h = ((g - b) / delta) % 6
      // Green is max
      else if (cmax === g) h = (b - r) / delta + 2
      // Blue is max
      else h = (r - g) / delta + 4

      h = Math.round(h * 60)

      // Make negative hues positive behind 360°
      if (h < 0) h += 360
      // Calculate lightness
      l = (cmax + cmin) / 2

      // Calculate saturation
      s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1))

      // Multiply l and s by 100
      s = +(s * 100).toFixed(1)
      l = +(l * 100).toFixed(1)

      return 'hsl(' + h + ',' + s + '%,' + l + '%)'
    },
    copyValue: function (copyText) {
      copyText.select()
      document.execCommand('copy')
    },
    postColor: function () {
      // axios
      //   .post('http://localhost:3000/color', {
      //     red: this.color.red,
      //     green: this.color.green,
      //     blue: this.color.blue,
      //     alpha: 1.0,
      //     name: 'une couleur cool'
      //   })
      //   .then(response => {
      //     console.log(response)
      //     this.$store.dispatch(`openModal_creation`)
      //   })
      //   .catch(error => {
      //     console.log('TCL: postColor -> error', error)
      //     this.$store.dispatch(`toogle_error`)
      //   })
    },
    AddColor: function () {
      this.colors.push({ red: '45', green: '53', blue: '97', alpha: 1 })
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
    display: flex;
    .palette {
      flex: auto;
    }
  }
  .settings {
    background-color: white;
    width: 35%;
    display: flex;
    flex-direction: column;
    .head {
      display: flex;
      align-items: baseline;
      font-size: 3rem;
      margin: 2rem auto;
    }
    .content {
      margin: auto;
      align-self: center;
      .wrapper {
        display: flex;
        padding: 1em;
        input[type="number"] {
          margin-left: 1em;
          border: none;
          background-color: white;
          font-weight: 700;
          width: 3rem;
        }
        input[type="range"] {
          margin-left: 1em;
          opacity: 0.8;
          cursor: pointer;
          width: 10rem;
        }
      }
    }
    .buttom {
      margin: auto;
      padding-right: 2em;
      align-self: center;
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

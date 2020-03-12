<template>
  <div class="modal">
    <div
      class="result"
      :style="{'background': `linear-gradient(137deg, rgba(${color1.red},${color1.green},${color1.blue},${color1.alpha}) 0%, rgba(${color2.red},${color2.green},${color2.blue},${color2.alpha}) 100%)`}"
      @click="$store.dispatch('openFullscreen', color1)"
    ></div>
    <div class="settings">
      <div class="head">
        <select v-model="type">
          <option>HEX</option>
          <option>RGB</option>
          <option>HSL</option>
        </select>
        <p v-show="type=='HEX'">{{rgbToHex(color1.red,color1.green,color1.blue)}}</p>
        <p v-show="type=='RGB'">rgb({{color1.red}}, {{color1.green}}, {{color1.blue}})</p>
        <p v-show="type=='HSL'">{{RGBToHSL(color1.red,color1.green,color1.blue)}}</p>
        <img src="../assets/logo/copy.svg" alt />
        <p v-show="type=='HEX'">{{rgbToHex(color2.red,color2.green,color2.blue)}}</p>
        <p v-show="type=='RGB'">rgb({{color2.red}}, {{color2.green}}, {{color2.blue}})</p>
        <p v-show="type=='HSL'">{{RGBToHSL(color2.red,color2.green,color2.blue)}}</p>
        <img src="../assets/logo/copy.svg" alt />
      </div>
      <div class="content">
        <div class="wrapper">
          <p>Red</p>
          <input
            type="range"
            class="custom-slider-red"
            min="0"
            max="255"
            step="1"
            v-model="color1.red"
          />
          <input type="number" min="0" max="255" v-model="color1.red" />
        </div>

        <div class="wrapper">
          <p>Green</p>
          <input
            type="range"
            class="custom-slider-green"
            min="0"
            max="255"
            step="1"
            v-model="color1.green"
          />
          <input type="number" min="0" max="255" v-model="color1.green" />
        </div>

        <div class="wrapper">
          <p>Blue</p>
          <input
            type="range"
            class="custom-slider-blue"
            min="0"
            max="255"
            step="1"
            v-model="color1.blue"
          />
          <input type="number" min="0" max="255" v-model="color1.blue" />
        </div>
        <div class="wrapper">
          <p>Red</p>
          <input
            type="range"
            class="custom-slider-red"
            min="0"
            max="255"
            step="1"
            v-model="color2.red"
          />
          <input type="number" min="0" max="255" v-model="color2.red" />
        </div>

        <div class="wrapper">
          <p>Green</p>
          <input
            type="range"
            class="custom-slider-green"
            min="0"
            max="255"
            step="1"
            v-model="color2.green"
          />
          <input type="number" min="0" max="255" v-model="color2.green" />
        </div>

        <div class="wrapper">
          <p>Blue</p>
          <input
            type="range"
            class="custom-slider-blue"
            min="0"
            max="255"
            step="1"
            v-model="color2.blue"
          />
          <input type="number" min="0" max="255" v-model="color2.blue" />
        </div>
      </div>
      <div class="buttom">
        <button class="bouton_signup" @click="postColor">Créer</button>
        <button class="bouton_login" @click="$store.dispatch(`toogleModalCreationGradient`)">Annuler</button>
      </div>
    </div>

    <div class="close">
      <img src="../assets/logo/x.svg" @click="$store.dispatch(`toogleModalCreationGradient`)" alt />
    </div>
  </div>
</template>

<script>
import axios from '../axios'

export default {
  data () {
    return {
      type: 'HEX',
      color1: {
        red: '132',
        green: '250',
        blue: '176',
        alpha: 1
      },
      color2: {
        red: '143',
        green: '211',
        blue: '244',
        alpha: 1
      }
    }
  },
  name: 'ModalCreationColor',
  mounted () {},
  computed: {},
  methods: {
    rgbToHex: function (red, green, blue) {
      let r = parseInt(red).toString(16)
      let g = parseInt(green).toString(16)
      let b = parseInt(blue).toString(16)

      if (r.length === 1) r = '0' + r
      if (g.length === 1) g = '0' + g
      if (b.length === 1) b = '0' + b

      return `#${r}${g}${b}`
    },
    RGBToHSL: function (red, green, blue) {
      let r = red
      let g = green
      let b = blue

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
    async postGradient () {
      try {

      } catch (error) {
        console.log('⛔: postGradient -> error', error)
      }
      // axios
      //   .post('/color', {
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
    }
  }
}
</script>

<style scoped lang="scss">
@import "../assets/variables.scss";

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
    background-color: $white;
    width: 35%;
    display: flex;
    flex-direction: column;
    .head {
      display: flex;
      align-items: baseline;
      font-size: 3rem;
      margin: 2rem auto;
      select {
        border: none;
        font-size: 0.5em;
      }
      p {
        padding: 0 0.5em;
      }
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
          background-color: $white;
          font-weight: 700;
          width: 3rem;
        }
        input[type="range"] {
          width: 20em;
          padding-left: 1em;
        }
        .custom-slider-red {
          &::-webkit-slider-runnable-track {
            background: linear-gradient(90deg, #000000 0%, #ff0000 100%);
          }
          &::-moz-range-track {
            background: linear-gradient(90deg, #000000 0%, #ff0000 100%);
          }
          &::-ms-fill-upper {
            background: linear-gradient(90deg, #000000 0%, #ff0000 100%);
          }
        }
        .custom-slider-green {
          &::-webkit-slider-runnable-track {
            background: linear-gradient(90deg, #000000 0%, #00ff00 100%);
          }
          &::-moz-range-track {
            background: linear-gradient(90deg, #000000 0%, #00ff00 100%);
          }
          &::-ms-fill-upper {
            background: linear-gradient(90deg, #000000 0%, #00ff00 100%);
          }
        }
        .custom-slider-blue {
          &::-webkit-slider-runnable-track {
            background: linear-gradient(90deg, #000000 0%, #0000ff 100%);
          }
          &::-moz-range-track {
            background: linear-gradient(90deg, #000000 0%, #0000ff 100%);
          }
          &::-ms-fill-upper {
            background: linear-gradient(90deg, #000000 0%, #0000ff 100%);
          }
        }
      }
    }
    .buttom {
      margin: auto;
      align-self: center;
      .bouton_signup {
        border: none;
        font-weight: 700;
        padding: 0.8em 2em;
        background: $black 0% 0% no-repeat padding-box;
        border-radius: 6px;
        color: $white;
      }
      .bouton_login {
        background-color: $white;
        border: none;
        font-weight: 700;
        padding: 0.8em 2em;
      }
    }
  }
}
</style>

<style lang="scss" scoped>
$thumb-color: white !default;

$thumb-radius: 12px !default;
$thumb-height: 24px !default;
$thumb-width: 24px !default;
$thumb-border-width: 3px !default;
$thumb-border-color: black !default;

$track-width: 100% !default;
$track-height: 8px !default;
$track-border-width: 2px !default;
$track-border-color: #cfd8dc !default;

$track-radius: 5px !default;
$contrast: 5% !default;

@mixin track {
  cursor: pointer;
  height: $track-height;
  transition: all 0.2s ease;
  width: $track-width;
}

@mixin thumb {
  background: $thumb-color;
  border: $thumb-border-width solid $thumb-border-color;
  border-radius: $thumb-radius;
  box-sizing: border-box;
  cursor: default;
  height: $thumb-height;
  width: $thumb-width;
}

[type="range"] {
  -webkit-appearance: none;
  background: transparent;
  margin: $thumb-height / 2 0;
  width: $track-width;

  &::-moz-focus-outer {
    border: 0;
  }

  &::-webkit-slider-runnable-track {
    @include track;
    border: none;
    border-radius: $track-radius;
    height: $track-height / 2;
  }

  &::-webkit-slider-thumb {
    @include thumb;
    -webkit-appearance: none;
    margin-top: (
      (-$track-border-width * 2 + $track-height) / 2 - $thumb-height / 2
    );
  }

  &::-moz-range-track {
    @include track;
    border: none;
    border-radius: $track-radius;
    height: $track-height / 2;
  }

  &::-moz-range-thumb {
    @include thumb;
  }

  &::-ms-track {
    @include track;
    background: transparent;
    border-color: transparent;
    border-width: ($thumb-height / 2) 0;
    color: transparent;
  }

  &::-ms-fill-lower {
    border: none;
    border-radius: ($track-radius * 2);
  }

  &::-ms-fill-upper {
    border: none;
    border-radius: ($track-radius * 2);
  }

  &::-ms-thumb {
    @include thumb;
    margin-top: $track-height / 4;
  }

  &:disabled {
    &::-webkit-slider-thumb,
    &::-moz-range-thumb,
    &::-ms-thumb,
    &::-webkit-slider-runnable-track,
    &::-ms-fill-lower,
    &::-ms-fill-upper {
      cursor: not-allowed;
    }
  }
}
</style>

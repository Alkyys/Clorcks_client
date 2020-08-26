<template>
  <div class="modal">
    <div
      class="result"
      :style="{'background': `rgba(${rgbMode.r},${rgbMode.g},${rgbMode.b},1)`}"
      @click="$store.dispatch('openFullscreen', color)"
    />
    <div class="settings">
      <div class="head">
        <select v-model="type">
          <option>HEX</option>
          <option>RGB</option>
          <option>HSL</option>
        </select>
        <p v-show="type=='HEX'">
          {{ color.hex() }}
        </p>
        <p v-show="type=='RGB'">
          rgb({{ rgbMode.r }}, {{ rgbMode.g }}, {{ rgbMode.b }})
        </p>
        <p v-show="type=='HSL'">
          {{ toHSL }}
        </p>
        <button
          v-clipboard:copy="copy"
          v-clipboard:success="onCopy"
          v-clipboard:error="onError"
          type="button"
        >
          <img src="../assets/logo/copy.svg" alt>
        </button>
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
            @input="updateRed"
          >
          {{ color.red() }}
          <!-- <input type="number" min="0" max="255" v-model="color.red()" /> -->
        </div>

        <div class="wrapper">
          <p>Green</p>
          <input
            v-model="rgbMode.g"
            type="range"
            class="custom-slider-green"
            min="0"
            max="255"
            step="1"
          >
          <input
            v-model="rgbMode.g"
            type="number"
            min="0"
            max="255"
          >
        </div>

        <div class="wrapper">
          <p>Blue</p>
          <input
            v-model="rgbMode.b"
            type="range"
            class="custom-slider-blue"
            min="0"
            max="255"
            step="1"
          >
          <input
            v-model="rgbMode.b"
            type="number"
            min="0"
            max="255"
          >
        </div>

        <div class="wrapper">
          <p>Hue</p>
          <input
            v-model="hslMode.h"
            type="range"
            class="custom-slider-blue"
            min="0"
            max="300"
            step="1"
          >
          <input
            v-model="hslMode.h"
            type="number"
            min="0"
            max="300"
          >
        </div>
        <div class="wrapper">
          <p>Saturation</p>
          <input
            v-model="hslMode.s"
            type="range"
            class="custom-slider-blue"
            min="0"
            max="100"
            step="100"
          >
          <input
            v-model="hslMode.s"
            type="number"
            min="0"
            max="100"
          >
        </div>
        <div class="wrapper">
          <p>Lightness</p>
          <input
            v-model="hslMode.l"
            type="range"
            class="custom-slider-blue"
            min="0"
            max="100"
            step="1"
          >
          <input
            v-model="hslMode.l"
            type="number"
            min="0"
            max="100"
          >%
        </div>
      </div>
      <div class="buttom">
        <button class="bouton_signup" @click="postColor(rgbMode.r,rgbMode.g,rgbMode.b)">
          Créer
        </button>
        <button class="bouton_login" @click="$store.dispatch(`toogleModalCreationColor`)">
          Annuler
        </button>
      </div>
    </div>

    <div class="close">
      <img
        src="../assets/logo/x.svg"
        alt
        @click="$store.dispatch(`toogleModalCreationColor`)"
      >
    </div>
  </div>
</template>

<script>
import Color from 'color'
export default {
  name: 'ModalCreationColor',
  data () {
    return {
      rgbMode: {
        r: '0',
        g: '0',
        b: '0'
      },
      hslMode: {
        h: '0',
        s: '0',
        l: '0'
      },
      color: Color('rgb(0, 10, 100)'),
      type: 'HEX',
      copy: ''
    }
  },
  computed: {
    toHex: function () {
      // const hex = Color(`rgb(${this.rgbMode.r},${this.rgbMode.g},${this.rgbMode.b})`)
      // return hex.hex()
      return 'toHex'
    },
    toHSL: function () {
      // const hsl = Color(`rgb(${this.rgbMode.r},${this.rgbMode.g},${this.rgbMode.b})`)
      // return hsl.hsl()
      return 'toHSL'
    }
  },
  mounted () {
    const color = Color()
    console.log('🐛: mounted -> color.red(24)', color.red(24))
    color.red(24)
    console.log('🐛: mounted -> color', color)
  },
  methods: {
    updateRed (event) {
      this.color = this.color.red(event.target.value)
    },
    onCopy: function (e) {
      console.log('🐛: onCopy')
      console.log(`couleur copie : ${e.text}`)
    },
    onError: function (e) {
      console.log('Failed to copy texts')
    },
    postColor: function (r, g, b) {
      this.$store.dispatch('workspacejam/addItem', {
        payload: { r, g, b },
        type: 'color'
      })
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
      button {
        border: none;
        background-color: white;
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

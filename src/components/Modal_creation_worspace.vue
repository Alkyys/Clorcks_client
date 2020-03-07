<template>
  <div class="background" @click.self="$store.dispatch(`toogleModalCreationWorkspace`)">
    <div class="modal">
      <div class="head">
        <h1>New Worspace</h1>
      </div>
      <div class="content">
        <input v-model="name" type="text" placeholder="Name" />
      </div>
      <div class="color">
        <p>Choose a color</p>
        <div class="input">
          <div class="wrapper">
            <p>Red</p>
            <input
              type="range"
              class="custom-slider-red"
              min="0"
              max="255"
              step="1"
              v-model="color.red"
            />
            <input type="number" min="0" max="255" v-model="color.red" />
          </div>

          <div class="wrapper">
            <p>Green</p>
            <input
              type="range"
              class="custom-slider-green"
              min="0"
              max="255"
              step="1"
              v-model="color.green"
            />
            <input type="number" min="0" max="255" v-model="color.green" />
          </div>

          <div class="wrapper">
            <p>Blue</p>
            <input
              type="range"
              class="custom-slider-blue"
              min="0"
              max="255"
              step="1"
              v-model="color.blue"
            />
            <input type="number" min="0" max="255" v-model="color.blue" />
          </div>
        </div>
        <div
          class="result"
          :style="{'background': `rgba(${color.red},${color.green},${color.blue},${color.alpha})`}"
        ></div>
      </div>

      <div class="button">
        <button class="valider" @click="$store.dispatch(`toogleModalCreationWorkspace`)">Valider</button>
        <button class="annuler" @click="$store.dispatch(`toogleModalCreationWorkspace`)">Annuler</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      color: {
        red: "45",
        green: "53",
        blue: "97",
        alpha: 1
      }
    };
  },
  methods: {}
};
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
      input {
        display: flex;
        margin: 1em 3em;
        border: 3px solid #08080e;
        border-radius: 10px;
        padding: 0.5em;
      }
    }
    .color {
      display: flex;
      justify-content: space-around;
      align-items: center;
      .wrapper {
        display: flex;
        input[type="range"] {
          width: 20em;
          padding-left: 1em;
        }
        input[type="number"] {
          margin-left: 1em;
          border: none;
          background-color: white;
          font-weight: 700;
          width: 3rem;
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

    .result {
      height: 100px;
      width: 100px;
    }
    .button {
      margin: auto;
      .valider {
        border: none;
        padding: 0.8em 3em;
        background: #08080e 0% 0% no-repeat padding-box;
        box-shadow: 1px 1px 10px #08080e69;
        border-radius: 6px;
        color: white;
        font-weight: bold;
      }
      .annuler {
        border: 2px solid #08080e;
        border-radius: 10px;
        background-color: white;
        font-weight: 700;
        padding: 0.8em 2em;
        margin-left: 1em;
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

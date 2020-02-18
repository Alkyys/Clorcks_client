<template>
  <div class="card">
    <ul>
      <!-- COLOR -->
      <li v-for="color in colors" :key="color._id">
        <div
          class="colorcard"
          :style="{'background': `rgba(${color.red},${color.green},${color.blue},${color.alpha})`}"
        ></div>
        <div class="iconcard">
          <img
            @click="this.$store.state.option = !this.$store.state.option"
            src="../assets/logo/settings.svg"
            alt
          />
          <img src="../assets/logo/heart.svg" alt />
        </div>
      </li>

      <!-- GRADIENT -->
      <li v-for="gradient in gradients" :key="gradient._id">
        <div
          class="colorcard"
          :style="{'background': `linear-gradient(137deg,
          rgb(
            ${gradient.stops[0].color.red},
            ${gradient.stops[0].color.green},
            ${gradient.stops[0].color.blue}
          ) ${gradient.stops[0].position}%,
          rgb(
            ${gradient.stops[1].color.red},
            ${gradient.stops[1].color.green},
            ${gradient.stops[1].color.blue}
          ) ${gradient.stops[1].position}%
          )`}"
        ></div>
        <div class="iconcard">
          <img
            @click="this.$store.state.option = !this.$store.state.option"
            src="../assets/logo/settings.svg"
            alt
          />
          <img src="../assets/logo/heart.svg" alt />
        </div>
      </li>

      <!-- PALETTE -->
      <li v-for="palette in palettes" :key="palette._id">
        <div class="colorcard">
          <div v-for="color in palette.colors_id" :key="color.id" class="palette">
            <div
              :style="{
                'background': `rgb( ${color.red},  ${color.green}, ${color.blue})`,
                'width': `${size[palette.colors_id.length - 1]}em`,
                'height': `5.5em`
               }"
            ></div>
          </div>
        </div>
        <div class="iconcard">
          <img
            @click="this.$store.state.option = !this.$store.state.option"
            src="../assets/logo/settings.svg"
            alt
          />
          <img src="../assets/logo/heart.svg" alt />
        </div>
      </li>
    </ul>
    <div v-if="this.$store.state.option" class="modal"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      size: [5.5, 2.75, 1.833, 1.375, 1.1, 0.916]
    }
  },
  name: 'Card',
  mounted () {
    this.$store.dispatch(`loadColors`)
    this.$store.dispatch(`loadGradients`)
    this.$store.dispatch(`loadPalettes`)
    // this.$store.dispatch(`loadWokspace`)
  },
  computed: {
    ...mapState(['colors', 'gradients', 'palettes'])
  }
}
</script>

<style scoped lang="scss">
.card {
  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 2rem 0px;
    li {
      margin: 1em;
      width: 6rem;
      height: 8rem;
      background: #ffffff 0% 0% no-repeat padding-box;
      box-shadow: 1px 1px 10px #0000000f;
      border-radius: 5px;
      .colorcard {
        margin: 0.25rem auto 0px auto;
        height: 5.5em;
        width: 5.5em;
        border-radius: 5px;
        display: flex;
        div.palette:first-of-type div {
          border-radius: 5px 0px 0px 5px;
        }
        div.palette:last-of-type div {
          border-radius: 0px 5px 5px 0px;
        }
      }
      .iconcard {
        margin: 0.4rem 0.5rem;
        display: flex;
        justify-content: space-between;
        height: 1.5rem;
      }
    }
  }
  .modal {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0px;
    left: 0px;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(30px);
  }
}
</style>

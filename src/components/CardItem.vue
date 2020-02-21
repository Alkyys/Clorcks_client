<template>
  <div class="card">
    <li>
    <!-- COLOR -->
      <template v-if="type==='color'">
        <div
          class="colorcard"
          :style="{'background': `rgba(${item.red},${item.green},${item.blue},${item.alpha})`}"
        ></div>
      </template>
      <!-- GRADIENT -->
      <template v-else-if="type==='gradient'">
        <div
          class="colorcard"
          :style="{'background': `linear-gradient(137deg,
          rgb(
            ${item.stops[0].color.red},
            ${item.stops[0].color.green},
            ${item.stops[0].color.blue}
          ) ${item.stops[0].position}%,
          rgb(
            ${item.stops[1].color.red},
            ${item.stops[1].color.green},
            ${item.stops[1].color.blue}
          ) ${item.stops[1].position}%
          )`}"
        ></div>
      </template>
      <!-- PALETTE -->
      <template v-else-if="type==='palette'">
        <div class="colorcard">
          <div v-for="color in item.colors_id" :key="color._id" class="palette">
            <div
              :style="{
                'background': `rgb( ${color.red},  ${color.green}, ${color.blue})`,
                'width': `${size[item.colors_id.length - 1]}em`,
                'height': `5.5em`
               }"
            ></div>
          </div>
        </div>
      </template>
      <div class="iconcard">
        <img
          @click="this.$store.state.option = !this.$store.state.option"
          src="../assets/logo/settings.svg"
          alt
        />
        <img v-if="!liked" @click="liked = !liked" src="../assets/logo/heart.svg" alt />
        <img v-else @click="liked = !liked" src="../assets/logo/heart red.svg" alt />
      </div>
    </li>
    <!-- <div v-if="this.$store.state.option" class="modal"></div> -->
  </div>
</template>

<script>

export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      size: [5.5, 2.75, 1.833, 1.375, 1.1, 0.916],
      liked: false
    }
  },
  computed: {
    type () {
      if ('stops' in this.item) return 'gradient'
      if ('colors_id' in this.item) return 'palette'
      return 'color'
    }
  }
}
</script>

<style scoped lang="scss">
.card {
  display: contents;
  li {
    margin: 1em;
    width: 6rem;
    height: 7.5rem;
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
      margin: 0.2rem 0.5rem;
      display: flex;
      justify-content: space-between;
      height: 1.5rem;
    }
  }
  // .modal {
  //   position: absolute;
  //   height: 100%;
  //   width: 100%;
  //   top: 0px;
  //   left: 0px;
  //   backdrop-filter: blur(10px);
  //   -webkit-backdrop-filter: blur(30px);
  // }
}
</style>

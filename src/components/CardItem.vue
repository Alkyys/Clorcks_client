<template>
  <li>
    <!-- COLOR -->
    <template v-if="type==='color'">
      <div
        class="colorcard"
        :style="{'background': `rgba(${item.red},${item.green},${item.blue},${item.alpha})`}"
        @click="$store.dispatch('openFullscreen', item)"
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
        @click="$store.dispatch('openFullscreen', item)"
      ></div>
    </template>
    <!-- PALETTE -->
    <template v-else-if="type==='palette'">
      <div class="colorcard" @click="$store.dispatch('openFullscreen', item)">
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
    <div class="iconcard" :class="{liked}">
      <img
        @click="this.$store.state.option = !this.$store.state.option"
        src="../assets/logo/settings.svg"
        alt
      />
      <img class="button-like" v-if="!liked" @click="liked = !liked" src="../assets/logo/heart.svg" alt />
      <img class="button-like" v-else @click="liked = !liked" src="../assets/logo/heart red.svg" alt />
    </div>
  </li>
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
    transition: opacity 0.3s ease-in-out;
    margin: 0.2rem 0.5rem;
    display: flex;
    justify-content: space-between;
    height: 1.5rem;

    img {
      opacity: 0;
    }

     &.liked .button-like {
       opacity: 1;
     }
  }

  &:hover .iconcard img {
    opacity: 1;
  }
}
</style>

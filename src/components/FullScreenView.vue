<template>
  <div class="app">
    <!-- COLOR -->
    <template v-if="type==='color'">
      <div
        class="screen"
        :style="{'background': `rgba(${item.red},${item.green},${item.blue},${item.alpha})`}"
        @click="$store.dispatch('closeFullscreen')"
      ></div>
    </template>

    <!-- PALETTE -->
    <template v-else-if="type==='gradient'">
      <div
        class="screen"
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
        @click="$store.dispatch('closeFullscreen')"
      ></div>
    </template>

    <!-- GRADIENT -->
    <template v-else-if="type==='palette'">
      <div class="screen">
        <template v-for="color in item.colors_id">
          <div
            class="palette"
            :style="{
                'background': `rgb( ${color.red},  ${color.green}, ${color.blue})`,
               }"
            @click="$store.dispatch('closeFullscreen')"
            :key="color._id"
          ></div>
        </template>
      </div>
    </template>
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
  mounted () {
    console.log(`↔ Fullscreen`)
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
.app {
   z-index: 100;
  .screen {
    z-index: 100;
    position: fixed;
    height: 100%;
    width: 100%;
    top: 0px;
    left: 0px;
    display: flex;
    .palette {
      flex: auto;
      height: 100%;
    }
  }
}
</style>

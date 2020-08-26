<template>
  <li>
    <!-- COLOR -->
    <template v-if="type==='color'">
      <div
        class="colorcard"
        :style="{'background': `rgba(${item.red},${item.green},${item.blue},${item.alpha})`}"
        @click="$store.dispatch('openFullscreen', item)"
      />
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
      />
    </template>
    <!-- PALETTE -->
    <template v-else-if="type==='palette'">
      <div class="colorcard" @click="$store.dispatch('openFullscreen', item)">
        <div
          v-for="color in item.colors_id"
          :key="color._id"
          class="palette"
        >
          <div
            :style="{
              'background': `rgb( ${color.red},  ${color.green}, ${color.blue})`,
              'width': `${size[item.colors_id.length - 1]}em`,
              'height': `5.5em`
            }"
          />
        </div>
      </div>
    </template>
    <div class="iconcard" :class="{liked}">
      <div
        v-if="isAuthenticated"
        class="likeCount"
        @click="like"
      >
        <img
          v-if="!liked"
          class="button-like"
          src="../assets/logo/heart.svg"
          alt
        >
        <img
          v-else
          class="button-like"
          src="../assets/logo/heart red.svg"
          alt
        >
        <p>{{ item.likeCount }}</p>
      </div>
      <div @click="showOptions = !showOptions">
        <img
          src="../assets/logo/chevron-down.svg"
          alt
          class="chevron"
          :class="{rotate: showOptions}"
        >
      </div>
    </div>
    <div v-show="showOptions" class="settings">
      <p @click="$store.dispatch('toogleFeature')">
        Edit
      </p>
      <p
        v-if="my"
        class="red"
        @click="$store.dispatch('workspacejam/deleteItem',{item, type})"
      >
        Delete
      </p>
    </div>
    <div v-show="showOptions" class="background" />
  </li>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    },
    my: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      size: [5.5, 2.75, 1.833, 1.375, 1.1, 0.916],
      liked: false,
      showOptions: false,
      isCliked: false
    }
  },

  computed: {
    isAuthenticated () {
      return this.$store.getters['auth/isAuthenticated']
    },
    type () {
      if ('stops' in this.item) return 'gradient'
      if ('colors_id' in this.item) return 'palette'
      return 'color'
    }
  },
  mounted () {
    // chargement des likes si l'user dest connecter
    if (this.$store.getters['auth/isAuthenticated']) {
      // gradient
      if ('stops' in this.item) {
        if (
          this.$store.getters['workspacejam/active'].gradientsLike_id.find(
            (e) => e === `${this.item._id}`
          )
        ) {
          this.liked = true
        }
      }

      // palette
      if ('colors_id' in this.item) {
        if (
          this.$store.getters['workspacejam/active'].palettesLike_id.find(
            (e) => e === `${this.item._id}`
          )
        ) {
          this.liked = true
        }
      }

      // color
      if (
        this.$store.getters['workspacejam/active'].colorsLike_id.find(
          (e) => e === `${this.item._id}`
        )
      ) {
        this.liked = true
      }
    }
  },
  methods: {
    async like () {
      const liked = await this.$store.dispatch('workspacejam/like', {
        item: this.item,
        type: this.type
      })
      this.liked = liked.data.liked
      if (liked.data.liked) {
        this.item.likeCount++
        console.log('❤')
      } else {
        this.item.likeCount--
        console.log('💔')
      }
    }
  }
}
</script>

<style scoped lang="scss">
li {
  align-self: flex-start;
  margin: 1em;
  width: 6rem;
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
    transition: opacity 0.5s;
    margin: 0.2rem 0.5rem;
    display: flex;
    justify-content: space-between;
    height: 1.5rem;
    & img,
    p {
      opacity: 0;
    }
    &.liked .button-like {
      opacity: 1;
    }
    .likeCount {
      display: flex;
      align-items: center;
      img {
        margin-right: 3px;
      }
    }
    .chevron {
      transform: rotate(-90deg);
      transition: all 0.5s;
      &.rotate {
        transform: rotate(0deg);
        opacity: 1;
      }
    }
  }

  &:hover img,
  &:hover p {
    opacity: 1;
  }
  .settings {
    text-align: left;
    padding-bottom: 2px;
    p {
      padding: 2px 5px;
    }
    .red {
      color: red;
    }
  }
  .background {
    position: fixed;
    height: 100%;
    backdrop-filter: blur(5px);
    left: 0px;
    width: 100%;
    top: 0px;
    z-index: -2;
  }
}
</style>

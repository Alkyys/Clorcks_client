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
      <img @click="option = !option" src="../assets/logo/settings.svg" alt />
      <div @click="like" v-if="isAuthenticated" class="likeCount">
        <p>{{item.likeCount}}</p>
        <img class="button-like" v-if="!liked" src="../assets/logo/heart.svg" alt />
        <img class="button-like" v-else src="../assets/logo/heart red.svg" alt />
      </div>
    </div>
    <div v-show="option" class="settings">
      <div v-if="my" class="icon" @click="$store.dispatch('workspacejam/deleteItem',{item, type})">
        <img src="../assets/logo/trash-2.svg" alt />
        <p>Delete</p>
      </div>
      <div class="icon" @click="$store.dispatch('toogleFeature')">
        <img src="../assets/logo/edit-3.svg" alt />
        <p>Edit</p>
      </div>
    </div>
    <div class="background" v-show="option"></div>
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
      option: false,
      isCliked: false
    }
  },
  mounted () {
    // chargement des likes si l'user dest connecter
    if (this.$store.getters['auth/isAuthenticated']) {

      // gradient
      if ('stops' in this.item) {
        if (
          this.$store.getters['workspacejam/active'].gradientsLike_id.find(
            e => e === `${this.item._id}`
          )
        ) {
          this.liked = true
        }
      }

      // palette
      if ('colors_id' in this.item) {
        if (
          this.$store.getters['workspacejam/active'].palettesLike_id.find(
            e => e === `${this.item._id}`
          )
        ) {
          this.liked = true
        }
      }

      // color
      if (
        this.$store.getters['workspacejam/active'].colorsLike_id.find(
          e => e === `${this.item._id}`
        )
      ) {
        this.liked = true
      }
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
  methods: {
    async like () {
      const liked = await this.$store.dispatch('workspacejam/like', {
        item: this.item,
        type: this.type
      })
      this.liked = liked.data.liked
      if (liked.data.liked) {
        this.item.likeCount++
        console.log(`❤`)
      } else {
        this.item.likeCount--
        console.log(`💔`)
      }
    }
  }
}
</script>

<style scoped lang="scss">
li {
  z-index: 1;
  margin: 1em;
  width: 6rem;
  //height: 7.5rem;
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

    img,
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
        margin-left: 3px;
      }
    }
  }

  &:hover .iconcard img,
  &:hover .iconcard p {
    opacity: 1;
  }
  .settings {
    .icon {
      display: flex;
      justify-content: space-around;
      align-items: center;
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

<template>
  <div class="card">
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
          <img v-if="!liked" @click="liked = !liked" src="../assets/logo/heart.svg" alt />
          <img v-else @click="liked = !liked" src="../assets/logo/heart red.svg" alt="">
        </div>
      </li>
    <div v-if="this.$store.state.option" class="modal"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      liked: false
    }
  },
  name: 'CardGradient',
  mounted () {
    this.$store.dispatch(`loadGradients`)
  },
  computed: {
    ...mapState(['gradients'])
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

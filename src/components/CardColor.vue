<template>
  <div class="card">
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
        <img v-if="!liked" @click="liked = !liked" src="../assets/logo/heart.svg" alt />
        <img v-else @click="liked = !liked" src="../assets/logo/heart red.svg" alt />
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
  name: 'CardColor',
  mounted () {
    this.$store.dispatch(`loadColors`)
  },
  computed: {
    ...mapState(['colors'])
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

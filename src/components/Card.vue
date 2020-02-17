<template>
  <div class="card">
    <ul>
      <li v-for="color in colors" :key="color._id">
        <div
          class="colorcard"
          :style="{'background': `rgba(${color.red},${color.green},${color.blue},${color.alpha})`}"
        ></div>
        <div class="iconcard">
          <img @click="option = !option" src="../assets/logo/settings.svg" alt />
          <img src="../assets/logo/heart.svg" alt />
        </div>
      </li>
    </ul>
    <div v-if="option" class="modal"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      option: false
    }
  },
  name: 'Card',
  mounted () {
    this.$store.dispatch(`loadColors`)
  },
  computed: {
    ...mapState([
      'colors'
    ])
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
        background: var(--color-rgb) 0% 0% no-repeat padding-box;
        border-radius: 5px;
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

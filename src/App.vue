<template>
  <div id="app">
    <router-view />
    <transition name="component-fade" mode="out-in">
      <FullScreenView
        v-if="this.$store.state.isFullscreenOpened"
        :item="this.$store.state.activeFullscreenItem"
        :is="view"
      />
    </transition>
    <Error v-if="this.$store.state.error" />
  </div>
</template>

<script>
import FullScreenView from './components/FullScreenView.vue'
import Error from './components/error.vue'

export default {
  data () {
    return {
      view: FullScreenView
    }
  },
  components: {
    FullScreenView,
    Error
  },

  created () {
    this.authenticateUser()
  },

  methods: {
    authenticateUser () {
      const { accessToken } = this.$store.state.auth
      accessToken && this.$store.dispatch('auth/authenticate', { accessToken })
    }
  }
}
</script>

<style lang="scss">
// reset css
@import url(./assets/reset.css);

// font
@font-face {
  font-family: "Gilroy";
  font-weight: 800;
  src: url("./assets/font/Gilroy-ExtraBold.ttf");
}
@font-face {
  font-family: "Gilroy";
  font-weight: 500;
  src: url("./assets/font/Gilroy-Medium.ttf");
}
@font-face {
  font-family: "Gilroy";
  font-weight: 700;
  src: url("./assets/font/Gilroy-Bold.ttf");
}

#app {
  font-family: "Gilroy", Helvetica, Arial, sans-serif;
}

.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.3s ease;
}
.component-fade-enter,
.component-fade-leave-to {
  opacity: 0;
}
</style>

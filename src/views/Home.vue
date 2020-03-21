<template>
  <div class="home">
    <div class="head">
      <div class="logo">
        <img src="../assets/logo/Logo complet.svg" alt="logo de clorcks" />
      </div>

      <AccountStatus />
    </div>

    <div class="title">Use Clorcks for beautiful colors</div>

    <button
      class="glow-on-hover"
      v-if="isAuthenticated"
      @click="$store.dispatch(`toogleModalChooseCreation`)"
    >Create New</button>

    <PersonnalCollection v-if="activeWorkspace" />
    <ExploreCollection />

    <transition name="fade" mode="out-in">
      <router-view />
      <ModalChoose v-if="this.$store.state.modalChooseCreation" />
      <ModalCreationColor v-if="this.$store.state.modalCreationColor" />
      <ModalCreationPalette v-if="this.$store.state.modalCreationPalette" />
      <ModalCreationGradient v-if="this.$store.state.modalCreationGradient" />
      <ModalWorkspace v-if="this.$store.state.modalWorkspace" />
      <ModalCreationWorkSpace v-if="this.$store.state.modalCreationWorkspace" />
      <ModalUserSettings v-if="this.$store.state.modalUserSettings" />
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

// import de composant
import AccountStatus from '@/components/AccountStatus.vue'
import ExploreCollection from '@/components/ExploreCollection.vue'
import ModalChoose from '../components/Modal_choose.vue'
import ModalCreationColor from '../components/Modal_creation_color.vue'
import ModalWorkspace from '../components/Modal_worspace.vue'
import ModalCreationPalette from '../components/Modal_creation_palette.vue'
import ModalCreationGradient from '../components/Modal_creation_gradient.vue'
import ModalCreationWorkSpace from '../components/Modal_creation_worspace.vue'
import ModalUserSettings from '../components/Modal_user_settings.vue'
import PersonnalCollection from '@/components/PersonnalCollection.vue'

export default {
  data () {
    return {
      modal: true
    }
  },
  name: 'home',
  components: {
    AccountStatus,
    ExploreCollection,
    ModalChoose,
    ModalCreationColor,
    ModalWorkspace,
    ModalCreationPalette,
    ModalCreationGradient,
    ModalCreationWorkSpace,
    ModalUserSettings,
    PersonnalCollection
  },

  computed: {
    ...mapGetters({
      isAuthenticated: 'auth/isAuthenticated',
      activeWorkspace: 'workspacejam/active'
    }),
    ...mapState({
      user: state => state.auth.user
    })
  }
}
</script>

<style  lang="scss" scoped>
@import "../assets/variables.scss";

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.home {
  display: flex;
  flex-direction: column;
  font-weight: 700;
}
.head {
  display: flex;
  justify-content: space-between;
  .logo {
    padding-left: 1em;
  }
}

.title {
  display: flex;
  justify-content: center;
  font-size: 4.5em;
  padding: 1em 0em;
}

.glow-on-hover {
  margin: auto;
  padding: 0.8rem 4rem;
  border: 2px solid $black;
  outline: none;
  font-weight: 700;
  font-size: 2rem;
  background: $white;
  cursor: pointer;
  position: relative;
  z-index: 0;
  border-radius: 10px;
}

.glow-on-hover:before {
  content: "";
  background: linear-gradient(
    45deg,
    #ff0000,
    #ff7300,
    #fffb00,
    #48ff00,
    #00ffd5,
    #002bff,
    #7a00ff,
    #ff00c8,
    #ff0000
  );
  position: absolute;
  top: -50%;
  left: -40%;
  background-size: 400%;
  z-index: -1;
  filter: blur(40px);
  width: calc(175% + 4px);
  height: calc(200% + 4px);
  animation: glowing 20s linear infinite;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  border-radius: 10px;
}

.glow-on-hover:hover {
  color: $white;
  transition: color 0.3s ease-in-out;
  box-shadow: none;
  border: 2px solid $white;
}

.glow-on-hover:active {
  color: $white;
}

.glow-on-hover:active:after {
  background: transparent;
}

.glow-on-hover:hover:before {
  opacity: 1;
}

.glow-on-hover:after {
  z-index: -1;
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  border-radius: 10px;
}

@keyframes glowing {
  0% {
    background-position: 0 0;
  }
  50% {
    background-position: 400% 0;
  }
  100% {
    background-position: 0 0;
  }
}
</style>

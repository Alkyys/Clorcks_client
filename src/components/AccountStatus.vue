<template>
  <div v-if="isAuthenticated" class="user">
    <div @click="openSettings">
      {{ user.name }}
    </div>
    <button
      v-if="activeWorkspace"
      class="workspace"
      @click="openWorkspaceSelectionModal"
    >
      {{ activeWorkspace.name }}
    </button>
    <img
      src="../assets/logo/user.svg"
      alt
      @click="$store.dispatch(`toogleModalUserSettings`)"
    >
  </div>

  <div v-else class="bouton">
    <router-link
      tag="button"
      class="bouton_signup"
      :to="{ name: 'sign-up'}"
    >
      Sign up
    </router-link>
    <router-link
      tag="button"
      class="bouton_login"
      :to="{ name: 'login'}"
    >
      Log in
    </router-link>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      isAuthenticated: 'auth/isAuthenticated',
      activeWorkspace: 'workspacejam/active'
    }),
    ...mapState({
      user: state => state.auth.user
    })
  },

  watch: {
    isAuthenticated: {
      immediate: true,
      handler (value) {
        value && this.listWorkspaces()
      }
    }
  },

  methods: {
    listWorkspaces () {
      this.$store.dispatch('workspacejam/list')
    },

    openSettings () {
      this.$store.dispatch('toogleModalUserSettings')
    },

    openWorkspaceSelectionModal () {
      this.$store.dispatch('toogle_modal_workspace')
    }
  }
}
</script>

<style lang="scss" scoped>
 @import '@/assets/variables.scss';

.bouton {
  display: flex;
  align-items: center;
  padding-right: 2em;
  .bouton_signup {
    border: none;
    font-weight: 700;
    padding: 0.8em 2em;
    background: $black 0% 0% no-repeat padding-box;
    border-radius: 6px;
    color: $white;
  }
  .bouton_login {
    background-color: $white;
    border: none;
    font-weight: 700;
    padding: 0.8em 2em;
  }
}
.user {
  display: flex;
  align-items: center;
  padding-right: 2em;
  font-weight: bold;
  .workspace {
    border: none;
    color: $white;
    font-weight: 700;
    padding: 0.8em 2em;
    background: $red 0% 0% no-repeat padding-box;
    box-shadow: 1px 1px 6px $red;
    border-radius: 5px;
    margin: 0px 1rem;
  }
}
</style>

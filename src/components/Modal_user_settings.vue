<template>
  <div class="background" @click.self="$store.dispatch(`toogleModalUserSettings`)">
    <div class="modal">
      <div class="head">
        <h1>User Settings</h1>
      </div>
      <div class="content">
        <p>Name</p>
        <input type="text" :value="user.name" />
        <p>Email</p>
        <input type="email" :value="user.email" />
        <p>Password</p>
        <input type="password" value="nothing" />
      </div>
      <button class="disconnect" @click="disconnect">Disconnect</button>
      <div class="button">
        <button class="valider" @click="$store.dispatch(`toogleModalUserSettings`)">Valider</button>
        <button class="annuler" @click="$store.dispatch(`toogleModalUserSettings`)">Annuler</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {}
  },
  methods: {
    disconnect () {
      this.$store.dispatch(`toogleModalUserSettings`)
      this.$store.dispatch(`auth/disconnect`)
    }
  },
  computed: {
    ...mapState({
      user: state => state.auth.user
    })
  }
}
</script>

<style scoped lang="scss">
@import "../assets/variables.scss";

.background {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0px;
  backdrop-filter: blur(10px);
  align-items: center;
  display: flex;
  .modal {
    margin: auto;
    width: 60em;
    height: 40em;
    background: $white 0% 0% no-repeat padding-box;
    border: 5px solid $black;
    border-radius: 30px;
    display: flex;
    flex-direction: column;
    .head {
      text-align: center;
      padding: 1em;
      font-size: 4em;
    }
    .content {
      display: flex;
      justify-content: center;
      margin: auto;
    }
  }
  .disconnect {
    border: none;
    padding: 0.8em 3em;
    background: $red 0% 0% no-repeat padding-box;
    box-shadow: $size-shadow $red;
    border-radius: 6px;
    color: $white;
    font-weight: bold;
  }
  .button {
    .valider {
      border: none;
      padding: 0.8em 3em;
      background: $black 0% 0% no-repeat padding-box;
      box-shadow: $size-shadow $black-shadow;
      border-radius: 6px;
      color: $white;
      font-weight: bold;
    }
    .annuler {
      border: 2px solid $black;
      border-radius: 10px;
      background-color: $white;
      font-weight: 700;
      padding: 0.8em 2em;
      margin: auto;
    }
  }
}
</style>

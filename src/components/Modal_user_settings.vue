<template>
  <div class="background" @click.self="$store.dispatch(`toogleModalUserSettings`)">
    <div class="modal">
      <div class="head">
        <h1>User Settings</h1>
      </div>
      <div class="content">
        <div class="input">
          <p>Name</p>
          <input type="text" :placeholder="user.name">
        </div>
        <div class="input">
          <p>Email</p>
          <input type="email" :placeholder="user.email">
        </div>
        <div class="input">
          <p v-if="!changePasseword" @click="changePasseword = !changePasseword">
            Change My Password
          </p>
          <p v-if="changePasseword" @click="changePasseword = !changePasseword">
            Close
          </p>
        </div>
        <div v-show="changePasseword">
          <div class="input">
            <p>Password</p>
            <input type="password" placeholder="••••••••">
          </div>
          <div class="input">
            <p>New Password</p>
            <input type="password" placeholder="••••••••">
          </div>
          <div class="input">
            <p>New Password</p>
            <input type="password" placeholder="••••••••">
          </div>
        </div>
      </div>
      <button class="disconnect" @click="disconnect">
        Disconnect
      </button>
      <div class="button">
        <button class="valider" @click="$store.dispatch('toogleFeature')">
          Change
        </button>
        <button class="annuler" @click="$store.dispatch(`toogleModalUserSettings`)">
          Annuler
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return { changePasseword: false }
  },
  computed: {
    ...mapState({
      user: state => state.auth.user
    })
  },
  methods: {
    disconnect () {
      this.$store.dispatch('toogleModalUserSettings')
      this.$store.dispatch('auth/disconnect')
    }
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
      flex-direction: column;
      margin: auto;
      .input {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        input {
          border: 3px solid #949497;
          border-radius: 10px;
          padding: 0.5em;
          margin: 0.5em;
        }
      }
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
    justify-content: center;
    display: flex;
    width: 10em;
    margin: 1em auto;
  }
  .button {
    justify-content: center;
    display: flex;
    margin: 1em 0 2em 0;
    .valider {
      border: none;
      padding: 0.8em 3em;
      background: $black 0% 0% no-repeat padding-box;
      box-shadow: $size-shadow $black-shadow;
      border-radius: 6px;
      color: $white;
      font-weight: bold;
      margin-right: 2em;
    }
    .annuler {
      border: 2px solid $black;
      border-radius: 10px;
      background-color: $white;
      font-weight: 700;
      padding: 0.8em 2em;
    }
  }
}
</style>

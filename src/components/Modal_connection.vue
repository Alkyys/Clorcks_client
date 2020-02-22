<template>
  <div class="background" @click.self="$store.dispatch(`openModal_connection`)">
    <div class="modal">
      <div class="head">
        <div>Sign Up</div>
        <div>Log In</div>
      </div>
      <div class="separator">
        <div class="separator_signup"></div>
        <div class="separator_login"></div>
      </div>

      <form @submit="checkConnection">
        <input id="input_email" v-model="email" type="email" placeholder="email" />
        <input id="input_password" v-model="password" type="password" placeholder="password" />
        <p>Forgot password?</p>
        <input type="submit" value="Log in" />
      </form>
      <!-- <div class="input">
        <div class="input_email">
          <img src="../assets/logo/mail.svg" alt />
          <input type="email" name id="input_email" placeholder="email" />
        </div>
        <div class="input_password">
          <img src="../assets/logo/lock.svg" alt />
          <input type="password" name id="input_password" placeholder="password" />
        </div>
        <p>Forgot password?</p>
      </div>-->

      <div>
        <button class="button" @click="$store.dispatch(`connection`)">Log In</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      errors: [],
      email: null,
      password: null
    }
  },
  methods: {
    checkConnection: function (e) {
      axios
        .post('https://clorcks.herokuapp.com/user/login', {
          email: this.email,
          password: this.password
        })
        .then(function (response) {
          console.log(response)
          // TODO: store undefined
          this.$store.dispatch(`connection`)
        })
        .catch(function (error) {
          console.error(error)
        })
      e.preventDefault()
    }
  }
}
</script>

<style scoped lang="scss">
.background {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  align-items: center;
  display: flex;
  .modal {
    margin: auto;
    width: 23em;
    height: 30em;
    background: #ffffff 0% 0% no-repeat padding-box;
    border: 5px solid #000000;
    border-radius: 30px;
    .head {
      padding: 2em 5em 0.5em 5em;
      display: flex;
      justify-content: space-between;
      :last-child {
        font-weight: bold;
      }
    }
    .separator {
      display: flex;
      align-items: center;
      .separator_signup {
        background-color: grey;
        height: 1px;
        margin: 1em 0px 1em 1em;
        width: 45%;
        border-radius: 3px;
      }
      .separator_login {
        background-color: #08080e;
        height: 4px;
        width: 45%;
        margin: 1em 0px 1em 0px;
        border-radius: 3px;
      }
    }
    .input {
      display: flex;
      flex-direction: column;
      margin: 4em 0px 5em 0px;
      .input_email {
        display: flex;
        margin: 1em 3em;
        border: 3px solid #949497;
        border-radius: 10px;
        padding: 0.5em;
      }
      .input_password {
        display: flex;
        margin: 1em 3em 0px 3em;
        border: 3px solid #949497;
        border-radius: 10px;
        padding: 0.5em;
      }
      input {
        color: #949497;
        margin-left: 0.5em;
        border: none;
      }
      p {
        justify-content: flex-end;
        margin: 0.5em 3em 0px 0px;
        color: #949497;
        font-weight: 400;
      }
    }
    :last-child {
      display: flex;
      justify-content: center;
      .button {
        border: none;
        padding: 0.8em 4em;
        background: #08080e 0% 0% no-repeat padding-box;
        box-shadow: 1px 1px 10px #08080e69;
        border-radius: 6px;
        color: white;
        font-weight: bold;
      }
    }
  }
}
</style>

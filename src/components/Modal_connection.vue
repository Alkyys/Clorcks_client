<template>
  <div class="background" @click.self="$store.dispatch(`openModal_connection`)">
    <div class="modal_log_in" v-show="!this.$store.state.modalConnection_signup">
      <div class="head">
        <div @click="$store.dispatch(`chooseConnection`,true)">Sign Up</div>
        <div @click="$store.dispatch(`chooseConnection`,false)">Log In</div>
      </div>
      <div class="separator">
        <div class="separator_signup"></div>
        <div class="separator_login"></div>
      </div>

      <form @submit="checkConnection" class="input">
        <div class="input_email">
          <img src="../assets/logo/mail.svg" alt />
          <input v-model="email" type="email" placeholder="email" />
        </div>
        <div class="input_password">
          <img src="../assets/logo/lock.svg" alt />
          <input v-model="password" type="password" placeholder="password" />
        </div>
        <p>Forgot password?</p>
        <input class="button" type="submit" value="Log in" />
      </form>
    </div>
    <div class="modal_sign_in" v-show="this.$store.state.modalConnection_signup">
      <div class="head">
        <div @click="$store.dispatch(`chooseConnection`,true)">Sign Up</div>
        <div @click="$store.dispatch(`chooseConnection`,false)">Log In</div>
      </div>
      <div class="separator">
        <div class="separator_signup"></div>
        <div class="separator_login"></div>
      </div>

      <form @submit="checkSignUp" class="input">
        <div class="input_email">
          <img src="../assets/logo/user.svg" alt />
          <input v-model="name" type="text" placeholder="Name" />
        </div>
        <div class="input_email">
          <img src="../assets/logo/mail.svg" alt />
          <input v-model="email_signup" type="email" placeholder="Email" />
        </div>
        <div class="input_password">
          <img src="../assets/logo/lock.svg" alt />
          <input v-model="password1" type="password" placeholder="Password" />
        </div>
        <div class="input_password">
          <img src="../assets/logo/lock.svg" alt />
          <input v-model="password2" type="password" placeholder="Password again" />
        </div>
        <p>Need Help?</p>
        <input class="button" type="submit" value="Sign in" />
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      errors: [],
      email: 'Samuel@gmail.com',
      password: '123soleil',
      name: `null`,
      password1: `null123`,
      password2: `null123`,
      email_signup: `null@gmail.com`
    }
  },
  methods: {
    checkConnection: function (e) {
      axios
        .post('https://clorcks.herokuapp.com/user/login', {
          email: this.email,
          password: this.password
        })
        .then(response => {
          console.log(response.data.message)
          this.$store.dispatch(`connection`, response.data.token)
        })
        .catch(function (error) {
          console.error(error)
        })
      e.preventDefault()
    },
    checkSignUp: function (e) {
      console.log('user :', {
        name: this.name,
        email_signup: this.email_signup,
        password1: this.password1,
        password2: this.password2
      })
      if (this.password1 === this.password2) {
        axios
          .post(' http://localhost:3000/user/signup', {
            name: this.name,
            email: this.email_signup,
            password: this.password1
          })
          .then(response => {
            console.log(response)
            // this.$store.dispatch(`connection`, response.data.token)
          })
          .catch(function (error) {
            console.error(error)
          })
      } else {
        console.log(`password invalid`)
      }
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
  .modal_log_in {
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
      margin: 4em 0px 0 0px;
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
        align-self: flex-end;
        margin: 0.5em 3em 0px 0px;
        color: #949497;
        font-weight: 400;
      }
      input[type="submit"] {
        align-self: center;
        margin: 4.5rem;
      }
    }
    :last-child {
      display: flex;
      justify-content: center;
      .button {
        border: none;
        padding: 0.8em 3em;
        background: #08080e 0% 0% no-repeat padding-box;
        box-shadow: 1px 1px 10px #08080e69;
        border-radius: 6px;
        color: white;
        font-weight: bold;
      }
    }
  }
  .modal_sign_in {
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
      .separator_login {
        background-color: grey;
        height: 1px;
        margin: 1em 0px 1em 0px;
        width: 45%;
        border-radius: 3px;
      }
      .separator_signup {
        background-color: #08080e;
        height: 4px;
        width: 45%;
        margin: 1em 0px 1em 1em;
        border-radius: 3px;
      }
    }
    .input {
      display: flex;
      flex-direction: column;
      margin: 0.5em 0px 0 0px;
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
        align-self: flex-end;
        margin: 0.5em 3em 0px 0px;
        color: #949497;
        font-weight: 400;
      }
      input[type="submit"] {
        align-self: center;
        margin-top: 1rem;
      }
    }
    :last-child {
      display: flex;
      justify-content: center;
      .button {
        border: none;
        padding: 0.8em 3em;
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

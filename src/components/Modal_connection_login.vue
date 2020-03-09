<template>
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
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      errors: [],
      email: `Samuel@gmail.com`,
      password: `123soleil`,
      name: null,
      password1: null,
      password2: null,
      email_signup: null
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
          this.$store.dispatch(`connection`, response.data.token)
          this.$store.dispatch(`loadMyWokspaces`, response.data.user_id)
        })
        .catch(function (error) {
          console.error(error)
        })
      e.preventDefault()
    },
    checkSignUp: function (e) {
      console.log('checkSignUp -> user :', {
        name: this.name,
        email_signup: this.email_signup,
        password1: this.password1,
        password2: this.password2
      })
      if (this.password1 === this.password2) {
        console.log(`password ok 👌`)
        axios
          .post('https://clorcks.herokuapp.com/user/signup', {
            name: this.name,
            email: this.email_signup,
            password: this.password1
          })
          .then(response => {
            console.log('TCL: response', response)
            this.$store.dispatch(`connection`, response.data.token)
            this.$store.dispatch(`loadMyWokspaces`, response.data.user_id)
          })
          .catch(error => {
            console.error(error)
            this.$store.dispatch(`toogle_error`)
          })
      } else {
        console.log(`password invalid`)
      }
      e.preventDefault()
    }
  }
}
</script>

<style lang="scss" scoped>
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
</style>

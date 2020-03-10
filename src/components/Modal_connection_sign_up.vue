<template>
  <form @submit="checkSignUp" class="input">
    <div class="input_email">
      <img src="../assets/logo/user.svg" alt />
      <input v-model="name" type="text" placeholder="Name" />
    </div>
    <div class="input_email">
      <img src="../assets/logo/mail.svg" alt />
      <input v-model="email" type="email" placeholder="Email" />
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
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      errors: [],
      name: null,
      password1: null,
      password2: null,
      email: null
    }
  },
  methods: {
    checkSignUp: function (e) {
      this.$store.dispatch('auth/signUp', {
        name: this.name,
        email: this.email,
        password1: this.password1,
        password2: this.password2
      })
    }
  }
}
</script>

<style scoped lang="scss">
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
</style>

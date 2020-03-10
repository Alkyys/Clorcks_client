<template>
  <form @submit.prevent="checkConnection" class="input">
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
      password: `123soleil`
    }
  },
  methods: {
    checkConnection: function () {
      this.$store.dispatch('auth/login', {
        email: this.email,
        password: this.password
      })
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

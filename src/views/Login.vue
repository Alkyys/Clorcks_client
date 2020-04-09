<template>
    <form @submit.prevent="checkConnection" class="input">
      <p v-if="hasError" class="text-error">Certaines de vos informations sont incorrectes. Réessayez.</p>
      <div>
        <div class="input_email" :class="{ 'error': hasError }">
          <img src="../assets/logo/mail.svg" alt />
          <input v-model="email" type="email" placeholder="email" />
        </div>
        <div class="input_password" :class="{ 'error': hasError }">
          <img src="../assets/logo/lock.svg" alt />
          <input v-model="password" type="password" placeholder="password" />
        </div>
        <p>Forgot password?</p>
      </div>
      <input class="button" type="submit" value="Log in" />
    </form>
</template>

<script>
export default {
  data () {
    return {
      hasError: false,
      email: 'Samuelvgnl@gmail.com',
      password: '123soleil'
    }
  },
  methods: {
    checkConnection: function () {
      this.$store
        .dispatch('auth/login', {
          email: this.email,
          password: this.password
        })
        .then(result => {})
        .catch(err => {
          console.log('🐛: err', err)
          this.hasError = true
        })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";

.text-error{
  color: $red !important;
  text-align: center;
}
.error {
  border-color: $red !important;
  animation: shake 1s;
}

@-webkit-keyframes shake {
  from,
  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }

  10%,
  30%,
  50%,
  70%,
  90% {
    -webkit-transform: translate3d(-10px, 0, 0);
    transform: translate3d(-10px, 0, 0);
  }

  20%,
  40%,
  60%,
  80% {
    -webkit-transform: translate3d(10px, 0, 0);
    transform: translate3d(10px, 0, 0);
  }
}

@keyframes shake {
  from,
  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }

  10%,
  30%,
  50%,
  70%,
  90% {
    -webkit-transform: translate3d(-10px, 0, 0);
    transform: translate3d(-10px, 0, 0);
  }

  20%,
  40%,
  60%,
  80% {
    -webkit-transform: translate3d(10px, 0, 0);
    transform: translate3d(10px, 0, 0);
  }
}

.shake {
  -webkit-animation-name: shake;
  animation-name: shake;
}

.input {
  display: flex;
  flex-direction: column;
  margin: 4em 0px 0 0px;
  .input_email {
    display: flex;
    margin: 1em 3em;
    border: 3px solid $grey;
    border-radius: 10px;
    padding: 0.5em;
  }
  .input_password {
    display: flex;
    margin: 1em 3em 0px 3em;
    border: 3px solid $grey;
    border-radius: 10px;
    padding: 0.5em;
  }
  input {
    color: $grey;
    margin-left: 0.5em;
    border: none;
  }
  p {
    align-self: flex-end;
    margin: 0.5em 2em 0px 0px;
    color: $grey;
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
    background: $black 0% 0% no-repeat padding-box;
    box-shadow: $size-shadow $black-shadow;
    border-radius: 6px;
    color: $white;
    font-weight: bold;
  }
}
</style>

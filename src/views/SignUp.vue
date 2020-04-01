<template>
  <form @submit.prevent="checkSignUp" class="input">
    <div class="input_email" :class="{ error: hasError }">
      <img src="../assets/logo/user.svg" alt />
      <input v-model="name" type="text" placeholder="Name" />
    </div>
    <div class="input_email" :class="[hasMailExist || hasError ? 'error' : '']">
      <img src="../assets/logo/mail.svg" alt />
      <input v-model="email" type="email" placeholder="Email" />
    </div>

    <div class="input_password" :class="[hasDifferentPassword || hasError ? 'error' : '']">
      <img src="../assets/logo/lock.svg" alt />
      <input v-model="password1" type="password" placeholder="Password" />
    </div>
    <div class="input_password" :class="[hasDifferentPassword || hasError ? 'error' : '']">
      <img src="../assets/logo/lock.svg" alt />
      <input v-model="password2" type="password" placeholder="Password again" />
    </div>

    <p>Need Help?</p>
    <input class="button" type="submit" value="Sign in" />
  </form>
</template>

<script>
export default {
  data () {
    return {
      hasDifferentPassword: false,
      hasMailExist: false,
      hasError: false,
      name: null,
      password1: null,
      password2: null,
      email: null
    }
  },
  methods: {
    checkSignUp: function ({ dispatch }, e) {
      this.hasMailExist = false
      this.hasError = false
      this.hasDifferentPassword = false
      if (
        this.password1 === null ||
        this.password2 === null ||
        this.name === null ||
        this.email === null ||
        this.password1 === undefined ||
        this.password2 === undefined ||
        this.name === undefined ||
        this.email === undefined
      ) {
        this.hasError = true
      } else {
        if (this.password1 === this.password2) {
          console.log(`✅✅✅`)
          this.$store
            .dispatch('auth/signUp', {
              name: this.name,
              email: this.email,
              password: this.password1
            })
            .then(result => {
              alert(`Compte cree`)
              this.$router.push({ name: 'login' })
            })
            .catch(err => {
              console.log('🐛: err', err)
              if (err.status === 409) {
                this.hasMailExist = true
              } else {
                this.hasError = true
                dispatch('toogle_error', null, { root: true })
              }
            })
        } else {
          this.hasDifferentPassword = true
          console.log(
            '🐛: this.hasDifferentPassword',
            this.hasDifferentPassword
          )
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "../assets/variables.scss";

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
  margin: 0.5em 0px 0 0px;
  .input_email {
    display: flex;
    margin: 1em 3em 0px 3em;
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
    color: #949497;
    margin-left: 0.5em;
    border: none;
  }
  p {
    align-self: flex-end;
    margin: 0.5em 3em 0px 0px;
    color: $grey;
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
    background: $black 0% 0% no-repeat padding-box;
    box-shadow: $size-shadow $black-shadow;
    border-radius: 6px;
    color: white;
    font-weight: bold;
  }
}
</style>

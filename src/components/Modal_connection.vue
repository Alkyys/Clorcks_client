<template>
  <div class="background" @click.self="$router.push({ name: 'home' })">
    <div class="container">
      <div class="head">
        <router-link :to="{ name: 'sign-up' }">Sign Up</router-link>
        <router-link :to="{ name: 'login' }">Log In</router-link>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

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
}

.head {
  margin: 0 1em;
  display: flex;
  flex-direction: row;
  justify-content: center;

  a {
    position: relative;
    flex-grow: 1;
    text-decoration: none;
    text-align: center;
    color: #08080e;
    padding: 2em 0;
    outline: none;

    &::after  {
      content: '';
      position: absolute;
      width: 100%;
      height: 1px;
      bottom: 0;
      left: 0;
      background: grey;
      border-radius: 3px;
    }

    &.router-link-active::after {
        background: #08080e;
        height: 5px;
        bottom: -2px;
    }
  }
}

.container {
  margin: auto;
  width: 23em;
  height: 30em;
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 5px solid #000000;
  border-radius: 30px;
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

// Hold

.background {
  .modal_sign_in {
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

  }
}
</style>

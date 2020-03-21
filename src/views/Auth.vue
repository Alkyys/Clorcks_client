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
@import "@/assets/variables.scss";

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
    color: $black;
    padding: 2em 0;
    outline: none;

    &::after {
      content: "";
      position: absolute;
      width: 100%;
      height: 1px;
      bottom: 0;
      left: 0;
      background: $grey;
      border-radius: 3px;
    }

    &.router-link-active::after {
      background: $black;
      height: 5px;
      bottom: -2px;
    }
  }
}

.container {
  margin: auto;
  width: 23em;
  height: 30em;
  background: $white 0% 0% no-repeat padding-box;
  border: 5px solid $black;
  border-radius: 30px;
}
</style>

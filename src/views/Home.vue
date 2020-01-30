<template>
  <div class="home">
    <div id="head">
      Head Head Head Head Head Head Head Head Head Head Head Head Head Head Head Head
      <div id="logo">Mon logo</div>
      <div id="bouton">
        <div id="bouton_signup">signup</div>
        <div id="bouton_login">login</div>
      </div>
    </div>

    <div id="title">Use Clorcks for beautiful colors</div>

    <div id="bodycard">Card</div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: "home",
  components: {
    // HelloWorld
  }
};
</script>

<style  lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column
}
#head {
  background-color: grey;
}
</style>

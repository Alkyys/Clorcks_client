<template>
  <div class="home">
    <div id="head">
      <div id="logo">
        <img src="../assets/logo/Logo complet.svg" alt="logo de clorcks" />
      </div>

      <div id="bouton">
        <div id="bouton_signup">Sign up</div>
        <div id="bouton_login">Log in</div>
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
  flex-direction: column;
}
#head {
  display: flex;
  justify-content: space-between;
  #logo {
    padding-left: 1em; 
  }
  #bouton {
    display: flex;
    align-items: center;
    padding-right: 1em;
    #bouton_signup {
      padding: 0.8em 2em;
      background: #08080e 0% 0% no-repeat padding-box;
      border-radius: 6px;
      color: white;
    }
    #bouton_login {
      padding: 0.8em 2em;
    }
  }
}

#title {
  display: flex;
  justify-content: center;
  font-size: 4.5em;
  padding: 1em 0em;
}
</style>

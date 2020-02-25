<template>
  <div class="home">
    <div class="head">
      <div class="logo">
        <img src="../assets/logo/Logo complet.svg" alt="logo de clorcks" />
      </div>

      <div v-if="!this.$store.state.connected" class="bouton">
        <button class="bouton_signup">Sign up</button>
        <button class="bouton_login" @click="$store.dispatch(`openModal_connection`)">Log in</button>
      </div>

      <div v-if="this.$store.state.connected" class="user">
        <div @click="$store.dispatch(`connection`)">{{this.$store.state.user.name}}</div>
        <button class="workspace">Google</button>
        <img src="../assets/logo/user.svg" alt />
      </div>
    </div>

    <div class="title">Use Clorcks for beautiful colors</div>

    <button
      class="create"
      v-if="this.$store.state.connected"
      @click="$store.dispatch(`openModal_creation`)"
    >New</button>

    <div class="bodycard">
      <div class="subtitle">
        <div class="subsubtitle">Explore</div>
        <ul class="liste">
          <li>Type</li>
          <li>Popular</li>
          <li>Recent</li>
          <li>Rainbow</li>
          <li>
            <img src="../assets/logo/more.svg" alt />
          </li>
        </ul>
      </div>
      <div class="card">
        <Cards />
      </div>
    </div>
    <ModalConnection v-if="this.$store.state.modalConnection" />
    <ModalChoose v-if="this.$store.state.modalChooseCreation" />
  </div>
</template>

<script>
// import de composant
import Cards from '../components/Cards.vue'
import ModalConnection from '../components/Modal_connection.vue'
import ModalChoose from '../components/Modal_choose.vue'

export default {
  data () {
    return {}
  },
  name: 'home',
  components: {
    Cards,
    ModalConnection,
    ModalChoose
  }
}
</script>

<style  lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  font-weight: 700;
}
.head {
  display: flex;
  justify-content: space-between;
  .logo {
    padding-left: 1em;
  }
  .bouton {
    display: flex;
    align-items: center;
    padding-right: 2em;
    .bouton_signup {
      border: none;
      font-weight: 700;
      padding: 0.8em 2em;
      background: #08080e 0% 0% no-repeat padding-box;
      border-radius: 6px;
      color: white;
    }
    .bouton_login {
      background-color: white;
      border: none;
      font-weight: 700;
      padding: 0.8em 2em;
    }
  }
  .user {
    display: flex;
    align-items: center;
    padding-right: 2em;
    font-weight: bold;
    .workspace {
      border: none;
      color: white;
      font-weight: 700;
      padding: 0.8em 2em;
      background: #f85f73 0% 0% no-repeat padding-box;
      box-shadow: 1px 1px 10px #f85f736e;
      border-radius: 5px;
      margin: 0px 1rem;
    }
  }
}

.title {
  display: flex;
  justify-content: center;
  font-size: 4.5em;
  padding: 1em 0em;
}

.create {
  border: none;
  background: transparent linear-gradient(97deg, #2d3561 0%, #c05c7e 100%) 0% 0%
    no-repeat padding-box;
  box-shadow: 1px 1px 30px #784970;
  border-radius: 6px;
  color: white;
  font-weight: 700;
  font-size: 2rem;
  padding: 0.8rem 6rem;
  margin: 0px auto 2rem auto;
}

.bodycard {
  padding: 0px 5rem;
  .subtitle {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .subsubtitle {
      font-weight: 800;
      font-size: 2rem;
      letter-spacing: 0.14px;
    }
    .liste {
      display: flex;
      li {
        padding: 0px 0.5rem;
      }
    }
  }
}
</style>

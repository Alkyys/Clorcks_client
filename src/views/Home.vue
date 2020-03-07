<template>
  <div class="home">
    <div class="head">
      <div class="logo">
        <img src="../assets/logo/Logo complet.svg" alt="logo de clorcks" />
      </div>

      <div v-if="!this.$store.state.connected" class="bouton">
        <button class="bouton_signup" @click="$store.dispatch(`openModal_connection`,true)">Sign up</button>
        <button class="bouton_login" @click="$store.dispatch(`openModal_connection`,false)">Log in</button>
      </div>

      <div v-if="this.$store.state.connected" class="user">
        <div @click="$store.dispatch(`connection`)">{{this.$store.state.user.name}}</div>
        <button class="workspace" @click="$store.dispatch(`toogle_modal_worspace`)">Google</button>
        <img src="../assets/logo/user.svg" alt />
      </div>
    </div>

    <div class="title">Use Clorcks for beautiful colors</div>

    <button
      class="glow-on-hover"
      v-if="this.$store.state.connected"
      @click="$store.dispatch(`toogleModalChooseCreation`)"
    >Create New</button>

    <div class="bodycard" v-if="this.$store.state.connected">
      <div class="subtitle">
        <div class="subsubtitle">My Collection</div>
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
        <Cards :my="true" />
      </div>
    </div>
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
        <Cards :my="false" />
      </div>
    </div>
    <ModalConnection v-if="this.$store.state.modalConnection" />
    <ModalChoose v-if="this.$store.state.modalChooseCreation" />
    <ModalCreationColor v-if="this.$store.state.modalCreationColor" />
    <ModalCreationPalette v-if="this.$store.state.modalCreationPalette" />
    <ModalCreationGradient v-if="this.$store.state.modalCreationGradient" />
    <ModalWorkspace v-if="this.$store.state.modalWorkspace" />
  </div>
</template>

<script>
// import de composant
import Cards from '../components/Cards.vue'
import ModalConnection from '../components/Modal_connection.vue'
import ModalChoose from '../components/Modal_choose.vue'
import ModalCreationColor from '../components/Modal_creation_color.vue'
import ModalWorkspace from '../components/Modal_worspace.vue'
import ModalCreationPalette from '../components/Modal_creation_palette.vue'
import ModalCreationGradient from '../components/Modal_creation_gradient.vue'

export default {
  data () {
    return {
      modal: true
    }
  },
  name: 'home',
  components: {
    Cards,
    ModalConnection,
    ModalChoose,
    ModalCreationColor,
    ModalWorkspace,
    ModalCreationPalette,
    ModalCreationGradient
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

// .create {
//   border: none;
//   background: transparent linear-gradient(97deg, #2d3561 0%, #c05c7e 100%) 0% 0%
//     no-repeat padding-box;
//   box-shadow: 1px 1px 30px #784970;
//   border-radius: 6px;
//   color: white;
//   font-weight: 700;
//   font-size: 2rem;
//   padding: 0.8rem 6rem;
//   margin: 0px auto 2rem auto;
// }

.glow-on-hover {
  margin: auto;
  padding: 0.8rem 4rem;
  border: 2px solid #08080e;
  outline: none;
  font-weight: 700;
  font-size: 2rem;
  background: white;
  cursor: pointer;
  position: relative;
  z-index: 0;
  border-radius: 10px;
}

.glow-on-hover:before {
  content: "";
  background: linear-gradient(
    45deg,
    #ff0000,
    #ff7300,
    #fffb00,
    #48ff00,
    #00ffd5,
    #002bff,
    #7a00ff,
    #ff00c8,
    #ff0000
  );
  position: absolute;
  top: -50%;
  left: -40%;
  background-size: 400%;
  z-index: -1;
  filter: blur(40px);
  width: calc(175% + 4px);
  height: calc(200% + 4px);
  animation: glowing 20s linear infinite;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  border-radius: 10px;
}

.glow-on-hover:hover {
  color: white;
  transition: color 0.3s ease-in-out;
  box-shadow: none;
  border: 2px solid white;
}

.glow-on-hover:active {
  color: white;
}

.glow-on-hover:active:after {
  background: transparent;
}

.glow-on-hover:hover:before {
  opacity: 1;
}

.glow-on-hover:after {
  z-index: -1;
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  border-radius: 10px;
}

@keyframes glowing {
  0% {
    background-position: 0 0;
  }
  50% {
    background-position: 400% 0;
  }
  100% {
    background-position: 0 0;
  }
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

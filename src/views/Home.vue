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

    <div id="bodycard">
      <div id="subtitle">
        <div id="subsubtitle">Explore</div>
        <ul id="liste">
          <li>Type</li>
          <li>Popular</li>
          <li>Recent</li>
          <li>Rainbow</li>
          <li>
            <img src="../assets/logo/more.svg" alt />
          </li>
        </ul>
      </div>
      <div id="card">
        <Card />
      </div>
    </div>
    <div class="modal">
      <ModalConnection />
    </div>
  </div>
</template>

<script>
// import de composant
import Card from '../components/Card.vue'
import ModalConnection from '../components/Modal_connection.vue'

export default {
  data () {
    return {}
  },
  name: 'home',
  components: {
    Card,
    ModalConnection
  }
}
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

#bodycard {
  padding: 0px 5rem;
  #subtitle {
    display: flex;
    justify-content: space-between;
    align-items: center;
    #subsubtitle {
      font-weight: 800;
      font-size: 2rem;
      letter-spacing: 0.14px;
    }
    #liste {
      display: flex;
      li {
        padding: 0px 0.5rem;
      }
    }
  }
}
</style>

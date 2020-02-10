<template>
  <div class="home">
    <div class="head">
      <div class="logo">
        <img src="../assets/logo/Logo complet.svg" alt="logo de clorcks" />
      </div>

      <div v-if="!conneted" class="bouton">
        <button class="bouton_signup">Sign up</button>
        <button class="bouton_login" @click="modal = !modal">Log in</button>
      </div>
    </div>

    <div class="title">Use Clorcks for beautiful colors</div>

    <button class="create">Create</button>

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
        <Card />
      </div>
    </div>
    <div v-if="modal" class="modal">
      <ModalConnection />
    </div>
  </div>
</template>

<script>
// import de composant
import Card from "../components/Card.vue";
import ModalConnection from "../components/Modal_connection.vue";

export default {
  data() {
    return {
      modal: false,
      connected: false
    };
  },
  name: "home",
  components: {
    Card,
    ModalConnection
  }
};
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
    padding-right: 1em;
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
  box-shadow: 1px 1px 20px #784970;
  border-radius: 6px;
  color: white;
  font-weight: 700;
  font-size: 2rem;
  letter-spacing: 2px;
  padding: 1rem 0px;
  margin:0px auto 2rem auto;
  width: 12rem;
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

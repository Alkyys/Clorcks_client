<template>
  <div class="background">
    <div class="modal">
      <div class="head">
        <div>Sign Up</div>
        <div>Log In</div>
      </div>
      <div class="separator">
        <div class="separator_signup"></div>
        <div class="separator_login"></div>
      </div>
      <div class="input">
        <input type="email" name id="input_email" value="email" />
        <input type="password" name id="input_password" value="password" />
        <p>Forgot password?</p>
      </div>
      <div>
        <button class="button">Log In</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  name: "Modal_connection",
  props: {}
};
</script>

<style scoped lang="scss">
.background {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(30px);
  align-items: center;
  display: flex;
  .modal {
    margin: auto;
    width: 23em;
    height: 30em;
    background: #ffffff 0% 0% no-repeat padding-box;
    border: 5px solid #000000;
    border-radius: 30px;
    .head {
      padding: 2em 5em 1em 5em;
      display: flex;
      justify-content: space-between;
      :last-child {
        font-weight: bold;
      }
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
    .input {
      display: flex;
      flex-direction: column;
      margin: 5em 0px;
      #input_email {
        margin: 1em 3em;
        border: 3px solid #949497;
        border-radius: 10px;
        padding: 0.5em;
      }
      #input_password {
        margin: 1em 3em 0px 3em;
        border: 3px solid #949497;
        border-radius: 10px;
        padding: 0.5em;
      }
      p {
        text-align: end;
        margin-right: 3em;
        color: #949497;
      }
    }
    :last-child {
      .button {
        border: none;
        padding: 0.8em 4em;
        background: #08080e 0% 0% no-repeat padding-box;
        box-shadow: 1px 1px 10px #08080e69;
        border-radius: 6px;
        color: white;
        font-weight: bold;
      }
    }
  }
}
</style>

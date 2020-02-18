<template>
  <div class="background">
    <div class="modal">
      hello
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  name: 'Modal_choose',
  props: {}
}
</script>

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
  .modal {
    margin: auto;
    width: 23em;
    height: 30em;
    background: #ffffff 0% 0% no-repeat padding-box;
    border: 5px solid #000000;
    border-radius: 30px;
  }
}
</style>

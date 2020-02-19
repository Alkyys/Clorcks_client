<template>
  <div class="card">
    <ul>
      <CardColor />
      <CardGradient />
      <CardPalette />
    </ul>
    <!-- TODO: Faire la modal d'option pour chaque Card -->
    <!-- TODO: Faire un systeme de like individuel  -->
    <!-- <div v-if="this.$store.state.option" class="modal"></div> -->
  </div>
</template>

<script>
import CardColor from './CardColor.vue'
import CardGradient from './CardGradient.vue'
import CardPalette from './CardPalette.vue'

export default {
  data () {
    return {}
  },
  name: 'Cards',
  components: {
    CardColor,
    CardGradient,
    CardPalette
  }
}
</script>

<style scoped lang="scss">
.card {
  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 2rem 0px;
  }
}

.modal {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0px;
  left: 0px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(30px);
}
</style>

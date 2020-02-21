<template>
  <div class="card">
    <ul>
      <template v-for="item in items">
        <CardItem :key="item._id" :item="item" />
      </template>
    </ul>
    <!-- TODO: Faire la modal d'option pour chaque Card -->
    <!-- <div v-if="this.$store.state.option" class="modal"></div> -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CardItem from './CardItem.vue'

export default {
  data () {
    return {}
  },
  name: 'Cards',
  components: {
    CardItem
  },
  props: {
  },
  mounted () {
    this.$store.dispatch(`loadContent`)
  },
  computed: {
    ...mapState(['items'])
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

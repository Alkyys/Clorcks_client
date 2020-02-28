<template>
  <div class="card">
    <ul v-if="my">
      <div v-if="!myitems[0].gradients_id" style="font-size: 4rem;">Nous avons rien trouvé 🤷‍♂️</div>
      <template v-for="item in myitems[0].gradients_id">
        <CardItem :key="item._id" :item="item" />
      </template>
      <template v-for="item in myitems[0].colors_id">
        <CardItem :key="item._id" :item="item" />
      </template>
      <template v-for="item in myitems[0].palettes_id">
        <CardItem :key="item._id" :item="item" />
      </template>
    </ul>
    <ul v-else>
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
    my: {
      type: Boolean,
      required: true
    }
  },
  mounted () {
    console.log('TCL: mounted -> this.my', this.my)
    if (this.my) {
      this.$store.dispatch(`loadMyWokspace`, this.$store.state.user.user_id)
    } else {
      this.$store.dispatch(`loadContent`)
    }
  },
  computed: {
    ...mapState(['items']),
    ...mapState(['myitems'])
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

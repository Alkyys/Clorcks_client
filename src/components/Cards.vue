<template>
  <div class="card">
    <ul v-if="my">
      <template v-for="item in myitems">
        <CardItem :key="item._id" :item="item" />
      </template>
    </ul>
    <ul v-else>
      <template v-for="item in items">
        <CardItem :key="item._id" :item="item" />
      </template>
    </ul>
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
      this.$store.dispatch(`loadMyWokspace`, this.$store.state.auth.user.user_id)
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

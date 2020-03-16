<template>
  <CollectionListView label="Explore" :items="items" />
</template>

<script>
import { mapGetters } from 'vuex'

import CollectionListView from '@/components/CollectionListView'

export default {
  components: {
    CollectionListView
  },

  computed: {
    ...mapGetters({
      items: 'explore/all'
    })
  },

  mounted () {
    this.$store.dispatch('explore/load')
  }
}
</script>

<template>
  <CollectionListView label="My Collection" :items="items" :my="true"/>
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
      items: 'workspacejam/items'
    })
  },

  mounted () {
    this.$store.dispatch('workspacejam/loadItems')
  }
}
</script>

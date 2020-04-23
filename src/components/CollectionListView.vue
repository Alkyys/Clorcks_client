<template>
  <div class="collection-list-view">
    <div class="subtitle">
      <div class="subsubtitle">{{ label }}</div>
      <ul class="liste">
        <template v-for="sortType in sortTypes">
          <li :key="sortType" @click="changeSortType(sortType)">{{ sortType }}</li>
        </template>
        <li>
          <img src="../assets/logo/more.svg" alt />
        </li>
      </ul>
    </div>
    <transition-group name="flip-list" tag="ul" class="items">
      <template v-for="item in sortedItems">
        <CardItem :key="item._id" :item="item" :my="my" />
      </template>
    </transition-group>
  </div>
</template>

<script>
import CardItem from '@/components/CardItem'

export default {
  props: {
    label: {
      type: String,
      required: true
    },
    items: {
      type: Array,
      required: true
    },
    my: {
      type: Boolean,
      required: true
    }
  },

  components: {
    CardItem
  },

  data () {
    return {
      activeSortType: 'Recent'
    }
  },

  computed: {
    sortTypes () {
      return ['Type', 'Popular', 'Recent', 'Random']
    },
    sortedItems () {
      switch (this.activeSortType) {
        // permet de trier items par leurs likes
        case 'Popular':
          return this.items.slice().sort((a, b) => b.likeCount - a.likeCount)
        // permet de trier mes items par leurs date
        case 'Recent':
          return this.items
            .slice()
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        // permet de melanger les items
        case 'Random':
          return this.items.slice().sort((a, b) => 0.5 - Math.random())
        default:
          return this.items
      }
    }
  },

  methods: {
    changeSortType (newType) {
      this.activeSortType = newType
    }
  }
}
</script>

<style lang="scss" scoped>
.flip-list-move {
  transition: transform 1s;
}

.collection-list-view {
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

ul.items {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 2rem 0px;
}
</style>

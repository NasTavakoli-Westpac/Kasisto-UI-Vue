<template>
<div>
    <ListView v-if="!this.useGroupedListMode" :response="this.response"></ListView>
    <ListViewGrouped v-if="this.useGroupedListMode" :response="this.response"></ListViewGrouped>
</div>
</template>

<script>
import ListView from './ListView'
import ListViewGrouped from './ListViewGrouped'
export default {
  name: 'ListViewBase',
  data () {
    return {
      useGroupedListMode: window.$store.getters.getGroupedListMode,
      response: this.$slots
    }
  },
  components: {
    ListView,
    ListViewGrouped
  }
}
</script>

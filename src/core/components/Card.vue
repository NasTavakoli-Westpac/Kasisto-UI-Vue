<template>
<section style="height:100%;">
    <CardItem v-if="item.type === 'CARD'" :item="this.item" :index="index" :containSmallImage="this.containSmallImage"></CardItem>
    <Custom v-else-if="item.type === 'CUSTOM'" :item="this.item.payload" :index="index"></Custom>
    <MediumSingle v-else-if="item.type === 'MEDIUM'" :medium="this.item" :index="index"></MediumSingle>
</section>
</template>

<script>
import CardItem from './CardItem'
import Custom from './Custom'
import MediumSingle from './MediumSingle'

export default {
  name: 'Card',
  props: ['item', 'index', 'containSmallImage'],
  components: {
    CardItem,
    Custom,
    MediumSingle
  }
}
</script>

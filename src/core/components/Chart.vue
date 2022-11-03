<template>
<div>
   <MediumLineChart v-if="this.chartData.type === 'LINECHART'" :chartData='this.chartData'></MediumLineChart>
</div>
</template>

<script>
import MediumLineChart from './MediumLineChart'

export default {
  name: 'Chart',
  props: ['item'],
  components: {
    MediumLineChart
  },
  mixins: [

  ],
  data () {
    return {
      chartData: this.$props.item.data

    }
  },
  mounted () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style>
</style>

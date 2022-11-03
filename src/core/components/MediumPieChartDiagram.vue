<template>
<div class="kai-card-piechart">
    <div id="chart-wrap">
        <apexcharts id="chart" :width="cardWidth" heigth="auto" type="pie" :options="options" :series="series" @click="onChartClickEvent" @mounted="onChartMountedEvent" ref="chart">

        </apexcharts>
    </div>
</div>
</template>

<script>
import MediumMixin from './Mixin/MediumMixin'
import MediumPieChartMixin from './Mixin/MediumPieChartMixin'
import VueApexCharts from 'vue-apexcharts'
import './styles/Medium.less'

export default {
  name: 'MediumPieChartDiagram',
  data () {
    return {
      cardWidth: getComputedStyle(document.querySelector('.webview--app')).getPropertyValue('--card-item-width').slice(0, -2)
    }
  },
  components: {
    apexcharts: VueApexCharts
  },
  props: ['medium'],
  mixins: [
    MediumMixin,
    MediumPieChartMixin
  ]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

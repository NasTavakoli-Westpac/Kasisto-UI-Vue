<template>
  <div class="kai-card-text-container">
        <!-- TITLE -->
        <div v-if="this.medium.chart_data.title" class="kai-medium-title" v-html="this.medium.chart_data.title"></div>

        <div class="kai-medium-legend-container">
            <div class="kai-medium-legend-item" v-for="(item, index) in this.medium.chart_data.items" :key="index" v-on:click="toggleSeries(item.name, index)">
                <div class="kai-medium-legend-left">
                    <div class="kai-medium-legend-color" v-if="options" v-bind:style="{background: options.colors[index]}" :class="{active: selectedItem==index}"></div>
                    <div class="kai-medium-legend-text" v-html="item.name"></div>
                </div>
                <div class="kai-medium-legend-right" v-html="item.label"></div>
            </div>
        </div>
    </div>
</template>

<script>
import MediumMixin from './Mixin/MediumMixin'
import MediumPieChartMixin from './Mixin/MediumPieChartMixin'
import './styles/Medium.less'

export default {
  name: 'MediumPieChartLegend',
  props: ['medium'],
  mixins: [
    MediumMixin,
    MediumPieChartMixin
  ],
  computed: {
    selectedItem () {
      return this.$parent.selectedPieChartItem
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

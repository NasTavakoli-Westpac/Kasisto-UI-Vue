<template>
<section class="kai-card-medium" navDir="vertical">
    <MediumPieChartDiagram @piechartLoaded="mediumLoaded" @selectedItem="selectedPiechartItem" v-if="medium && medium.payload && medium.payload.type == 'PIECHART'" :medium="this.medium.payload"></MediumPieChartDiagram>
    <MediumPieChartDiagram @piechartLoaded="mediumLoaded" @selectedItem="selectedPiechartItem" v-else-if="medium && medium.type && medium.type == 'PIECHART'" :medium="this.medium"></MediumPieChartDiagram>
    <MediumImage @imageLoaded="mediumLoaded" v-else-if="medium
    && (medium.payload
    || (medium.medium_url && medium.medium_url !== ''))" :medium="this.medium">
    </MediumImage>
</section>
</template>

<script>
import MediumPieChartDiagram from './MediumPieChartDiagram'
import MediumImage from './MediumImage'

export default {
  name: 'Medium',
  props: ['medium', 'isExpanded'],
  components: {
    MediumImage,
    MediumPieChartDiagram
  },
  methods: {
    mediumLoaded: function (optionalChartRef) {
      this.$emit('mediumLoaded')
      if (optionalChartRef) {
        this.$emit('piechartMedium', optionalChartRef)
      }
    },
    selectedPiechartItem: function (index) {
      this.$emit('selectedPiechartItem', index)
    }
  }
}
</script>

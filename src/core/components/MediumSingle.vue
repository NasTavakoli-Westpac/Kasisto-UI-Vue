<template>
<section>
    <div class="kai-row"></div>
    <MessageProfileImage v-if="ShowIcon && showMessageProfileImage"  aria-hidden="true"></MessageProfileImage>
    <div v-if="this.response.default && this.response.default.type === 'MEDIUM'" class="kai-card-wraper" tabindex="0">
        <div class="kai-card-item kai-card-medium-item">
            <Medium :medium="this.response.default" @piechartMedium="updateChartReference" @selectedPiechartItem="updateSelectedPiechartItem" :isExpanded="true"></Medium>
            <div class="kai-card-subtitle">
              <MediumPieChartLegend v-if="this.response.default.payload && this.response.default.payload.type && this.response.default.payload.type == 'PIECHART'" :medium="this.response.default.payload"></MediumPieChartLegend>
            </div>
        </div>
    </div>
    <div v-else-if="medium && medium.type === 'MEDIUM'">
        <div class="kai-card-item kai-card-medium-item">
            <Medium  :medium="medium" @piechartMedium="updateChartReference" @selectedPiechartItem="updateSelectedPiechartItem" :isExpanded="true"></Medium>
            <div class="kai-card-subtitle">
              <MediumPieChartLegend v-if="medium.payload && medium.payload.type && medium.payload.type == 'PIECHART'" :medium="medium.payload"></MediumPieChartLegend>
            </div>
        </div>
    </div>
</section>
</template>

<script>
import Medium from './Medium'
import MediumPieChartLegend from './MediumPieChartLegend'
import MediumPieChartMixin from './Mixin/MediumPieChartMixin'
import MessageProfileImage from './MessageProfileImage'

export default {
  name: 'MediumSingle',
  props: ['medium'],
  mounted () {
    this.showMessageProfileImage = !$store.state.useAvatar || $store.getters.isLiveAgentConnected
  },
  data () {
    return {
      response: this.$slots,
      showMessageProfileImage: false
    }
  },
  mixins: [
    MediumPieChartMixin
  ],
  components: {
    Medium,
    MediumPieChartLegend,
    MessageProfileImage
  },
  computed: {
    ShowIcon: function () {
      if (this.payload) {
        if (this.payload.showIcon) {
          return true
        } else {
          return false
        }
      } else {
        // `this` points to the vm instance
        if (this.$slots.default && this.$slots.default.showIcon) {
          return this.$slots.default.showIcon
        } else {
          return false
        }
      }
    }
  },
  methods: {
    updateChartReference (optionalChartRef) {
      if (optionalChartRef) {
        this.$refs.chartRef = optionalChartRef
      }
    }
  }
}
</script>

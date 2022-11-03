<template>
  <section>
      <div class="medium-bar-chart-wrapper" :class="mode" ref="barChartContainer">
        <div class="medium-bar-chart-label-container" :style="labelsTooClose ? 'display:inline-flex;': ''">
          <div class="medium-bar-chart-valueLabel">{{this.valueLabel}}</div>
          <!-- <div class="medium-bar-chart-maxLabel"  :style="labelsTooClose ? 'text-align:left;': ''">{{this.maxLabel}}</div> -->
        </div>
        <div class="medium-bar-chart">
          <div class="medium-bar-chart-value" :style="'width:' + this.valueWidth + 'px;'"></div>
          <div class="medium-bar-chart-max" :style="'width:' + this.maxWidth + 'px;'"></div>
        </div>
        <div class="medium-bar-chart-label-container bottom">
          <!-- <div class="medium-bar-chart-valueLabel" :style="'margin-left:' + (this.valueWidth - 20) + 'px;'">{{this.value}}</div> -->
          <div class="medium-bar-chart-maxLabel">{{this.maxLabel}}</div>
        </div>
      </div>
  </section>
</template>
<script>

export default {
  name: 'MediumBarChart',
  props: ['barChart'],
  data () {
    return {
      mode: false,
      maxLabel: false,
      valueLabel: false,
      value: false,
      max: false,
      valueWidth: false,
      maxWidth: false,
      forceUpdate: false
    }
  },
  mounted () {
    this.forceUpdate = true
    this.$forceUpdate()
    this.convertHtmlData(this.barChart)
  },
  mixins: [
  ],
  components: {

  },
  computed: {
    barChartWidth () {
      // eslint-disable-next-line no-unused-vars
      const dummy = this.forceUpdate
      if (this.$refs.barChartContainer) {
        return this.$refs.barChartContainer.scrollWidth
      } else {
        return -1
      }
    },
    labelsTooClose () {
      // eslint-disable-next-line no-unused-vars
      const dummy = this.forceUpdate
      var isTooClose = false
      if (this.barChartWidth > 0) {
        isTooClose = !!(this.valueWidth / this.barChartWidth > 0.75 || this.valueWidth / this.barChartWidth < 0.25)
      }
      return isTooClose
    }
  },
  methods: {
    convertHtmlData: function (elString) {
      const htmlObject = document.createElement('div')
      htmlObject.innerHTML = elString
      if (typeof htmlObject.childNodes[0].tagName === 'string') {
        if (htmlObject.childNodes[0].hasAttribute('id')) {
          this.mode = htmlObject.childNodes[0].getAttribute('mode')
          this.maxLabel = htmlObject.childNodes[0].getAttribute('max_label')
          this.valueLabel = htmlObject.childNodes[0].getAttribute('value_label')
          this.value = parseFloat(htmlObject.childNodes[0].getAttribute('value'))
          this.max = parseFloat(htmlObject.childNodes[0].getAttribute('max'))

          this.valueWidth = this.value / this.max * this.barChartWidth
          this.maxWidth = this.barChartWidth - this.valueWidth
        }
      }
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->

<style>

.medium-bar-chart-wrapper{
  margin-top: 15px;
  margin-bottom: 20px;
  width: 100%;
  display: inline-block;
  position: relative;
}

.medium-bar-chart-label-container{
  height: 10px;
  font-size: 12px;
  position: absolute;
  display: inline;
  width: 100%;
}
.medium-bar-chart-label-container.bottom{
        bottom: 10px;
    display: block;
}
.medium-bar-chart{
  display: inline-flex;
  padding-top: 20px;
  padding-bottom: 20px;
}

.medium-bar-chart-maxLabel,
.medium-bar-chart-valueLabel,
.medium-bar-chart-value,
.medium-bar-chart-max {
  display: inline-block;
}

.medium-bar-chart-maxLabel,
.medium-bar-chart-valueLabel{
  max-width: 100%;

}

.medium-bar-chart-maxLabel{
 text-align: right;
 float: right;
}

.medium-bar-chart-valueLabel{
 text-align: left;
 margin-right: 3px;
}

.medium-bar-chart-value {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}

.medium-bar-chart-max {
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}

.medium-bar-chart-value, .medium-bar-chart-max {
  height: 20px;
}

.under_all .medium-bar-chart-value{
  background-color: #0f644b;
}

.under_all .medium-bar-chart-valueLabel{
  color: green;
}

.under_all .medium-bar-chart-max{
  background-color:#0f644b4d;
}

.over_some .medium-bar-chart-value{
  background-color: #ff9430;
}

.over_some .medium-bar-chart-valueLabel{
  color: #b95c04;
}

.over_some .medium-bar-chart-max{
  background-color: #ff94304d;
}

.over_all .medium-bar-chart-value{
  background-color: #ef2c2c4d;
}

.over_all .medium-bar-chart-maxLabel{
  color: #e62323;
}

.over_all .medium-bar-chart-max{
  background-color: #ef2c2c;
}
</style>

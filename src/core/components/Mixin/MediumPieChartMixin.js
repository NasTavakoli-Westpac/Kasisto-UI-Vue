module.exports = {
  data () {
    return {
      options: {
        labels: [],
        legend: {
          show: false
        },
        colors: [],
        tooltip: {
          custom: this.generateToolTip
        }
      },
      series: [],
      selectedPieChartItem: -1
    }
  },
  mounted () {
    if (this.medium && this.medium.chart_data) {
      this.generateSeriesAndBuildLegend()
      if (this.isThemeChangerActivated) {
        this.watchColorChange(true)
      }
    }
  },
  computed: {
    isThemeChangerActivated () {
      return $store.state.showThemeChanger
    }
  },
  watch: {
    immediate: true,
    isThemeChangerActivated (isActive) {
      this.watchColorChange(isActive)
    }
  },
  methods: {
    generateSeriesAndBuildLegend () {
      // colors are only loaded once and static on mount
      this.retrieveChartsColor()
      for (var i = 0; i < this.medium.chart_data.items.length; i++) {
        this.series.push(Number(this.medium.chart_data.items[i].value))
        this.options.labels.push(this.medium.chart_data.items[i].name)
      }

      // var allLegends = document.querySelectorAll(".legend input[type='checkbox']")

      // for (var i = 0; i < allLegends.length; i++) {
      //     if (!allLegends[i].checked) {
      //         this.$refs.chart.toggleSeries(allLegends[i].value)
      //     }
      // }
    },
    watchColorChange (isActive) {
      if (isActive) {
        this.intervalHolder = setInterval(() => {
          // store previous color value and retrieve color from CSS variables
          var chartColors = this.options.colors.slice(0)
          this.options.colors = []
          this.retrieveChartsColor()
          // if the colors have changed, force the chart to refresh
          if (JSON.stringify(chartColors) !== JSON.stringify(this.options.colors)) {
            this.refreshPieChart()
          }
        }, 2000)
      } else {
        clearInterval(this.intervalHolder)
      }
    },
    refreshPieChart () {
      if (this.$refs.chart) {
        this.options.colors = []
        this.series = []
        this.options.labels = []
        this.generateSeriesAndBuildLegend()
        this.$refs.chart.refresh()
      }
    },
    generateToolTip ({
      series,
      seriesIndex,
      dataPointIndex,
      w
    }) {
      const label = this.medium.chart_data.items[seriesIndex].name
      let style, extraClass
      if ($store.state.chartToolTipMatchSliceColors) {
        style = ' style="background: ' + this.options.colors[seriesIndex] + '"'
      } else {
        extraClass = ' static'
      }
      return '<div class="kai-tooltip-container ' + extraClass + '"' + style + '>' +
        '<span style="word-break: break-word;">' + label + '</span>' +
        '</div>'
    },
    toggleSeries (value, index) {
      if (this.$refs.chart) {
        this.$refs.chart.toggleSeries(value)
      } else if (this.$parent.$refs.chartRef) {
        this.$parent.$refs.chartRef.toggleSeries(value)
      }
      this.updateSelectedItem(index)
    },
    retrieveChartsColor () {
      for (var i = 1; i <= 15; i++) {
        this.options.colors.push(getComputedStyle(document.getElementById('webview-container')).getPropertyValue('--chart-color-' + i).trim())
      }
    },
    retrievePercent (index) {
      if (this.$refs.chart && this.$refs.chart.chart.series.w.globals.seriesPercent.length) {
        return Math.round(this.$refs.chart.chart.series.w.globals.seriesPercent[index][0] * 10) / 10 + '%'
      }
    },
    updateSelectedItem (index) {
      if (this.selectedItem === index) {
        this.$parent.selectedPieChartItem = -1
      } else {
        this.$parent.selectedPieChartItem = index
      }
      this.$emit('selectedItem', index)
    },
    onChartClickEvent (event, chart, opts) {
      var el = event.target
      var seriesIndex = parseInt(el.getAttribute('j'))
      this.updateSelectedItem(seriesIndex)
    },
    onChartMountedEvent () {
      this.$emit('piechartLoaded', this.$refs.chart)
    },
    updateChartReference (optionalChartRef) {
      if (optionalChartRef) {
        this.$refs.chartRef = optionalChartRef
      }
    },
    updateSelectedPiechartItem (index) {
      this.selectedPieChartItem = index
    }
  }
}

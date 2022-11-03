<template>
<div class="medium-line-chart">
    <!-- Line Chart  -->
    <apexcharts id="linechart" ref="lineChart" width="300" heigth="auto" type="area" :options="chartOptions" :series="series">
    </apexcharts>
    <!-- Line Chart Header  -->
    <div class="chart-historical-list">
        <div class="chart-title">
            {{chartData.chart_data.title}}
        </div>
        <div>
    <!-- Line Chart Items  -->
            <ul>
                <li class="chart-list" v-for="(item, index) in chartData.chart_data.items" v-bind:key="index">
                    <div class="chart-list-wrap" :data-id="index" :class="{marker_highlight:selectedMarker == index}">
                        <div class="chart-time">{{item.name | moment}}</div>
                        <div class="chart-value">{{item.value}}</div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</div>
</template>
<script>
import VueApexCharts from 'vue-apexcharts'
export default {
  name: 'MediumLineChart',
  components: {
    apexcharts: VueApexCharts
  },
  props: ['chartData'],
  mixins: [

  ],
  data () {
    const _this = this
    return {
      chartOptions: {
        chart: {
          id: 'vuechart',
          foreColor: '#ffffff',
          toolbar: {
            show: false,
            tools: {
              download: false,
              selection: false,
              zoom: false,
              zoomin: false,
              zoomout: false,
              pan: false
            }
          }
        },
        colors: ['#03D49A'],
        dataLabels: {
          enabled: false
        },
        xaxis: {
          categories: [],
          type: 'datetime',
          lines: {
            show: true
          },
          crosshairs: {
            show: true,
            position: 'back',
            stroke: {
              color: '#20B8DF',
              width: 4,
              height: 2,
              dashArray: 0
            }
          },
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          }
        },
        yaxis: {

          tooltip: {
            enabled: false,
            offsetX: 0
          },
          lines: {
            show: true
          }
        },
        grid: {
          show: true,
          borderColor: '#393F4B',
          strokeDashArray: 0,
          position: 'back',
          xaxis: {
            lines: {
              show: true
            }
          },
          yaxis: {
            lines: {
              show: true
            }
          }
        },
        markers: {
          size: 3,
          colors: ['#00BAEC'],
          strokeColor: '#00BAEC',
          strokeWidth: 3,
          onClick: function (e) {
            const element = document.getElementById(this.id)
            _this.selectedMarker = element.getAttribute('rel')
          }
        },
        tooltip: {
          shared: false,
          intersect: true,
          x: {
            show: true,
            format: 'ddd, MMM d, yyyy'
          },
          y: {
            formatter: function (val) {
              return val
            }
          },
          marker: {
            show: false
          }
        }
      },
      series: [{
        name: 'series',
        data: []
      }],
      chartXaxis: [],
      chartDataSeries: [],
      selectedMarker: undefined
    }
  },
  mounted () {
    this.generateSeriesAndBuildXAxis()
  },
  filters: {
    moment: function (date) {
      return moment(date).format('ddd, MMM D, YYYY')
    }
  },
  methods: {
    generateSeriesAndBuildXAxis () {
      for (var i = 0; i < this.chartData.chart_data.items.length; i++) {
        this.chartDataSeries.push(this.chartData.chart_data.items[i].value)
        this.chartXaxis.push(this.dateConvertor(this.chartData.chart_data.items[i].name))
      }
      // Update data
      this.series = [{
        data: this.chartDataSeries
      }]

      this.chartOptions =
            {
              ...this.chartOptions,
              ...{
                xaxis: {
                  categories: this.chartXaxis
                }
              }
            }
    },
    dateConvertor (date) {
      var options = {
        timeZone: 'UTC',
        year: 'numeric',
        day: 'numeric',
        month: 'long'
      }

      var newDateFormat = new Date(date).toLocaleDateString('en-US', options)
      return newDateFormat
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style>
#linechart>div {
  background-color: #1C212A;
  border-radius: 10px 10px 0 0;
}

.medium-line-chart ul{
  list-style-type: none;
  padding: 0;
}

.medium-line-chart {
    margin: 20px 20px 20px 0px;
    position: relative;
    cursor: pointer;
    background: var(--component-background-color);
    color: var(--text-color);
    z-index: 3;
    border-radius: 15px;
    height: 100%;
    max-width: var(--card-item-width);
    display: inline-block;
    -webkit-box-shadow: var(--shadow);
    box-shadow: var(--shadow);
}

.chart-title {
    font-weight: bold;
    /* padding: 0 0 0 20px; */
    font-size: 19px;
    margin: -5px 0 10px 0;
}

.chart-list {
   clear: both;
   padding: 3px 0 0 0;
}

.chart-time {
   float: left;
}

.chart-value {
  float: right;
}

.chart-historical-list {
    padding: 0 15px 20px 15px;
}

  .apexcharts-tooltip {
    background: #f3f3f3;
    color: #22B7E7;
    text-align: center;
    font-weight: bold;
  }

 .apexcharts-tooltip.apexcharts-theme-light .apexcharts-tooltip-title {
    background: none;
    border-bottom: none;
}

.apexcharts-tooltip-text-label, .apexcharts-xaxistooltip  {
    display:  none;
}

.toolbox {
    width: 100px;
    height: 50px;
    text-align: center;
    font-weight: bold;
}

.apexcharts-tooltip-series-group {
    display: block !important;
}

.apexcharts-tooltip-text-value, .apexcharts-tooltip-text-z-value {
    margin-left: 0px;
}

.apexcharts-tooltip-series-group {
    text-align: center;
}

.apexcharts-tooltip-title {
    margin-bottom: 0px;
}

.marker_highlight {
   font-weight: bold;
   font-size: 19px;
}

.apexcharts-tooltip-y-group {
    padding: 0;
}

</style>

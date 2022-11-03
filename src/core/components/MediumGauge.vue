<template>
  <section>
      <div class="medium-gauge-wrapper">
           <img :src="gaugeSvg">
           <div class="credit-score">{{gaugeScore}}</div>
      </div>
  </section>
</template>
<script>

import ImageUtilityMixin from './Mixin/ImageUtilityMixin'

export default {
  name: 'MediumGauge',
  props: ['gauge'],
  data () {
    return {
      gaugeSvg: '',
      gaugeScore: 0
    }
  },
  mounted () {
    this.convertHtmlData(this.gauge)
  },
  mixins: [
    ImageUtilityMixin
  ],
  components: {

  },
  methods: {
    convertHtmlData: function (elString) {
      const htmlObject = document.createElement('div')
      htmlObject.innerHTML = elString

      if (typeof htmlObject.childNodes[0].tagName === 'string') {
        if (htmlObject.childNodes[0].hasAttribute('id')) {
          // console.log('htmlObject.childNodes[0]', htmlObject.childNodes[0])

          const gaugeScore = htmlObject.childNodes[0].getAttribute('data-score')
          const gaugeCategory = htmlObject.childNodes[0].getAttribute('data-category')

          switch (gaugeCategory.toUpperCase()) {
            case 'EXCELLENT':
              this.gaugeSvg = this.getImagePath('svg/gauge/ExcellentV2.svg')
              this.gaugeScore = gaugeScore
              break
            case 'GOOD':
              this.gaugeSvg = this.getImagePath('svg/gauge/GoodV2.svg')
              this.gaugeScore = gaugeScore
              break
            case 'FAIR':
              this.gaugeSvg = this.getImagePath('svg/gauge/FairV2.svg')
              this.gaugeScore = gaugeScore
              break
            case 'POOR':
              this.gaugeSvg = this.getImagePath('svg/gauge/PoorV2.svg')
              this.gaugeScore = gaugeScore
              break
            case 'VERY POOR':
              this.gaugeSvg = this.getImagePath('svg/gauge/VeryPoorV2.svg')
              this.gaugeScore = gaugeScore
              break
            case 'NONE':
              this.gaugeSvg = this.getImagePath('svg/gauge/NoneV2.svg')
              this.gaugeScore = gaugeScore
          }
        }
      }
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->

<style>

#kcb_credit_score {
    left: 35%;
    width: 30%;
    text-align: center;
    margin-top: -60px;
    position: relative;
    font-size: 13px !important;
}

  #kcb_credit_score > span {
      font-size: 13px !important;
    }

.credit-score {
  position: absolute;
  font-size: 20px;
  font-weight: bold;
  top: 68px;
  left: 44%;
}

.medium-gauge-wrapper img {
  width: initial !important;
}
</style>

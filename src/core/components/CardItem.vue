<template>
<div :aria-label="ScreenReaderLabel" navLvl="0" navDir="horizontal" class="kai-card-item" :class="{kai_card_button_active_border: isSelect && this.$parent.selectedItemsIndex.includes(index), adaptive:isAdaptiveItemMode && !itemWithFixedHeight, fixed:this.displayFixed}" ref="cardItem">
    <Medium v-if="item.payload.medium && !containSmallImage" @mediumLoaded="calculateMainElementMaxHeight" @piechartMedium="updateChartReference"  @selectedPiechartItem="updateSelectedPiechartItem" :medium="item.payload.medium" :isExpanded="this.isExpanded"></Medium>

    <div class="kai-card-item-footer" :class="hasSmallImageClass">
        <div navDir="horizontal" class="kai-card-text-container">
          <div>
            <MediumSmall v-if="item.payload.medium && containSmallImage" :medium="item.payload.medium"></MediumSmall>
            <!-- TITLE -->
            <div v-if="item.payload.title" class="kai-card-title" :class="{gauge:this.showGauge}" v-html="item.payload.title"></div>
            <div v-else class="kai-card-title" v-html="item.value"></div>
            <!-- SUB TITLE -->
            <div v-if="item.payload.subtitle" class="kai-card-subtitle" :style="this.displayFixed  ? 'max-height:' + this.mainElementMaxHeight + 'px;': ''"  :class="{fixed: this.displayFixed && showExpandButton, gauge:this.showGauge || this.showBar}">
                <div v-if="showBar" v-html="subtitleToDisplay" :class="convertHtmlData(subtitleToDisplay)"></div>
                <MediumPieChartLegend v-if="item.payload.medium && item.payload.medium.type && item.payload.medium.type == 'PIECHART'" :medium="this.item.payload.medium" ></MediumPieChartLegend>
                <MediumGauge v-if="showGauge" :gauge="subtitleToDisplay"></MediumGauge>
                <MediumBarChart v-if="showBar" :barChart="subtitleToDisplay"></MediumBarChart>
                <div v-if="!showBar" v-html="subtitleToDisplay" :class="convertHtmlData(subtitleToDisplay)"></div>
            </div>
          </div>
            <div navLvl="1" navDir="vertical" role="button" :aria-label="expandButtonLabel" v-if="showExpandButton" class="card-expand-button-wrapper" :class="{expanded:isExpanded}" v-on:click="(e) => clickExpandButton(e, index)">
                    <img v-if="!isExpanded" aria-hidden="true" class="card-expand-button" ondragstart="return false;" :src="expandIconSrc" width="20">
                    <img v-if="isExpanded" aria-hidden="true" class="card-expand-button" ondragstart="return false;" :src="collapseIconSrc" width="20">
            </div>
        </div>
        <div class="kai-card-button-container" v-if="isSelect" :class="{fixed: this.displayFixed}">
            <!-- CARD BUTTON FOR MULTISELECT-->
            <div navLvl="1" navDir="vertical" role="button" :aria-label="item.label" v-if="item.label" class="kai-card-button" v-on:click="(e) => this.$parent.selectBtn(e, item, index)" :class="{ kai_card_button_active: this.$parent.selectedItemsIndex.includes(index), disabled: this.$parent.isDisable}">{{item.label}} </div>
            <div navLvl="1" navDir="vertical" role="button" :aria-label="this.fallbackButtonText" v-else class="kai-card-button" v-on:click="(e) => this.$parent.selectBtn(e, item, index)" :class="{ kai_card_button_active: this.$parent.selectedItemsIndex.includes(index), disabled: this.$parent.isDisable}">{{this.fallbackButtonText}}  </div>
        </div>
        <div class="kai-card-button-container" v-if="!isSelect" :class="{fixed: this.displayFixed}">
            <!-- CARD BUTTON -->
            <div navLvl="1" navDir="vertical" class="kai-card-button" v-for="(button, buttonIndex) in validButtons(item.payload.buttons)" :key="buttonIndex" v-html="button.label" role="button" :aria-label="button.label" v-on:click="(e) => itemButton(e, button)"></div>
        </div>
    </div>
    <div class="kai-card-disabled-overlay" v-if="isSelect && this.$parent.isDisable"></div>

</div>
</template>

<script>
import CardMixin from './Mixin/CardMixin'
import TextMixin from './Mixin/TextMixin'
import MediumPieChartMixin from './Mixin/MediumPieChartMixin'
import ImageUtilityMixin from './Mixin/ImageUtilityMixin'
import Medium from './Medium'
import MediumGauge from './MediumGauge'
import MediumBarChart from './MediumBarChart'
import MediumSmall from './MediumSmall'
import MediumPieChartLegend from './MediumPieChartLegend'
import {
  store
} from '../../store/index'
export default {
  name: 'CardItem',
  props: ['item', 'index', 'isSelect', 'containSmallImage'],
  components: {
    Medium,
    MediumSmall,
    MediumGauge,
    MediumBarChart,
    MediumPieChartLegend
  },
  mixins: [
    CardMixin,
    TextMixin,
    MediumPieChartMixin,
    ImageUtilityMixin
  ],
  data () {
    return {
      cardMainElement: 'kai-card-subtitle',
      // card elements that enter in consideration to calculate the main element maximum Height
      cardElements: [
        {
          className: 'kai-card-medium',
          substract: true
        },
        // the legend container is now part of the cardMainElement and shouldn't be included directly in the calculation
        // {
        //   className: 'kai-medium-legend-container',
        //   substract: false
        // },
        {
          className: 'kai-card-title',
          substract: true
        },
        {
          className: 'kai-card-button-container',
          substract: true
        }
      ],
      fallbackButtonText: store.getters.getBotLanguages.translations.selectTemplate.fallbackListSubmitButton,
      showGauge: false,
      showBar: false
    }
  },
  created () {

  },
  computed: {
    // a computed getter
    subtitleToDisplay: function () {
      var text = this.linkify(this.item.payload.subtitle)
      return this.lineBreak(text)
    },
    ScreenReaderLabel: function () {
      var screenReader = $store.getters.getBotLanguages.translations.screenReader
      return screenReader.card + ' ' + (this.index + 1) + ': ' + this.item.payload.title
    },
    expandButtonLabel: function () {
      if (this.isExpanded) {
        return $store.getters.getBotLanguages.translations.screenReader.collapse
      } else {
        return $store.getters.getBotLanguages.translations.screenReader.expand
      }
    },
    hasSmallImageClass () {
      if (this.item.payload.medium && this.containSmallImage) {
        return 'has-small-image'
      } else {
        return ''
      }
    }
  },
  methods: {

    convertHtmlData: function (elString) {
      const htmlObject = document.createElement('div')
      htmlObject.innerHTML = elString
      if (typeof htmlObject.childNodes[0].tagName === 'string') {
        if (htmlObject.childNodes[0].hasAttribute('id') && htmlObject.childNodes[0].getAttribute('id') === 'kcb_credit_score') {
          // Show gauge chart
          this.showGauge = true
        }
        if (htmlObject.childNodes[0].hasAttribute('id') && htmlObject.childNodes[0].getAttribute('id') === 'kcb_budget') {
          // Show bar chart
          this.showBar = true
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
   /* the 300px is the min width of the .kai-card-title,
    which gave the min-width to the card. This way the min-width is kept. */
  .kai-card-item {
    min-width: var(--card-item-width);
  }

    /* the 58px is the width of the small image  */
  .kai-card-item-footer.has-small-image .kai-card-title {
    min-width: unset;
    width: calc(100% - 58px);
  }
</style>

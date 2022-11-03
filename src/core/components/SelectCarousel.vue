<template>
<section :id="'carousel'+this.carouselCounter">
    <div class="kai-card-carousel-wrapper">
        <div class="kai-card-carousel-nav-left-container" ref="navLeft" navDir="horizontal" tabindex="0" role="button" :aria-label="screenReaderTranslations.carouselArrowLeft" v-on:click="moveCarouselToItem(currentIndex-1)"  :disabled="atHeadOfList" @mouseover="hoverLeft = true" @mouseleave="hoverLeft = false" :class="{hover: hoverLeft && !mobile}" >
            <img :src="arrowIcon" class="kai-card-carousel-nav-left" aria-hidden="true" draggable="false" :disabled="atHeadOfList"/>
        </div>
        <div class="kai-card-carousel" v-pan="onPan">
            <div class="kai-card-carousel-overflow-container">
                <div class="kai-card-wraper kai-card-carousel-transform" role="region" :aria-roledescription="screenReaderTranslations.inACarousel" :aria-label="ScreenReaderLabel"  navDir="horizontal" :style="transformCarousel" :class="{transition: !onPanStarted}" ref="carousel">
                    <CardItem v-for="(item, index) in this.response.default.payload.options" :item="item" :index="index" :isSelect=true :key="index" :id="'kai-card-carousel' + index" ref="item"></CardItem>
                </div>
            </div>
        </div>
        <div class="kai-card-carousel-nav-right-container" ref="navRight" navDir="horizontal" tabindex="0" role="button" :aria-label="screenReaderTranslations.carouselArrowRight" v-on:click="moveCarouselToItem(currentIndex+1)" :disabled="atEndOfList" @mouseover="hoverRight = true" @mouseleave="hoverRight = false" :class="{hover: hoverRight && !mobile}">
            <img :src="arrowIcon" class="kai-card-carousel-nav-right" aria-hidden="true" draggable="false" :disabled="atEndOfList"/>
        </div>
    </div>
    <div class="kai-card-carousel-pager">
        <div v-for="(item, index) in this.response.default.payload.options" :key="index" aria-hidden="true" class="kai-card-carousel-pager-item" @click="moveCarouselToItem(index)" :class="{active:index == currentIndex}"><a tabindex="-1" href="" data-slide-index="0" class="bx-pager-link">index</a></div>
    </div>

</section>
</template>

<script>
import {
  isMobile
} from 'mobile-device-detect'
import TextBubble from './TextBubble'
import CardItem from './CardItem'
import CarouselMixin from './Mixin/CarouselMixin'
import CardMixin from './Mixin/CardMixin'
import KeyboardNavigationMixin from './Mixin/KeyboardNavigationMixin'
import ImageUtilityMixin from './Mixin/ImageUtilityMixin'
import SelectMixin from './Mixin/SelectMixin'
import './styles/SelectCarousel.less'
import {
  store
} from '../../store/index'
/*
Vue.directive('pan', {
  bind: function (el, binding) {
    if (typeof binding.value === 'function') {
      const mc = new Hammer(el)
      mc.get('pan').set({
        direction: Hammer.DIRECTION_HORIZONTAL
      })
      mc.on('pan', binding.value)
    }
  }
})

Vue.directive('tap', {
  bind: function (el, binding) {
    if (typeof binding.value === 'function') {
      const mc = new Hammer(el)
      mc.on('tap', binding.value)
    }
  }
})
*/

export default {
  name: 'SelectCarousel',
  props: ['response', 'isDisable'],
  components: {
    CardItem
  },
  created: function () {
    this.hideSubmitContent() // Mixin
    this.$root.$refs.SelectCarouselComp = this
  },
  data () {
    return {
      carouselCounter: store.getters.getCarouselCounter,
      selectedItemsIndex: this.$parent.selectedItemsIndex,
      // selectedItemsIndex:[],
      currentOffset: 0,
      currentIndex: 0,
      hoverLeft: false,
      hoverRight: false,
      mobile: isMobile,
      forceUpdate: false,
      currentCardMode: '',
      referenceOffset: 0,
      onPanStarted: false, // flag used to disable css animation during the pan gesture.
      // isDisable: this.isDisable,
      validationMessage: '',
      textBubble: TextBubble,
      ishideSubmitContent: false,
      screenReaderTranslations: $store.getters.getBotLanguages.translations.screenReader,
      arrowIcon: this.getImagePath('svg/Arrow_carousel.svg')
    }
  },
  computed: {
    ScreenReaderLabel: function () {
      var screenReaderCurrentDate = moment().format('hh:mm A')
      var screenReader = $store.getters.getBotLanguages.translations.screenReader
      var sender = screenReader.virtualAssistantDesignation + ' ' + screenReader.displayed
      var cardLabel = this.response.default.payload.options.length + ' ' + screenReader.card
      if (this.response.default.payload.options.length > 1) {
        cardLabel = this.response.default.payload.options.length + ' ' + screenReader.cards
      }
      return screenReader.timeSendAt + ' ' + screenReaderCurrentDate + ',  ' + sender + ': ' + cardLabel
    }
  },
  mixins: [
    CarouselMixin,
    CardMixin,
    SelectMixin,
    KeyboardNavigationMixin,
    ImageUtilityMixin
  ]
}
</script>

<style scoped>
.kai-card-carousel-transform {
    transform: var(--carousel_translate);
}
</style>

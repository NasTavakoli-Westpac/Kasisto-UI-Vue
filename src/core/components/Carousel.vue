<template>
<section :id="'carousel'+this.carouselCounter">
    <div class="kai-card-carousel-wrapper">
        <div class="kai-card-carousel-nav-left-container" ref="navLeft" navDir="horizontal" tabindex="0" role="button" :aria-label="screenReaderTranslations.carouselArrowLeft" v-on:click="moveCarouselToItem(currentIndex-1)"  :disabled="atHeadOfList" @mouseover="hoverLeft = true" @mouseleave="hoverLeft = false" :class="{hover: hoverLeft && !mobile}" >
            <img :src="arrowIcon" class="kai-card-carousel-nav-left" aria-hidden="true" draggable="false" :disabled="atHeadOfList"/>
        </div>
        <div class="kai-card-carousel" v-pan="onPan" v-panend="onPanEnd">
            <div class="kai-card-carousel-overflow-container">
                <div class="kai-card-wraper kai-card-carousel-transform" role="region" :aria-roledescription="screenReaderTranslations.inACarousel" :aria-label="ScreenReaderLabel"  navDir="horizontal" :style="transformCarousel" :class="{transition: !onPanStarted,isFinishAnimate: isScrollFreeEase}" ref="carousel">

                    <Card v-for="(item, index) in this.response.default.payload.contents" :key="index" :item="item" :index="index" :id="'kai-card-carousel' + index" ref="item" :containSmallImage="containSmallImage"></Card>

                </div>
            </div>
        </div>
        <div class="kai-card-carousel-nav-right-container" ref="navRight" navDir="horizontal" tabindex="0" role="button" :aria-label="screenReaderTranslations.carouselArrowRight" v-on:click="moveCarouselToItem(currentIndex+1)" :disabled="atEndOfList" @mouseover="hoverRight = true" @mouseleave="hoverRight = false" :class="{hover: hoverRight && !mobile}">
            <img :src="arrowIcon" class="kai-card-carousel-nav-right" aria-hidden="true" draggable="false" :disabled="atEndOfList"/>
        </div>
    </div>
    <div class="kai-card-carousel-pager">
        <div v-for="(item, index) in this.response.default.payload.contents" :key="index" aria-hidden="true" class="kai-card-carousel-pager-item" @click="moveCarouselToItem(index)" :class="{active:index == currentIndex}"><a tabindex="-1" href="" data-slide-index="0" class="bx-pager-link">index</a></div>
    </div>
</section>
</template>

<script>
import Vue from 'vue'
import {
  isMobile
} from 'mobile-device-detect'
import Card from './Card'
import CarouselMixin from './Mixin/CarouselMixin'
import KeyboardNavigationMixin from './Mixin/KeyboardNavigationMixin'
import ImageUtilityMixin from './Mixin/ImageUtilityMixin'
import './styles/CardCarousel.less'

// Code below is coming from QuickReplies.vue

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

Vue.directive('panend', {
  bind: function (el, binding) {
    if (typeof binding.value === 'function') {
      const mc = new Hammer(el)
      mc.get('pan').set({
        direction: Hammer.DIRECTION_HORIZONTAL
      })
      mc.on('panend', binding.value)
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

export default {
  name: 'CardCarousel',
  components: {
    Card
  },
  mounted: function () {
    this.isScrollAnimate = true
    this.isScrollFreeEase = true
    this.checkIfContainsSmallImage(this.response)
  },
  data () {
    return {
      response: this.$slots,
      carouselCounter: window.$store.getters.getCarouselCounter,
      currentOffset: 0,
      currentIndex: 0,
      paginationFactor: 320, // pagination factor = carousel_card width + margin right
      hoverLeft: false,
      hoverRight: false,
      mobile: isMobile,
      forceUpdate: false,
      currentCardMode: '',
      referenceOffset: 0,
      onPanStarted: false, // flag used to disable css animation during the pan gesture.
      isScrollAnimate: true,
      isScrollFreeEase: true,
      containSmallImage: false,
      screenReaderTranslations: $store.getters.getBotLanguages.translations.screenReader,
      arrowIcon: this.getImagePath('svg/Arrow_carousel.svg')
    }
  },
  methods: {
    checkIfContainsSmallImage (response) {
      for (const card of response.default.payload.contents) {
        // If no medium in the payload
        if (card.payload.medium === undefined) {
          this.containSmallImage = true
          return false
        }
        // If at least one medium type is SMALL_IMAGE
        if (card.payload.medium.type === 'SMALL_IMAGE') {
          this.containSmallImage = true
          return false
        }
      }
    }
  },
  computed: {
    cardItems () {
      return this.response.default.payload.contents
    },
    ScreenReaderLabel: function () {
      var screenReaderCurrentDate = moment().format('hh:mm A')
      var screenReader = $store.getters.getBotLanguages.translations.screenReader
      var sender = screenReader.virtualAssistantDesignation + ' ' + screenReader.displayed
      var cardLabel = this.response.default.payload.contents.length + ' ' + screenReader.card
      if (this.response.default.payload.contents.length > 1) {
        cardLabel = this.response.default.payload.contents.length + ' ' + screenReader.cards
      }
      return screenReader.timeSendAt + ' ' + screenReaderCurrentDate + ',  ' + sender + ': ' + cardLabel
    }
  },
  mixins: [
    CarouselMixin,
    KeyboardNavigationMixin,
    ImageUtilityMixin
  ]
}
</script>

<style scoped>

.kai-card-carousel-transform {
    transform: var(--carousel_translate);
}

.kai-card-carousel-nav-left-container {
  margin-left: 15px;
}
.kai-card-carousel-nav-right-container {
  margin-right: 15px;
}
</style>

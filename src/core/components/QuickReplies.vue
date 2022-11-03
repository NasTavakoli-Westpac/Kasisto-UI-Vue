<template>
<section class="quickreplies">
    <div class="kai-card-carousel-wrapper">
      <div v-if="!atHeadOfList" class="bottom-bar-left-fade" ></div>
        <div class="kai-card-carousel-nav-left-container bottom-bar-arrow-pos-left mouse-pointer" ref="navLeft" navDir="horizontal" tabindex="0" role="button" :aria-label="screenReaderTranslations.quickReplyArrowLeft" v-on:click="moveCarouselToItem(currentIndex-1)"  :disabled="atHeadOfList" @mouseover="hoverLeft = true" @mouseleave="hoverLeft = false" :class="{hover: hoverLeft && !mobile}" >
            <img :src="arrowIcon" class="kai-card-carousel-nav-left left-arrow" aria-hidden="true" draggable="false" :disabled="atHeadOfList"/>
        </div>
        <div class="kai-card-carousel" v-pan="onPan" v-panend="onPanEnd">
            <div class="kai-card-carousel-overflow-container">
                <div class="kai-card-wraper quick-reply kai-card-carousel-transform" :aria-label="ScreenReaderLabel" role="region" :style="transformCarousel" :class="{transition: !onPanStarted, isFinishAnimate: isScrollFreeEase}" ref="carousel">

                    <div class="kai-quick-reply-item" :class="{dynamic: item.isDynamic}" navLvl="1" navDir="horizontal"  v-for="(item, index) in this.response.default" :key="index" v-on:click="(e) => quickRepliesButton(item)" :aria-label="getItemAriaLabel(item)" role="button" ref="item">
                        <div v-if="item.label" aria-hidden="true" v-html="item.label" class="kai-quick-reply-label"></div>
                            <div v-else-if="item.display_text" v-html="item.display_text" class="kai-quick-reply-label"></div>
                        <div class="kai-quick-reply-image" v-if="item.image_url && item.image_url !== ''" ref="clipImage">
                            <img v-if="item.image_url" class="backup_picture" ondragstart="return false;" :src="item.image_url" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="kai-card-carousel-nav-right-container" ref="navRight" navDir="horizontal" tabindex="0" role="button" :aria-label="screenReaderTranslations.quickReplyArrowRight" v-on:click="moveCarouselToItem(currentIndex+1)" :disabled="atEndOfList" @mouseover="hoverRight = true" @mouseleave="hoverRight = false" :class="{hover: hoverRight && !mobile}">
            <img :src="arrowIcon" class="kai-card-carousel-nav-right" aria-hidden="true" draggable="false" :disabled="atEndOfList"/>
        </div>
        <div class="bottom-bar-right-fade" ></div>
    </div>
    <!-- <div class="kai-card-carousel-pager">
        <div v-for="(item, index) in this.response.default" :key="index" aria-hidden="”true" class="kai-card-carousel-pager-item" @click="moveCarouselToItem(index)" :class="{active:index == currentIndex}"><a tabindex="-1" href="" data-slide-index="0" class="bx-pager-link">index</a></div>
    </div> -->
</section>
</template>
<script>
import Vue from 'vue'
import {
  isMobile
} from 'mobile-device-detect'
import Kai from '../../kai'
import CarouselMixin from './Mixin/CarouselMixin'
import KeyboardNavigationMixin from './Mixin/KeyboardNavigationMixin'
import ImageUtilityMixin from './Mixin/ImageUtilityMixin'
import './styles/QuickReplies.less'
import {
  store
} from '../../store/index'

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
  name: 'QuickReplies',
  data () {
    return {
      response: this.$slots,
      carouselCounter: store.getters.getCarouselCounter,
      currentOffset: 0,
      currentIndex: 0,
      hoverLeft: false,
      hoverRight: false,
      mobile: isMobile,
      forceUpdate: false,
      currentCardMode: '',
      referenceOffset: 0,
      onPanStarted: false, // flag used to disable css animation during the pan gesture.
      isScrollAnimate: true,
      isScrollFreeEase: true,
      quickReplyImageCSSHeight: 32, // kai-quick-reply-image CSS height used to clip image
      leftArrowSrc: this.getImagePath('panel-left-arrow-blk.png'),
      rigthArrowSrc: this.getImagePath('panel-right-arrow-blk.png'),
      screenReaderTranslations: $store.getters.getBotLanguages.translations.screenReader,
      arrowIcon: this.getImagePath('svg/Arrow_carousel.svg')
    }
  },
  mounted () {
    // this.getImagesUrl
    this.clipQuickReplyImages()
  },
  computed: {
    cardItems () {
      return this.response.default
    },
    ScreenReaderLabel: function () {
      var screenReaderCurrentDate = moment().format('hh:mm A')
      var screenReader = $store.getters.getBotLanguages.translations.screenReader
      var sender = screenReader.virtualAssistantDesignation + ' ' + screenReader.displayed
      var quickReplyLabel = this.response.default.length + ' ' + screenReader.quickReply
      if (this.response.default.length > 1) {
        quickReplyLabel = this.response.default.length + ' ' + screenReader.quickReplies
      }
      return screenReader.timeSendAt + ' ' + screenReaderCurrentDate + ',  ' + sender + ': ' + quickReplyLabel
    }
  },
  filters: {
    // mediumContent filter contained in MediumMixin
  },
  mixins: [
    CarouselMixin,
    KeyboardNavigationMixin,
    ImageUtilityMixin
  ],
  methods: {
    quickRepliesButton (quickReply) {
      Kai.Core.buttonPressed(quickReply)
    },
    clipQuickReplyImages () {
      if (this.$refs.clipImage && this.$refs.clipImage.length > 0) {
        for (var i = 0; i < this.$refs.clipImage.length; i++) {
          if (this.$refs.clipImage[i].children[0]) {
            var element = this.$refs.clipImage[i].children[0]
            var finalHeight = this.quickReplyImageCSSHeight

            var clipRatio = element.naturalHeight / finalHeight
            var finalWidth = element.naturalWidth / clipRatio
            var marginWidthCorrection = (finalWidth - finalHeight) / 2

            element.style.marginLeft = '-' + marginWidthCorrection + 'px'
          }
        }
      }
    },
    getItemAriaLabel (quickReply) {
      // check if quick reply label contains a thumb up or thumb down emoji image, (see kai.js function getThumbsImage() for more info)

      if (quickReply.label && quickReply.label.includes('<img') && quickReply.label.includes('thumb-up')) {
        return 'Thumb up'
      }
      if (quickReply.label && quickReply.label.includes('<img') && quickReply.label.includes('thumb-down')) {
        return 'Thumb down'
      }
      return quickReply.label
    }
  }
}
</script>

<style scoped>
.kai-card-carousel-transform {
    transform: var(--carousel_translate);
}
.kai-quick-reply-item:focus {
    outline: #00a0af solid 0px;
}
.kai-card-carousel-nav-left-container {
  padding: 0px;
}
.kai-card-carousel-nav-left-container, .kai-card-carousel-nav-right-container {
  width: 24px;
  height: 24px;
  margin-left:8px;
  margin-right:8px;
}

.kai-card-carousel-nav-left {
  left: 19.33%;
  top: 22.73%;
  width: 14px;
  height: 14px;
}

.kai-card-carousel-nav-right {
  left: 29.33%;
  top: 22.73%;
  width: 14px;
  height: 14px;
}
.kai-card-carousel-nav-right-container input, .kai-card-carousel-nav-left-container input {
    width: 8px;
    margin: auto;
}
.bottom-bar-right-fade {
    height: 55px;
    width: 100px;
    position: absolute;
    pointer-events: none;
    right: 0;
    background: -moz-linear-gradient(left,  rgba(255,255,255,0) 0%, rgba(255,255,255,0) 1%, rgba(255,255,255,1) 100%); /* FF3.6-15 */
    background: -webkit-linear-gradient(left,  rgba(255,255,255,0) 0%,rgba(255,255,255,0) 1%,rgba(255,255,255,1) 100%); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(to right,  rgba(255,255,255,0) 0%,rgba(255,255,255,0) 1%,rgba(255,255,255,1) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00ffffff', endColorstr='#ffffff',GradientType=1 ); /* IE6-9 */

}
.bottom-bar-left-fade {
    height: 55px;
    width: 100px;
    position: absolute;
    pointer-events: none;
    left: 0;
    /* Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#ffffff+0,ffffff+100&1+0,0+100;White+to+Transparent */
    background: -moz-linear-gradient(left,  rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%); /* FF3.6-15 */
    background: -webkit-linear-gradient(left,  rgba(255,255,255,1) 0%,rgba(255,255,255,0) 100%); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(to right,  rgba(255,255,255,1) 0%,rgba(255,255,255,0) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffffff', endColorstr='#00ffffff',GradientType=1 ); /* IE6-9 */
    z-index: 1;
}
input[type=image]:disabled
{
    opacity:0.5;
}
.bottom-bar-arrow-pos-right input{
    position: relative;
    left: 8px;
    top: 7px;
}

.bottom-bar-arrow-pos-left input{
    position: relative;
    left: 5px;
    top: 7px;
}

.mouse-pointer {
    cursor: pointer;
    cursor: hand;
}
</style>

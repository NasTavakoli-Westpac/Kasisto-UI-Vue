<template>
<section ref="chipComponentRef" id="kai-chip-panel" v-if="chipItemLength > 0 && this.hideSelectChipPanel === false"  v-bind:class="chipItemLength">
  <div class="select-chip-panel">
      <div v-if="!validateSelection && showValidationMessage" class="notif-chip">{{validationMessage}}</div>
    <div class="kai-select-wrapper">
      <div class="bottom-bar-left-fade" ></div>
        <div class="kai-card-carousel-nav-left-container bottom-bar-arrow-pos-left mouse-pointer" ref="navLeft" navDir="horizontal" tabindex="0" role="button" :aria-label="screenReaderTranslations.chipArrowLeft" v-on:click="moveCarouselToItem(currentIndex-1)"  :disabled="atHeadOfList" @mouseover="hoverLeft = true" @mouseleave="hoverLeft = false" :class="{hover: hoverLeft && !mobile}" >
            <img :src="arrowIcon" class="kai-card-carousel-nav-left left-arrow" aria-hidden="true" draggable="false" :disabled="atHeadOfList"/>
        </div>
        <div class="kai-card-carousel" v-pan="onPan" v-panend="onPanEnd">
            <div class="kai-card-carousel-overflow-container">
                <div class="kai-card-wraper quick-reply kai-card-carousel-transform" :aria-label="ScreenReaderLabel" role="region" navDir="horizontal" :style="transformCarousel" :class="{transition: !onPanStarted, isFinishAnimate: isScrollFreeEase}" ref="carousel">
                    <div class="selected-tag-item" v-for="(item, index) in this.selectedTags" :key="index" :aria-label="item.text" role="button" ref="item">
                        <div navLvl="1" navDir="horizontal" :tabindex="checkIndex(index)" class="selected-tag-wrapper">
                              <div class="selected-txt">{{item.text}}</div>
                              <div navLvl="2" navDir="horizontal" class="selected-delete-btn mouse-pointer" @click="removeselectedChipItem(index)"><div class="selected-delete-icon">x</div></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="kai-card-carousel-nav-right-container" ref="navRight" navDir="horizontal" tabindex="0" role="button" :aria-label="screenReaderTranslations.chipArrowRight" v-on:click="moveCarouselToItem(currentIndex+1)" :disabled="atEndOfList" @mouseover="hoverRight = true" @mouseleave="hoverRight = false" :class="{hover: hoverRight && !mobile}">
            <img :src="arrowIcon" class="kai-card-carousel-nav-right" aria-hidden="true" draggable="false" :disabled="atEndOfList"/>
        </div>
        <div class="bottom-bar-right-fade" ></div>
    </div>
  </div>
</section>
</template>
<script>
import Vue from 'vue'
import {
  isMobile
} from 'mobile-device-detect'
import CarouselMixin from './Mixin/CarouselMixin'
import SelectMixin from './Mixin/SelectMixin'
import TextBubble from './TextBubble'
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
  name: 'ChipPanelQbar',
  props: ['response'],
  data () {
    return {
      // response: this.$slots,
      carouselCounter: window.$store.getters.getCarouselCounter,
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
      selectedItemsIndex: this.$parent.selectedItemsIndex,
      selectedTags: store.state.chipSelectedItem,
      textBubble: TextBubble,
      validationMessage: store.getters.getBotLanguages.translations.selectTemplate.tooManyItemsMessage,
      showValidationMessage: false,
      hideSelectChipPanel: false,
      screenReaderTranslations: $store.getters.getBotLanguages.translations.screenReader,
      arrowIcon: this.getImagePath('svg/Arrow_carousel.svg')
    }
  },
  mounted () {
    // this.getImagesUrl
    // this.clipQuickReplyImages();
    this.$root.$refs.ChipPanelComp = this
    // this.$forceUpdate();
  },
  computed: {
    cardItems () {
      return store.state.chipSelectedItem
    },
    chipItemLength: function () {
      return store.state.chipSelectedItem.length
    },
    ScreenReaderLabel: function () {
      var screenReaderCurrentDate = moment().format('hh:mm A')
      var screenReader = $store.getters.getBotLanguages.translations.screenReader
      var sender = screenReader.virtualAssistantDesignation + ' ' + screenReader.displayed
      var cardLabel = this.selectedTags.length + ' ' + screenReader.card
      if (this.selectedTags.length > 1) {
        cardLabel = this.selectedTags.length + ' ' + screenReader.cards
      }
      return screenReader.timeSendAt + ' ' + screenReaderCurrentDate + ',  ' + sender + ': ' + cardLabel
    },
    processSelection () {
      return $store.getters.getSendSelection
    }
  },
  watch: {
    processSelection () {
      this.multiCardSubmitBtn()
    }
  },
  filters: {
    // mediumContent filter contained in MediumMixin
  },
  mixins: [
    CarouselMixin,
    SelectMixin,
    KeyboardNavigationMixin,
    ImageUtilityMixin
  ],
  methods: {
    removeselectedChipItem (index) {
      // console.log('index', index)
      this.selectBtn(null, null, index)
    },
    checkIndex (index) {
      if (index === 0) {
        return 0
      } else {
        return false
      }
    }
  }
}
</script>

<style>
.kai-card-carousel-transform {
    transform: var(--carousel_translate);
}

.kai-card-carousel-nav-left-container {
  padding: 0px;
}
.kai-card-carousel-nav-right-container input, .kai-card-carousel-nav-left-container input {
    width: 8px;
    margin: auto;
}
.bottom-bar-right-fade {
    height: 35px;
    width: 80px;
    position: absolute;
    right: 0;
    background: -moz-linear-gradient(left,  rgba(255,255,255,0) 0%, rgba(255,255,255,0) 1%, rgba(255,255,255,1) 100%); /* FF3.6-15 */
    background: -webkit-linear-gradient(left,  rgba(255,255,255,0) 0%,rgba(255,255,255,0) 1%,rgba(255,255,255,1) 100%); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(to right,  rgba(255,255,255,0) 0%,rgba(255,255,255,0) 1%,rgba(255,255,255,1) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00ffffff', endColorstr='#ffffff',GradientType=1 ); /* IE6-9 */

}
.bottom-bar-left-fade {
    height: 35px;
    width: 25px;
    position: absolute;
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

#kai-chip-panel {
    position: fixed;
    bottom:10px;
    width: calc(100% - 77px);
    z-index: 14;
    height: 48px;
    background-color: #fff;
    /* padding: 0 0 0 10px; */
    border-radius: 20px;
}

.select-chip-panel {
  width: calc(100% - 0px);
  float: left;
  overflow-x: hidden;
  margin-top: -3px;
}

.selected-tag-wrapper {
      cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    border-radius: 2px;
    background-color: #DDDDDD;
    font-size: var(--inline-button-font-size);
    line-height: 35px;
    height: 36px;
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex;
    margin-right: 8px;
    color: #1D202A;
    border-radius: 7px;
    position: relative;
    outline: none;
}

.selected-tag-item {
  float: left;
}

.selected-tag-wrapper:focus {
  outline: none;
  box-shadow: 0 0 5px 3px var(--highlight-color);
}

.selected-txt {
  padding: 0 10px;
  font-weight: bold;
  float: left;
}

.selected-delete-btn {
  margin: 8px 8px 8px -3px;
  float: right;
  background-color: #999;
  border-radius: 50%;
  height: 20px;
  width: 20px;
}

.selected-delete-btn:focus{
  outline: none;
  box-shadow: 0 0 5px 3px var(--highlight-color);
}

.selected-delete-icon {
  color: #ffffff;
  font-size: 18px;
  line-height: 18px;
  margin-left: 5.4px;
}

.send-wrapper {
  margin-right: 20px;

  }
  .send-button {
   background-color: var(--secondary-action-color);
    cursor: pointer;
    float: right;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    font-size: var(--bottom-bar-font-size);
    font-weight: bold;
    text-transform: uppercase;
    margin-top: 9px;
    right: -52px;
    border: 0px;
    color: #fff;
    -webkit-box-shadow: 2px 5px 8px -4px #000000;
    box-shadow: 2px 5px 8px -4px #000000;
    opacity: 0;
    position: absolute;
    z-index: 1234;
 }

 .notif-chip {
    background: #f8eaeb;
    border-top: 1px solid #CA595F;
    position: fixed;
    padding: 8px;
    bottom: 71px;
    width: calc(100% - 0px);
    text-align: center;
    z-index: 1;
    font-size: 14px;
    font-weight: bold;
}

  .webview_container_widget .webview_container_widget {
    height: 680px;
  }

  .webview_container_widget .notif-chip {
    width: 385px;
  }

  @media screen and (max-width: 435px) {
    .webview_container_widget .notif-chip {
      width: 100%;
    }
  }

  .webview_container_widget #kai-chip-panel {
    width: 309px;
    bottom: 41px;
  }

  .kai-select-wrapper {
    margin: 10px 0 10px 6px;
  }

  .select-chip-panel .kai-card-carousel-nav-left-container {
    width: 24px;
    height: 24px;
    margin-left: 3px;
    margin-right: 8px;
  }

  .select-chip-panel .kai-card-carousel-nav-left {
    left: 19.33%;
    top: 22.73%;
    width: 14px;
    height: 14px;
  }

  .select-chip-panel .kai-card-carousel-nav-right-container {
    width: 24px;
    height: 24px;
    margin-left: 8px;
    margin-right: 8px;
  }

  .select-chip-panel .kai-card-carousel-nav-right {
    left: 19.33%;
    top: 22.73%;
    width: 14px;
    height: 14px;
  }

@media screen and (max-width: 435px) {
  #kai-chip-panel {
    bottom: 10px;
  }

  .webview_container_widget #kai-chip-panel {
    width: calc(100% - 77px);
    bottom: 10px;
  }
}

</style>

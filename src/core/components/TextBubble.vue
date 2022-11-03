<template>
<div class="kai-user-wrapper kai-row clear" role="none" v-bind:class="[Position]+'-wrapper'" ref="cardItem" >
  <div class="kai-chat-wrapper">
    <!-- Chat Message Icon -->
    <MessageProfileImage v-if="Position === 'kai-left' && ShowIcon && showMessageProfileImage" aria-hidden="true"></MessageProfileImage>
    <!-- Chat Message -->
    <div class="kai-chat-row" role="none">
      <div class="kai-chat-message"  :aria-label="ScreenReaderLabel" role="text" v-bind:class="[Position, { 'img-space' : showMessageProfileImage === true && Position === 'kai-left'}]" tabindex="0" >
        <div class="left-border" aria-hidden="true" v-if="Position === 'kai-left'"></div>
        <div class="right-border" aria-hidden="true" v-if="Position === 'kai-right'"></div>
        <div class="kai-chat-message-text" aria-hidden="true" v-if="Text && Text.length > 0" v-html="Text" :style="this.displayFixed && Position === 'kai-left' ? 'max-height:' + this.mainElementMaxHeight + 'px;': ''" :class="{fixed: this.displayFixed && showExpandButton}"></div>
        <div v-if="showExpandButton && Position === 'kai-left'" class="card-expand-button-wrapper" :class="{expanded:isExpanded}" v-tap="(e) => clickExpandButton(e)">
          <img v-if="!isExpanded" aria-hidden="true" class="card-expand-button" ondragstart="return false;" :src="expandIconSrc" width="20">
          <img v-if="isExpanded" aria-hidden="true" class="card-expand-button" ondragstart="return false;" :src="collapseIconSrc" width="20">
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import MessageProfileImage from './MessageProfileImage'
import TextMixin from './Mixin/TextMixin'
import CardMixin from './Mixin/CardMixin'
import ImageUtilityMixin from './Mixin/ImageUtilityMixin'

import './styles/TextBubble.less'

export default {
  name: 'TextBubble',
  templateOverride: '#textBubble-override',
  props: ['payload'],
  data: function () {
    return {
      fontSize: window.$store.getters.getTextMessageFontSize,
      isTextBubble: true,
      cardMainElement: 'kai-chat-message-text',
      // card elements that enter in consideration to calculate the main element maximum Height
      cardElements: [],
      showMessageProfileImage: false
    }
  },
  mixins: [
    TextMixin,
    CardMixin,
    ImageUtilityMixin
  ],
  methods: {},
  mounted () {
    this.showMessageProfileImage = !$store.state.useAvatar || $store.getters.isLiveAgentConnected
  },
  computed: {
    // a computed getter
    Text: function () {
      var text
      if (this.payload && this.payload.message && this.payload.message.length > 0) {
        text = this.linkify(this.payload.message)
      } else if (this.$slots.default && this.$slots.default.message && this.$slots.default.message.length > 0) {
        text = this.linkify(this.$slots.default.message)
      }

      return this.lineBreak(text)
    },
    Position: function () {
      if (this.payload && this.payload.position && this.payload.position.length > 0) {
        return this.payload.position
      } else {
        // `this` points to the vm instance
        return this.$slots.default.position
      }
    },
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
    },
    ScreenReaderLabel: function () {
      var screenReaderCurrentDate = moment().format('hh:mm A')
      var screenReader = $store.getters.getBotLanguages.translations.screenReader
      var sender = screenReader.userDesignation + ' ' + screenReader.say

      if (this.Position === 'kai-left' || this.Position === 'kai-right') {
        if (this.Position === 'kai-left' && this.ShowIcon) {
          sender = screenReader.virtualAssistantDesignation + ' ' + screenReader.said
        }
        // return screenReaderCurrentDate + '.  ' + screenReader.sentBy + ' ' + sender + '. ' + this.Text
        return screenReader.timeSendAt + ' ' + screenReaderCurrentDate + ',  ' + sender + ': ' + this.Text
      } else {
        return ''
      }
    }
  },
  components: {
    MessageProfileImage
  }
}
</script>

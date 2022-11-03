<template>
<section>
    <div class="kai-card-item"  :class="{adaptive:isAdaptiveItemMode && !itemWithFixedHeight, fixed:this.displayFixed}" ref="cardItem">
        <Medium @mediumLoaded="calculateMainElementMaxHeight()" :medium="item.data.medium" :isExpanded="this.isExpanded"></Medium>
        <div class="kai-card-item-footer">
            <div class="kai-card-text-container">
                <!-- TITLE -->
                <div v-if="this.item.data.title" class="kai-card-title" v-html="this.item.data.title"></div>
                <!-- SUB TITLE -->
                <div v-if="this.item.data.subtitle" class="kai-card-subtitle" :style="this.displayFixed  ? 'max-height:' + this.mainElementMaxHeight + 'px;': ''" :class="{fixed: this.displayFixed && showExpandButton}" v-html="subtitleToDisplay(item)"></div>
                <div v-if="showExpandButton" class="card-expand-button-wrapper" :class="{expanded:isExpanded}" v-tap="(e) => clickExpandButton(e, index)">
                    <img v-if="!isExpanded" aria-hidden="true" class="card-expand-button" ondragstart="return false;" :src="expandIconSrc" width="20">
                    <img v-if="isExpanded" aria-hidden="true" class="card-expand-button" ondragstart="return false;" :src="collapseIconSrc" width="20">
            </div>
            </div>
            <div class="kai-card-button-container" :class="{fixed: this.displayFixed}">
                <!-- CARD BUTTON -->
                <div class="kai-card-button" v-for="(button, buttonIndex) in validButtons(this.item.data.buttons)" :key="buttonIndex" v-html="button.label" v-tap="(e) => itemButton(e, button)"></div>
            </div>
        </div>

    </div>
</section>
</template>

<script>
import CardMixin from './Mixin/CardMixin'
import Medium from './Medium'
import TextMixin from './Mixin/TextMixin'
import ImageUtilityMixin from './Mixin/ImageUtilityMixin'
import './styles/CustomKIMCard.less'

export default {
  name: 'CustomKIMCard',
  props: ['item'],
  components: {
    Medium
  },
  mixins: [
    CardMixin,
    TextMixin,
    ImageUtilityMixin
  ],
  methods: {
    // a computed getter
    subtitleToDisplay: function (item) {
      var text = this.linkify(this.item.data.subtitle)
      return this.lineBreak(text)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
</style>

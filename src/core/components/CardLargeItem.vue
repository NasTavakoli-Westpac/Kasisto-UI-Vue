<template>
<div class="kai-card-large-item" :aria-label="ScreenReaderLabel" v-bind:class="{kai_card_button_active_border: isSelect && this.$parent.selectedItemsIndex.includes(index), adaptive:isAdaptiveItemMode && !itemWithFixedHeight, fixed:this.displayFixed, disabled: isSelect && this.$parent.isDisable}" ref="cardItem">

  <div class="item kai-card-large-template">

    <div class="card-content-left">

      <div class="item-wrapper" :class="{item_block: useInlineButton && startOnSameLine && !item.payload.medium && item.payload.subtitle}">

        <div class="card-content-right">
          <Medium v-if="item.payload.medium" class="img-wrapper" :medium="item.payload.medium"></Medium>

        </div>
        <div class="header">
          <div class="checkmark-listview-select" v-if="item.payload.title" v-html="item.payload.title"></div>
          <div class="checkmark-listview-select" v-else v-html="item.value"></div>
        </div>

        <div class="item-text" v-html="subtitleToDisplay(item)" :style="this.displayFixed  ? 'max-height:' + this.mainElementMaxHeight + 'px;': ''" :class="{fixed: this.displayFixed && showExpandButton}"></div>

        <!-- use inline buttons on the same line as subtitle when there is no medium to display -->
        <section class="no-medium-btn-wrap" tabindex="0" navLvl="1" navDir="vertical" v-if="useInlineButton && startOnSameLine && !item.payload.medium">
          <div class="edit-btn list-inline-button-item" tabindex="0" navLvl="1" navDir="vertical" v-for="(button, buttonIndex) in item.payload.buttons" :key="buttonIndex" v-on:click="itemButton(button)">
            <div class="list-inline-button-text">
              {{button.label}}
            </div>
          </div>
        </section>
        <!-- use select inline buttons on the same line as subtitle when there is no medium to display -->
        <section v-if="isSelect && useInlineButton && startOnSameLine && !item.payload.medium">
          <div class="list-inline-button-item" tabindex="0" navLvl="1" navDir="vertical" v-on:click="(e) => this.$parent.selectBtn(e, item, index)" v-bind:class="{ kai_card_button_active: this.$parent.selectedItemsIndex.includes(index), disabled: this.$parent.isDisable, fixed: this.displayFixed}">
            <div v-if="item.label" class="list-inline-button-text">
              {{item.label}}
            </div>
            <!-- fallback -->
            <div v-else class="list-inline-button-text">
              {{this.fallbackButtonText}}
            </div>
          </div>
        </section>
      </div>
    </div>

    <!--
<div class="card-content-right">
    <Medium v-if="item.payload.medium" class="img-wrapper" :medium="item.payload.medium"></Medium>
</div>
-->
    <div tabindex="0" navLvl="1" navDir="vertical" role="button" :aria-label="expandButtonLabel" v-if="showExpandButton" class="card-expand-button-wrapper" :class="{expanded:isExpanded}" v-on:click="(e) => clickExpandButton(e, index)">
      <img v-if="!isExpanded" aria-hidden="true" class="card-expand-button" ondragstart="return false;" :src="expandIconSrc" width="20">
      <img v-if="isExpanded" aria-hidden="true" class="card-expand-button" ondragstart="return false;" :src="collapseIconSrc" width="20">
    </div>

  </div>

  <!-- use normal select buttons -->
  <div tabindex="0" navLvl="1" navDir="vertical" v-if="isSelect && !useInlineButton" class="button list-button kai-card-button" v-on:click="(e) => this.$parent.selectBtn(e, item, index)" v-bind:class="{ kai_card_button_active: this.$parent.selectedItemsIndex.includes(index), disabled: this.$parent.isDisable, fixed: this.displayFixed}">{{item.label}}</div>

  <!-- use inline select buttons -->
  <div class="list-inline-buttons-container" :class="{fixed: this.displayFixed}" v-if="isSelect && useInlineButton && startOnSameLine && item.payload.medium || useInlineButton && !startOnSameLine">
    <div tabindex="0" navLvl="1" navDir="vertical" class="list-inline-button-item" v-on:click="(e) => this.$parent.selectBtn(e, item, index)" v-bind:class="{ kai_card_button_active: this.$parent.selectedItemsIndex.includes(index), disabled: this.$parent.isDisable, fixed: this.displayFixed}">
      <div v-if="item.label" class="list-inline-button-text">
        {{item.label}}
      </div>
      <!-- fallback -->
      <div v-else class="list-inline-button-text">
        {{this.fallbackButtonText}}
      </div>
    </div>
  </div>

  <!-- use normal buttons -->
  <section class="block-button-container" v-if="!isSelect && !useInlineButton" :class="{fixed: this.displayFixed}">
    <div tabindex="0" navLvl="1" navDir="vertical" role="button" :aria-label="button.label" class="button list-button kai-card-button" v-for="(button, buttonIndex) in item.payload.buttons" :key="buttonIndex" v-on:click="itemButton(button)">{{button.label}}</div>
  </section>
  <!-- use inline buttons -->
  <div class="list-inline-buttons-container" :class="{fixed: this.displayFixed}" v-if="!isSelect && useInlineButton && startOnSameLine && item.payload.medium || useInlineButton && !startOnSameLine">
    <div tabindex="0" navLvl="1" navDir="vertical" role="button" :aria-label="button.label" class="list-inline-button-item" v-for="(button, buttonIndex) in item.payload.buttons" :key="buttonIndex" v-on:click="itemButton(button)">
      <div class="list-inline-button-text">
        {{button.label}}
      </div>
    </div>
  </div>
  <div class="kai-card-disabled-overlay" v-if="isSelect && this.$parent.isDisable"></div>
</div>
</template>

<script>
import Kai from '../../kai'
import CardMixin from './Mixin/CardMixin'
import TextMixin from './Mixin/TextMixin'
import ImageUtilityMixin from './Mixin/ImageUtilityMixin'
import Medium from './Medium'
import './styles/ListView.less'
import {
  store
} from '../../store/index'
export default {
  name: 'CardLargeItem',
  props: ['item', 'index', 'isSelect'],
  mounted: function () {},
  components: {
    Medium
  },
  mixins: [
    TextMixin,
    CardMixin,
    ImageUtilityMixin
  ],
  data () {
    return {
      selectedItemsIndex: [],
      useInlineButton: store.getters.isInlineButtonModeForList,
      startOnSameLine: store.getters.isInlineButtonStartingOnFirstLine,
      isLargeCard: true,
      cardMainElement: 'item-text',
      // card elements that enter in consideration to calculate the main element maximum Height
      cardElements: [
        {
          className: 'list-inline-buttons-container',
          substract: true
        },
        {
          className: 'block-button-container',
          substract: true
        },
        {
          className: 'kai-card-large-template',
          substract: true
        },
        {
          className: 'item-text',
          substract: false
        }
      ],
      fallbackButtonText: store.getters.getBotLanguages.translations.selectTemplate.fallbackListSubmitButton
    }
  },
  computed: {
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
    }
  },
  methods: {
    itemButton (button) {
      Kai.Core.buttonPressed(button)
    },
    subtitleToDisplay: function (item) {
      var text = this.linkify(item.payload.subtitle)
      return this.lineBreak(text)
    }
  }
}
</script>

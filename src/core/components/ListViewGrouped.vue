<template>
<section class="kai-row">
    <div class="kai-card-large-template" navDir="horizontal" ref="listview">
        <div tabindex="0" navLvl="1" navDir="vertical"  class="kai-card-large-container wrapper">
            <section v-for="(item, i) in this.response.default.payload.contents" :key="i">

                <div class="list-item-separator"  v-if="!item.payload.title && i!=0" ></div>
                <div class="item kai-card-large-template">
                    <div class="item-wrapper" :class="{item_block: useInlineButton && startOnSameLine && !item.payload.medium && item.payload.subtitle}">

<div class="card-content-right">
    <Medium v-if="item.payload.medium" class="img-wrapper" :medium="item.payload.medium"></Medium>

</div>
<div class="header grouped-list" v-if="item.payload.title">
                    <div class="checkmark-listview-select" v-html="item.payload.title"></div>
                </div>
                        <div class="item-text" v-html="subtitleToDisplay(item)"></div>
                        <!-- use inline buttons on the same line as subtitle when there is no medium to display -->
                        <div class="clear"></div>

                        <section class="group-list-btn" v-if="useInlineButton && startOnSameLine && !item.payload.medium">
                          <div  class="list-inline-button-item" tabindex="0" navLvl="1" navDir="vertical" v-for="(button, buttonIndex) in item.payload.buttons" :key="buttonIndex" v-on:click="itemButton(button)">
                              <div class="list-inline-button-text">
                                  {{button.label}}
                              </div>
                          </div>
                        </section>

                    </div>

                </div>
                <div class="group-last-list-item-separator"  v-if="!item.payload.title && i!=0" ></div>
                <!-- use normal buttons -->
                <section v-if="!useInlineButton">
                  <div class="button list-button kai-card-button" tabindex="0" navLvl="1" navDir="vertical"  v-for="(button, buttonIndex) in item.payload.buttons" :key="buttonIndex" v-on:click="itemButton(button)">{{button.label}}</div>
                </section>
                <!-- use inline buttons -->
                <div class="list-inline-buttons-container" v-if="useInlineButton && startOnSameLine && item.payload.medium || useInlineButton && !startOnSameLine">
                    <div class="list-inline-button-item" tabindex="0" navLvl="1" navDir="vertical" v-for="(button, buttonIndex) in item.payload.buttons" :key="buttonIndex" v-on:click="itemButton(button)">
                        <div class="list-inline-button-text">
                            {{button.label}}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</section>
</template>

<script>
import Kai from '../../kai'
import TextMixin from './Mixin/TextMixin'
import Medium from './Medium'
import KeyboardNavigationMixin from './Mixin/KeyboardNavigationMixin'
import './styles/ListView.less'

export default {
  name: 'ListViewGrouped',
  props: ['response'],
  mounted: function () {},
  components: {
    Medium
  },
  mixins: [
    TextMixin,
    KeyboardNavigationMixin
  ],
  data () {
    return {
      useInlineButton: window.$store.getters.isInlineButtonModeForList,
      startOnSameLine: window.$store.getters.isInlineButtonStartingOnFirstLine
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

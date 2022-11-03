<template lang="en">

<section id="header-bar-small">
<div class="webview-header-wrapper" navDir="horizontal">
  <div v-if="useWidgetMode" role="button" :aria-label="screenReaderTranslations.minimize + ' ' + screenReaderTranslations.virtualAssistantDesignation" tabindex="0" navLvl="1" navDir="horizontal" class="minimize-webview" v-on:click="this.toggleWidgetDisplay" ref="keyboardWrapper"><span aria-hidden="true" class="c-icon icon-minimize-webview":style="'background-image: url(' + this.minimizeIcon + ')'"></span></div>
  <div class="webview-header">
    <!-- <div class="right-button" style="">
      <a class="lang" href="#" data-lang="en">EN</a>
    </div> -->
    <Avatar v-if="showAvatar"></Avatar>
    <div v-else class="webview-title">{{title}}</div>
  </div>
  <div class="webview-header-bottom-padding"></div>
</div>
</section>
</template>

<script>

import Avatar from './Avatar'
import KeyboardNavigationMixin from './Mixin/KeyboardNavigationMixin'
import ImageUtilityMixin from './Mixin/ImageUtilityMixin'
import './styles/HeaderBarSmall.less'

export default {
  name: 'HeaderBar',
  data () {
    return {
      response: this.$slots,
      minimizeIcon: this.getImagePath('close.png'), // TODO: should be change with a minimize icon
      title: $store.getters.getBotLanguages.translations.header.title,
      screenReaderTranslations: $store.getters.getBotLanguages.translations.screenReader
    }
  },
  computed: {
    useWidgetMode () {
      return $store.state.useWidgetMode
    },
    showAvatar () {
      return !$store.getters.isSplashScreenEnabled && $store.state.useAvatar
    }
  },
  watch: {
    showAvatar () {
      return !$store.getters.isSplashScreenEnabled
    }
  },
  methods: {
    toggleWidgetDisplay: function () {
      if ($store.state.headerBarConfig && $store.state.headerBarConfig.overrideMinimizeButtonClick) {
        $store.state.headerBarConfig.overrideMinimizeButtonClick()
      } else {
        $store.state.showWebviewWidget = !$store.state.showWebviewWidget
      }
    }
  },
  components: {
    Avatar
  },
  mixins: [
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

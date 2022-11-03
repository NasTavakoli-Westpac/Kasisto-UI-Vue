<template>
   <div class="kai-message-icon">
    <img ref="icon">
  </div>
</template>

<script>
import ImageUtilityMixin from './Mixin/ImageUtilityMixin'

export default {
  name: 'MessageProfileImage',
  mixins: [
    ImageUtilityMixin
  ],
  mounted: function () {
    const icon = this.$refs.icon
    if (!window.$store.getters.isInlineImagesEnabled) {
      icon.addEventListener('error', () => this.onImageLoadError(this, icon))
    }
    if (window.$store.getters.isLiveAgentConnected) {
      this.$options.iconPath = this.getImagePath('live_chat_2.png')
    } else {
      if (!window.$store.getters.isInlineImagesEnabled) {
        this.$options.iconPath = window.$store.state.botWidgetIconUrl
      } else {
        try {
          this.$options.iconPath = require('@/assets/img/' + $store.getters.getBotWidgetIconInlineUrl)
        } catch (error) {
          this.$options.iconPath = $store.getters.getBotWidgetIconInlineUrl
        }
      }
    }
    icon.setAttribute('src', this.$options.iconPath)
  },
  data () {
    return {
      store: window.$store.state
    }
  },
  methods: {
    onImageLoadError (context, element) {
      // if an issue happened just try one more time to run the animation with backup logo
      element.removeEventListener('error', () => context.onImageLoadError(context, element))
      element.setAttribute('src', window.$store.state.botWidgetIconBackupUrl)
    }
  },
  iconPath: null
}
</script>

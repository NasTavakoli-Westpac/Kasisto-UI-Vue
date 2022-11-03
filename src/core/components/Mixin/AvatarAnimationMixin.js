module.exports = {
  data () {
    return {
      imageLoadSuccessHolder: false,
      imageLoadErrorHolder: false
    }
  },
  methods: {
    loadLogoImage (context, anim) {
      const container = document.getElementsByClassName('lottie')[0]
      anim.addEventListener('DOMLoaded', () => {
        // replace in the animation the path to the Logo image used in the Avatar animation
        const imageElements = container.lastChild.getElementsByTagName('image')
        let imageReplaced = false
        for (let i = 0; i < imageElements.length; i++) {
          const element = imageElements[i]
          if (element.getAttribute('href').search('img_0') && element.getAttribute('width') === '300px') {
            imageReplaced = true
            this.imageLoadSuccessHolder = () => context.onImageLoadSuccess(context, element)
            element.addEventListener('load', this.imageLoadSuccessHolder, true)
            if ($store.getters.isLiveAgentConnected) {
              setTimeout(() => element.setAttribute('href', this.getImagePath('live_chat_no_background.png')), 100)
            } else if (!$store.getters.isInlineImagesEnabled) {
              this.imageLoadErrorHolder = () => context.onImageLoadError(context, element)
              element.addEventListener('error', this.imageLoadErrorHolder, true)
              setTimeout(() => element.setAttribute('href', $store.getters.getBotLogoUrl), 100)
            } else {
              try {
                setTimeout(() => element.setAttribute('href', require('@/assets/img/' + $store.getters.getBotLogoInlineUrl)), 100)
              } catch (error) {
                setTimeout(() => element.setAttribute('href', $store.getters.getBotLogoUrl), 100)
              }
            }
          } else {
            imageReplaced = true
          }
        }
        if (!imageReplaced) {
          // run the animation with default logo
          anim.play()
          context.removePreviousAnimation()
        }
        context.runningAnimation = true
      }, true)
    },
    onImageLoadSuccess (context, element) {
      // run the animation only once the image has been loaded to avoid blinking default K logo issue.
      if (element.getAttribute('href').search('img_0') < 0) {
        element.removeEventListener('load', this.imageLoadSuccessHolder, true)
        context.anim.play()
        if (context.removePreviousAnimation) {
          context.removePreviousAnimation()
        }
      }
    },
    onImageLoadError (context, element) {
      // if an issue happened just try one more time to run the animation with backup logo
      element.removeEventListener('error', this.imageLoadErrorHolder, true)
      setTimeout(() => element.setAttribute('href', $store.getters.getBotLogoBackupUrl), 100)
    }
  }
}

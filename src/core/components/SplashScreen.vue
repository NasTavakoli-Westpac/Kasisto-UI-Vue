<template>
<div class="kai-splash-screen" :class="{completed:!runningAnimation}">
  <div class="lottie lottie-isdefault"></div>
</div>
</template>

<script>
import './styles/SplashScreen.less'
import Cookies from 'js-cookie'
import AvatarAnimationMixin from './Mixin/AvatarAnimationMixin'
import ImageUtilityMixin from './Mixin/ImageUtilityMixin'
import Kai from '../../kai'

import Lottie from 'lottie-web'

export default {
  name: 'SplashScreen',
  created: function () {
    const _this = this
    setTimeout(function () {
      _this.loadAvatarAnimation()
    }, 0)
  },
  data () {
    return {
      response: this.$slots,
      runningAnimation: true,
      updateAnimationOnCompleted: false,
      currentAvatar: 'splash1_bodymovin',
      anim: undefined
    }
  },
  props: [''],
  components: {},
  mixins: [
    AvatarAnimationMixin,
    ImageUtilityMixin
  ],
  computed: { // Listen to see if store state change
    playAnimation () {
      return $store.state.showWebviewWidget && $store.state.useSplashScreen
    }
  },
  watch: {
    playAnimation () {
      this.anim.play()
    }
  },
  methods: {
    async loadAvatarAnimation () {
      const _this = this

      // Object
      const avatarObj = {
        container: document.getElementsByClassName('lottie')[0], // the dom element that will contain the animation
        renderer: 'svg',
        loop: false,
        autoplay: false
      }
      if ($store.getters.isInlineAvatarEnabled) {
        avatarObj.animationData = await Kai.API.getAvatarFile('splash1_bodymovin')
      } else {
        avatarObj.path = await Kai.API.getAvatarFile('splash1_bodymovin')
      }

      // Attach object
      this.anim = Lottie.loadAnimation(avatarObj)

      this.loadLogoImage(_this, this.anim)
      this.anim.addEventListener('complete', function () {
        _this.runningAnimation = false
        _this.anim.destroy()
        $store.state.useSplashScreen = false
        if ($store.state.splashScreenSettings.skipAfterFirstTimeLaunch) {
          if ($store.state.splashScreenSettings.skipForNDays &&
            $store.state.splashScreenSettings.skipForNDays > 0) {
            var expiringDate = new Date(new Date().getTime() + $store.state.splashScreenSettings.skipForNDays * 24 * 60 * 60 * 1000)
            Cookies.set('k_splashscreen_opened', true, { expires: expiringDate })
          } else {
            Cookies.set('k_splashscreen_opened', true)
          }
        }
      })
    }
  }
}
</script>

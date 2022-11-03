<template>
<div class="kai-avatar">
  <div class="lottie lottie-isdefault" aria-hidden="true" data-bm-renderer="svg"></div>
</div>
</template>

<script>

import './styles/Avatar.less'
import avatarPlaygroundJsonData from '../../debug/avatar_hd_playground.json'
import avatarIdleJsonData from '../../debug/avatar_hd_idle.json'
import AvatarAnimationMixin from './Mixin/AvatarAnimationMixin'
import ImageUtilityMixin from './Mixin/ImageUtilityMixin'
import Kai from '../../kai'

import Lottie from 'lottie-web'

export default {
  name: 'Avatar',
  created: function () {
    const _this = this
    // If Avatar are enable in the WV config, initialize with the following Avatar name
    if ($store.state.useAvatar) {
      setTimeout(function () {
        let tempAvatar
        if ($store.getters.getAvatar) {
          tempAvatar = $store.getters.getAvatar
          $store.state.avatar = false
        }
        _this.loadAvatarAnimation()
        if (tempAvatar) {
          setTimeout(() => {
            $store.state.avatar = tempAvatar
            _this.updateAnimationOnCompleted = true
          }, 100)
        }
      }, 0)
      this.createIdleTimer()
    }
  },
  data () {
    return {
      response: this.$slots,
      runningAnimation: false,
      updateAnimationOnCompleted: false,
      avatarlargeCount: 0,
      currentAvatar: 'splash2_bodymovin',
      anim: undefined,
      idleAnimationIndex: 0,
      idleAvatarTimerHolder: false
    }
  },
  mixins: [
    AvatarAnimationMixin,
    ImageUtilityMixin
  ],
  computed: { // Listen to see if store state change
    updateAvatar () {
      return this.$store.getters.getAvatar
    },
    resetTimer () {
      return this.$store.getters.isUserTyping || (this.$store.getters.getRenderingStatus === 'started')
    }
  },
  watch: {
    updateAvatar () {
      if (!this.runningAnimation) {
        this.loadAvatarAnimation()
      } else {
        this.updateAnimationOnCompleted = true
      }
    },
    resetTimer () {
      this.createIdleTimer()
    }
  },
  methods: {
    async loadAvatarAnimation () {
      const _this = this
      this.createIdleTimer()
      const avatar = $store.getters.getAvatar
      if (avatar.data && avatar.data.name) {
        this.currentAvatar = this.mapNameToFile(avatar.data.name)
      } else if (avatar.payload && avatar.payload.state_name) {
        this.currentAvatar = this.mapNameToFile(avatar.payload.state_name)
      }
      // Object
      const avatarObj = {
        container: document.getElementsByClassName('lottie')[0], // the dom element that will contain the animation
        renderer: 'svg',
        loop: !!(avatar.data && avatar.data.loop),
        autoplay: false
      }
      if ($store.getters.isInlineAvatarEnabled) {
        avatarObj.animationData = await Kai.API.getAvatarFile(this.currentAvatar)
        const asset = avatarObj.animationData.assets.filter(asset => asset.id === 'image_0')[0]
        asset.p = require('@/avatars/images/img_0.png')
        asset.e = true
      } else {
        avatarObj.path = await Kai.API.getAvatarFile(this.currentAvatar)
      }
      // Attach object
      this.anim = Lottie.loadAnimation(avatarObj)

      this.loadLogoImage(_this, this.anim)

      this.anim.addEventListener('complete', function () {
        _this.completeAnimation()
      })
      this.anim.addEventListener('loopComplete', function () {
        // when animation is looping we reset the Idle Timer to not interrupt it.
        _this.createIdleTimer()

        _this.completeAnimation()
      })
    },
    completeAnimation () {
      this.runningAnimation = false
      if (this.updateAnimationOnCompleted) {
        this.updateAnimationOnCompleted = false
        this.loadAvatarAnimation()
      }
    },
    removePreviousAnimation () {
      const container = document.getElementsByClassName('lottie')[0]
      // remove the previous animation svg child (if any) only once the new animation start playing
      this.$nextTick(() => {
        while(container.childNodes !== undefined && container.childNodes.length > 1) {
          container.removeChild(container.childNodes[0])
        }
      })
    },
    createIdleTimer () {
      const _this = this
      if (this.idleAvatarTimerHolder) {
        clearTimeout(this.idleAvatarTimerHolder)
      }
      this.idleAvatarTimerHolder = setTimeout(function () {
        _this.presentIdleTimer()
        _this.createIdleTimer()
      }, 20000)
    },
    presentIdleTimer () {
      if (this.idleAnimationIndex === 0) {
        this.idleAnimationIndex++
        $store.dispatch('actionAvatarUpdate', JSON.parse(JSON.stringify(avatarPlaygroundJsonData.message_contents[0].payload)))
        // trigger the playground avatar again a few milliseconds later
        setTimeout(function () {
          // We use JSON.parse and stringify to create a new object and make sure the Vue mutation is getting triggered
          $store.dispatch('actionAvatarUpdate', JSON.parse(JSON.stringify(avatarPlaygroundJsonData.message_contents[0].payload)))
        }, 500)
      } else {
        this.idleAnimationIndex = 0
        $store.dispatch('actionAvatarUpdate', JSON.parse(JSON.stringify(avatarIdleJsonData.message_contents[0].payload)))
      }
    },
    mapNameToFile (name) {
      const nameUpperCase = name.toUpperCase()
      if (nameUpperCase === 'DEFAULT_AVATAR_STATE') {
        return 'active_bodymovin'
      }
      if (nameUpperCase === 'CHAT_WITH_ME_AVATAR_STATE') {
        return 'chat_icon_bodymovin'
      }
      if (nameUpperCase === 'CHECKMARK_AVATAR_STATE') {
        return 'checkmark_bodymovin'
      }
      if (nameUpperCase === 'EXTENDED_IDLE(ZZZ)_AVATAR_STATE') {
        return 'idle_bodymovin'
      }
      // if (nameUpperCase === '') {
      //   return 'leaving_bodymovin'
      // }
      // if (nameUpperCase === '') {
      //   return 'notification_bodymovin'
      // }
      if (nameUpperCase === 'INTERIM_IDLE_AVATAR_STATE') {
        return 'playground_bodymovin'
      }
      if (nameUpperCase === 'QUESTION_AVATAR_STATE') {
        return 'question_bodymovin'
      }
      if (nameUpperCase === 'SORRY_AVATAR_STATE') {
        return 'sorry_bodymovin'
      }
      if (nameUpperCase === 'THANK_YOU_AVATAR_STATE') {
        return 'thank_you_bodymovin'
      }
      if (nameUpperCase === 'TRANSACTION_AVATAR_STATE') {
        return 'transaction_bodymovin'
      }
      return name
    }
  }
}
</script>

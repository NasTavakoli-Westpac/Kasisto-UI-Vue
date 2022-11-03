<template>
<div class="kai-user-wrapper kai-row clear">
    <div class="kai-chat-wrapper">
        <!-- Chat Message Icon -->
        <MessageProfileImage v-if="!this.useAvatar"></MessageProfileImage>
        <div class="kai-typing-indicator-wrapper" :class="{ 'img-space' : this.useAvatar == false}">
           <div class="left-border" ></div>
            <div class="kai-typing-indicator">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import MessageProfileImage from './MessageProfileImage'

import './styles/TypingIndicator.less'

export default {
  name: 'TypingIndicator',
  mounted: function () {
  },
  computed: {
    useAvatar: function () {
      return $store.state.useAvatar
    }
  },
  watch: {

  },
  methods: {

  },
  components: {
    MessageProfileImage
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<template>
<section class="kai-row">
    <div class="live-chat-screen-intro">
        <h1 class="live-chat-title" placeholder="placeholder">{{this.title}}</h1>
        <p class="live-chat-message" placeholder="placeholder">{{this.additionalMessage}}</p>
        <div class="live-chat-circle" v-if="this.agentImageSrc"><img class="thumb-icon" v-bind:src="this.agentImageSrc" width="100%"></div>
    </div>
</section>
</template>

<script>
import {
  store
} from '../../store/index'
import Kai from '../../kai'
import ImageUtilityMixin from './Mixin/ImageUtilityMixin'
import './styles/LiveChat.less'

export default {
  name: 'LiveChat',
  mixins: [
    ImageUtilityMixin
  ],
  data () {
    return {
      title: store.getters.getBotLanguages.translations.liveChatMessages.customerQueue,
      additionalMessage: (this.$slots.default !== undefined) ? this.$slots.default.payload : '',
      agentImageSrc: false
    }
  },
  created () {
    // Listen to see if store state change
    this.unwatchEvent = this.$watch(function () {
      return $store.getters.getLastEvent
    }, (newVal, oldVal) => {
      this.processEvent(newVal)
    })
  },
  methods: {
    // Run method if store state change
    processEvent (event) {
      if (event) {
        if (event.payload.type === 'LIVE_CHAT_NOTIFY_CUSTOMER_QUEUE_STATE') {
          this.title = window.$store.getters.getBotLanguages.translations.liveChatMessages.customerQueue
          this.additionalMessage = event.payload.message_contents[0].payload.text
          this.agentImageSrc = this.getImagePath('Wait_1.png')
        }
        if (event.payload.type === 'LIVE_CHAT_NOTIFY_AGENT_CONNECTED') {
          window.$store.state.liveAgentConnected = true
          this.title = window.$store.getters.getBotLanguages.translations.liveChatMessages.agentConnected
          this.additionalMessage = event.payload.message_contents[0].payload.text
          this.agentImageSrc = this.getImagePath('live_chat_2.png')

          // we call unwatchEvent() here, because once agent is connected we don't want to update anymore this current LiveChat component.
          // A new LiveChat component instance will be used when the next live chat session stopped event is received
          this.unwatchEvent()
        }
        if (event.payload.type === 'LIVE_CHAT_NOTIFY_SESSION_STOPPED' || event.payload.type === 'LIVE_CHAT_NOTIFY_NOT_AVAILABLE') {
          this.title = window.$store.getters.getBotLanguages.translations.liveChatMessages.sessionStopped
          if (event.payload.message_contents && event.payload.message_contents.length > 0 && event.payload.message_contents[0].payload && event.payload.message_contents[0].text) {
            this.additionalMessage = event.payload.message_contents[0].payload.text
          }
          this.agentImageSrc = false

          window.$store.state.liveChatStarted = false
          window.$store.state.liveAgentConnected = false
          window.$store.state.lastEvent = []

          // we call unwatchEvent() here, to prevent updating this component for future instance of the live chat component
          // (i.e. if user start another live chat session later...)
          this.unwatchEvent()
        }
      }
    },
    processResponse (response) {
      // Create hook to just show content
      Kai.Core.handleResponse(response)
    }
  }
}
</script>

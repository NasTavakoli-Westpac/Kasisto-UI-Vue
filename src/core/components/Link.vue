<template>
  <div class="kai-user-wrapper kai-row clear">
    <div class="kai-chat-wrapper">
      <div class="kai-chat-row">
        <div class="kai-chat-message">
          <div class="kai-chat-message-text">
            <a
              :href="this.response.default.payload.payload"
              target="__blank"
              v-html="this.response.default.payload.label"
            ></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import './styles/TextBubble.less'

export default {
  name: 'Link',
  templateOverride: '#textBubble-override',
  mounted: function () {},
  data: function () {
    return {
      response: this.$slots
    }
  },
  methods: {},
  computed: {}
}
</script>

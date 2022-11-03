<template>
<section class="card-single-wrapper">
    <div class="kai-row"></div>
    <div class="kai-card-wraper kai-card-single" tabindex="0">
        <MessageProfileImage v-if="ShowIcon && showMessageProfileMessage"  aria-hidden="true"></MessageProfileImage>
        <CardItem v-if="this.response.default.type === 'CARD'" :item="this.response.default"></CardItem>
    </div>
</section>
</template>

<script>
import CardItem from './CardItem'
import MessageProfileImage from './MessageProfileImage'

export default {
  name: 'CardSingle',
  data () {
    return {
      response: this.$slots,
      showMessageProfileImage: false
    }
  },
  mounted () {
    this.showMessageProfileImage = !$store.state.useAvatar || $store.getters.isLiveAgentConnected
  },
  components: {
    CardItem,
    MessageProfileImage
  },
  computed: {
    ShowIcon: function () {
      if (this.payload) {
        if (this.payload.showIcon) {
          return true
        } else {
          return false
        }
      } else {
        // `this` points to the vm instance
        if (this.$slots.default && this.$slots.default.showIcon) {
          return this.$slots.default.showIcon
        } else {
          return false
        }
      }
    }
  }
}
</script>
<style scoped>
    .kai-card-single {
    margin-bottom: 35px;
    }
</style>

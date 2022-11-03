<template>
<section>
  <section class="kai-row" v-if="ShowIcon && showMessageProfileImage">
          <MessageProfileImage aria-hidden="true"></MessageProfileImage>
  </section>
  <section class="kai-row">
    <div class="kai-card-large-template" navDir="horizontal" ref="listview">
          <CardLargeItem  class="kai-card-large-container wrapper" v-for="(item, i) in this.response.default.payload.contents" :key="i" :item="item" :index="i" :isGroupedList="useGroupedListMode" isref="item">
          </CardLargeItem>
    </div>
  </section>
</section>
</template>

<script>
import CardLargeItem from './CardLargeItem'
import KeyboardNavigationMixin from './Mixin/KeyboardNavigationMixin'
import MessageProfileImage from './MessageProfileImage'
import './styles/ListView.less'

export default {
  name: 'ListView',
  props: ['response'],
  mounted () {
    this.showMessageProfileImage = !$store.state.useAvatar || $store.getters.isLiveAgentConnected
  },
  components: {
    CardLargeItem,
    MessageProfileImage
  },
  data () {
    return {
      useGroupedListMode: window.$store.getters.getGroupedListMode,
      showMessageProfileImage: false
    }
  },
  mixins: [
    KeyboardNavigationMixin
  ],
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
        return this.response.default.showIcon
      }
    }
  }
}

</script>

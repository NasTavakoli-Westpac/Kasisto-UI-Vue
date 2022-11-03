<template>
<section style="height:100%;">
    <GoogleSearch v-if="searchEngine === 'googlesearchengine'" :query="this.query" :isFromQuickReply="this.isFromQuickReply"></GoogleSearch>
    <SilverCloudSearch v-else-if="searchEngine === 'silvercloud'" :query="this.query" :isFromQuickReply="this.isFromQuickReply"></SilverCloudSearch>
</section>
</template>

<script>
import GoogleSearch from './GoogleSearch'
import SilverCloudSearch from './SilverCloudSearch'

export default {
  name: 'Search',
  props: ['item'],
  components: {
    GoogleSearch,
    SilverCloudSearch
  },
  mounted () {
    // .searchEngine = 'googlesearchengine' 'silvercloud'

    if (this.item) {
      if (this.item.searchEngine) {
        this.searchEngine = this.item.searchEngine
      } else if (this.item.type === 'WEB_SEARCH_SILVERCLOUD') {
        this.searchEngine = 'silvercloud'
      } else {
        // type 'WEB_SEARCH' or 'WEB_SEARCH_GOOGLE'
        this.searchEngine = 'googlesearchengine'
      }
      this.isFromQuickReply = false
    } else if (this.response.default) {
      if (this.response.default.searchEngine) {
        this.searchEngine = this.response.default.searchEngine
      } else if (this.response.default.type === 'WEB_SEARCH_SILVERCLOUD') {
        this.searchEngine = 'silvercloud'
      } else {
        // type 'WEB_SEARCH' or 'WEB_SEARCH_GOOGLE'
        this.searchEngine = 'googlesearchengine'
      }
      this.isFromQuickReply = true
    }
    if (this.item && this.item.data && this.item.data.query) {
      this.query = this.item.data.query
    } else if (this.response && this.response.default && this.response.default.payload && this.response.default.payload.query) {
      this.query = this.response.default.payload.query
    } else {
      this.query = $store.state.lastUserMessage.payload.text
    }
  },
  data () {
    return {
      response: this.$slots,
      searchEngine: false,
      query: false,
      isFromQuickReply: false
    }
  }
}
</script>

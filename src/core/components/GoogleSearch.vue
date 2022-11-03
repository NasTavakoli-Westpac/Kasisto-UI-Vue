<template>
<section class="search">
  <div v-for="(googleResponse, responseIndex) in googleResponses" :key="responseIndex">
    <TextBubble v-if="resultMessages[responseIndex]" :payload="resultMessages[responseIndex]"></TextBubble>
    <ListView :response="googleResponse"></ListView>
  </div>
  <div v-if="this.showNext" class="kai-card-wraper quick-reply kai-card-carousel-transform">
    <div class="kai-quick-reply-item" tabindex="0" v-on:click="(e) => this.getNextPage()">
      <div v-html="this.nextLabel" class="quickreplies kai-quick-reply-label"></div>
    </div>
  </div>
</section>
</template>

<script>
import ListView from './ListView'
import TextBubble from './TextBubble'

export default {
  name: 'GoogleSearch',
  templateOverride: '#textBubble-override',
  props: ['query', 'isFromQuickReply'],
  data: function () {
    return {
      googleResponses: [],
      resultMessages: [],
      startIndex: 1,
      showNext: false,
      nextLabel: $store.getters.getBotLanguages.translations.searchTemplate.nextPageLabel
    }
  },
  mounted () {
    this.performSearch()
  },
  methods: {
    getNextPage () {
      if (this.showNext) {
        this.startIndex = this.startIndex + $store.state.searchEngineNumberOfResult
        this.performSearch()
      }
    },
    performSearch () {
      if (!$store.state.searchEngineGoogleID && !$store.state.searchEngineGoogleAPIKey) {
        console.log('WARNING - the Custom Search Engine ID and API Key need to be set to display search result!')
      } else {
        $store.state.typingIndicator = true
        var searchEngineURL = 'https://www.googleapis.com/customsearch/v1?key=' + $store.state.searchEngineGoogleAPIKey + '&cx=' + $store.state.searchEngineGoogleID + '&q=' + this.query + '&num=' + $store.state.searchEngineNumberOfResult + '&start=' + this.startIndex
        fetch(
          searchEngineURL
        )
          .then(
            res => {
              $store.state.typingIndicator = false
              return res.json()
            }
          )
          .then(
            data => {
              var payload = {}
              payload.position = 'kai-left'
              payload.showIcon = false
              if (this.startIndex === 1) {
                if (data.items && data.items.length > 0) {
                  if (!this.isFromQuickReply) {
                    if ($store.getters.getBotLanguages.translations.searchTemplate.firstResultMessage && $store.getters.getBotLanguages.translations.searchTemplate.firstResultMessage.length > 0) {
                      payload.message = $store.getters.getBotLanguages.translations.searchTemplate.firstResultMessage
                    }
                  } else {
                    if ($store.getters.getBotLanguages.translations.searchTemplate.firstResultMessageQuickReply && $store.getters.getBotLanguages.translations.searchTemplate.firstResultMessageQuickReply.length > 0) {
                      payload.message = $store.getters.getBotLanguages.translations.searchTemplate.firstResultMessageQuickReply
                    }
                  }
                } else {
                  if (!this.isFromQuickReply) {
                    if ($store.getters.getBotLanguages.translations.searchTemplate.noResultMessage && $store.getters.getBotLanguages.translations.searchTemplate.noResultMessage.length > 0) {
                      payload.message = $store.getters.getBotLanguages.translations.searchTemplate.noResultMessage
                    }
                  } else {
                    if ($store.getters.getBotLanguages.translations.searchTemplate.noResultMessageQuickReply && $store.getters.getBotLanguages.translations.searchTemplate.noResultMessageQuickReply.length > 0) {
                      payload.message = $store.getters.getBotLanguages.translations.searchTemplate.noResultMessageQuickReply
                    }
                  }
                }
              } else if ($store.getters.getBotLanguages.translations.searchTemplate.nextResultMessage) {
                payload.message = $store.getters.getBotLanguages.translations.searchTemplate.nextResultMessage
                payload.showIcon = true
              }
              this.resultMessages.push(payload)

              var temp = {
                default: {
                  payload: {
                    contents: []
                  }
                }
              }

              for (var i in data.items) {
                var card = {}
                card.type = 'CARD'
                card.payload = {}
                card.payload.title = data.items[i].htmlTitle
                card.payload.subtitle = data.items[i].snippet
                temp.default.payload.contents.push(card)
                var button = {}
                button.type = 'HYPERLINK'
                button.payload = data.items[i].formattedUrl
                button.label = data.items[i].displayLink
                card.payload.buttons = [button]
                if (data.items[i] && data.items[i].pagemap && data.items[i].pagemap.cse_thumbnail) {
                  var medium = {}
                  medium.type = 'text'
                  medium.medium_url = data.items[i].pagemap.cse_thumbnail[0].src
                  card.payload.medium = medium
                }
              }
              this.googleResponses.push(temp)
              if (data.queries.nextPage && data.queries.nextPage.length > 0) {
                this.showNext = true
              }
              setTimeout(() => {
                $store.dispatch('actionRenderingStatus', 'started')
              }, 100)

              return console.log(data)
            }
          )
          .catch(err => console.error(err))
      }
    }
  },
  computed: {},
  components: {
    ListView,
    TextBubble
  }
}
</script>

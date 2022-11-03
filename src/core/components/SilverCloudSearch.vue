<template>
<section class="search">
  <div v-for="(silverCloudResponse, responseIndex) in silverCloudResponses" :key="responseIndex">
    <TextBubble v-if="resultMessages[responseIndex]" :payload="resultMessages[responseIndex]"></TextBubble>
    <ListView :response="silverCloudResponse"></ListView>
  </div>
  <div v-if="showNext" class="kai-card-wraper quick-reply kai-card-carousel-transform">
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
  name: 'SilverCloudSearch',
  templateOverride: '#textBubble-override',
  props: ['query', 'isFromQuickReply'],
  data: function () {
    return {
      silverCloudResponses: [],
      silverCloudDetailedResponses: [],
      resultMessages: [],
      startIndex: 0,
      nextLabel: $store.getters.getBotLanguages.translations.searchTemplate.nextPageLabel,
      totalResults: -1,
      showNext: false
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
      if (!$store.state.searchEngineSilverCloudID && !$store.state.searchEngineSilverCloudAPIKey) {
        console.log('WARNING - the Custom Search Engine ID and API Key need to be set to display search result!')
      } else {
        /* c url -X POST "https://litho.silvercloudinc.com/api/v1/products/60cb3bb324c067037b55c250/content?q=taxes"
            -H "accept: application/json"
            -H "Authorization: Token eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2MGNiM2M1MjI0YTM2YTQ5MmNlNDNmMDMiLCJpYXQiOjE2MjQ1NDQ1MTQsImF1ZCI6WyJsaXRoby5zaWx2ZXJjbG91ZGluYy5jb20iLG51bGwsImxvY2FsaG9zdCIsImxvY2FsaG9zdCJdfQ.aT3v02bHETFsEJ0ucwKZ_kajAKVNdPPxBcPRCpnirbQ"
            -H "Content-Type: application/json"
            -d "{ \"order\": \"asc\", \"sort\": \"title\", \"page\": 0, \"per_page\": 10, \"content_types\": [ \"answer\", \"document\" ], \"include_categories\": [ ], \"exclude_categories\": []}"/
         */
        $store.state.typingIndicator = true
        var searchEngineURL = 'https://litho.silvercloudinc.com/api/v1/products/' + $store.state.searchEngineSilverCloudID + '/content?q=' + this.query
        fetch(
          searchEngineURL, {
            method: 'POST',
            // mode: 'cors', // no-cors, *cors, same-origin
            // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            // credentials: 'same-origin', // include, *same-origin, omit
            headers: {
              accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: 'Token ' + $store.state.searchEngineSilverCloudAPIKey
            },
            body: JSON.stringify({
              page: this.startIndex, // (silvercloud pagination starts from 0)
              per_page: $store.state.searchEngineNumberOfResult,
              content_types: ['answer', 'document'],
              include_categories: [],
              exclude_categories: []
            })
          }
        )
          .then(
            res => {
              $store.state.typingIndicator = false
              return res.json()
            }
          )
          .then(
            resp => {
              var payload = {}
              payload.position = 'kai-left'
              payload.showIcon = false
              if (this.startIndex === 0) {
                if (resp.data && resp.data.length > 0) {
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
              if (payload.message && payload.message.length > 0) {
                this.resultMessages.push(payload)
              }

              var temp = {
                default: {
                  payload: {
                    contents: []
                  }
                }
              }
              this.totalResults = resp.total
              this.showNext = this.startIndex < this.totalResults / $store.state.searchEngineNumberOfResult

              for (var i = 0; i < resp.data.length; i++) {
                var card = {}
                card.type = 'CARD'
                card.payload = {}
                card.payload.title = resp.data[i].attributes.title
                card.payload.subtitle = resp.data[i].attributes.preview
                temp.default.payload.contents.push(card)
                var button = {}
                button.type = 'WEB_SEARCH_CONTENT'
                button.payload = {}
                button.payload.query = {
                  id: resp.data[i].id,
                  showContent: true
                }
                button.label = 'View'
                card.payload.buttons = [button]
                // if (resp.data[i].pagemap.cse_thumbnail) {
                //   var medium = {}
                //   medium.type = 'text'
                //   medium.medium_url = resp.data[i].pagemap.cse_thumbnail[0].src
                //   card.payload.medium = medium
                // }
              }
              this.silverCloudResponses.push(temp)
              setTimeout(() => {
                $store.dispatch('actionRenderingStatus', 'started')
              }, 100)

              return console.log(resp.data)
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

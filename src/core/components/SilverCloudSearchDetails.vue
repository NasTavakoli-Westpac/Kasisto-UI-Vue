<template>
<section class="search">
  <section v-if="this.silverCloudDetailedResponses.length > 0" class="card-single-wrapper">
    <div class="kai-row"></div>
    <div class="kai-card-wraper kai-card-single">
      <Card v-for="(item, index) in this.silverCloudDetailedResponses" :key="index" :item="item" :index="index" :id="'kai-card-carousel' + index" ref="item" :containSmallImage="false"></Card>
    </div>
  </section>
</section>
</template>

<script>
import Card from './Card'

export default {
  name: 'SilverCloudSearchDetails',
  templateOverride: '#textBubble-override',
  data: function () {
    return {
      data: this.$slots,
      silverCloudDetailedResponses: [],
      nextLabel: $store.getters.getBotLanguages.translations.searchTemplate.nextPageLabel
    }
  },
  mounted () {
    if (this.data.default.payload.query.showContent) {
      this.fetchContentDetails()
    }
  },
  methods: {
    fetchContentDetails () {
      if (!$store.state.searchEngineSilverCloudID && !$store.state.searchEngineSilverCloudAPIKey) {
        console.log('WARNING - the Custom Search Engine ID and API Key need to be set to display search result!')
      } else {
        /* c url -X POST "https://litho.silvercloudinc.com/api/v1/products/60cb3bb324c067037b55c250/content?q=taxes"
            -H "accept: application/json"
            -H "Authorization: Token eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2MGNiM2M1MjI0YTM2YTQ5MmNlNDNmMDMiLCJpYXQiOjE2MjQ1NDQ1MTQsImF1ZCI6WyJsaXRoby5zaWx2ZXJjbG91ZGluYy5jb20iLG51bGwsImxvY2FsaG9zdCIsImxvY2FsaG9zdCJdfQ.aT3v02bHETFsEJ0ucwKZ_kajAKVNdPPxBcPRCpnirbQ"
            -H "Content-Type: application/json"
            -d "{ \"order\": \"asc\", \"sort\": \"title\", \"page\": 0, \"per_page\": 10, \"content_types\": [ \"answer\", \"document\" ], \"include_categories\": [ ], \"exclude_categories\": []}"/
         */
        var query = this.data.default.payload.query
        $store.state.typingIndicator = true
        var searchEngineURL = 'https://litho.silvercloudinc.com/api/v1/products/' + $store.state.searchEngineSilverCloudID + '/content/' + query.id
        fetch(
          searchEngineURL, {
            method: 'GET',
            // mode: 'cors', // no-cors, *cors, same-origin
            // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            // credentials: 'same-origin', // include, *same-origin, omit
            headers: {
              accept: 'application/json',
              Authorization: 'Token ' + $store.state.searchEngineSilverCloudAPIKey
            }
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
              if (resp.data && resp.data.id === query.id) {
                var card = {}
                card.type = 'CARD'
                card.payload = {}
                card.payload.title = resp.data.attributes.title
                card.payload.subtitle = resp.data.attributes.body
              }
              this.silverCloudDetailedResponses.push(card)
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
    Card
  }
}
</script>

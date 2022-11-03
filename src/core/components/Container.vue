<template>

<section id="kai-container" class="kai_container" :class="{widget:useHeaderBar,smallHeaderBar:!useAvatar}">
  <ScreenReader></ScreenReader>
  <div class="kai-inner-container">
    <!-- Append component to the of the dom -->
    <div id="kai-component-top"></div>
    <!-- Append core component -->
    <div id="kai-core-components"></div>

    <TypingIndicator class="kai-typing-indicator" v-if="triggerTypingIndicator"></TypingIndicator>
    <!-- Append component after content -->
    <div id="kai-component-default" class="clear" :style="'height:' + this.containerHeight + 'px;'"></div>
    <!-- Append component to the bottom of the dom  -->
    <div id="kai-component-bottom"></div>
  </div>
</section>
</template>
<script>
import Kai from '../../kai'
import TextBubble from './TextBubble'
import TypingIndicator from './TypingIndicator'
import ScreenReader from './ScreenReader'
import moment from 'moment'
import './styles/Container.less'
import smoothscroll from 'smoothscroll-polyfill';
import { detect } from 'detect-browser';


export default {
  name: 'Container',
  data () {
    return {
      controls: {
        showTypingIndicator: false
      },
      checkedNames: [],
      containerHeight: 800,
      responsesQueue: []
    }
  },
  computed: { // Listen to see if store state change
    processMessage () {
      return this.$store.getters.getInputMessage
    },
    processResponse () {
      return this.$store.getters.getResponseData
    },
    onRenderingStatusUpdate () {
      return this.$store.getters.getRenderingStatus
    },
    triggerTypingIndicator () {
      return this.$store.getters.getTypingIndicator
    },
    useHeaderBar () {
      return $store.state.useHeaderBar
    },
    useAvatar: function () {
      return $store.state.useAvatar
    }
  },
  watch: { // Run method if store state change
    processMessage (message) {
      if (message) {
        Kai.Core.addMessageContent('kai-core-components', message, TextBubble, 'kai-right')
        // Wait for actionRenderingStatus to be set back to 'idle' before dispatching again the status 'started' to make sure the Vue mutation is triggered.
        // (This is needed in case a previous User Message has been sent and the status is already 'started' because the server hasn't replied yet.
        // Typically happened when connection timeout and the user keep sending message)
        $store.dispatch('actionRenderingStatus', 'idle').then(() =>
          $store.dispatch('actionRenderingStatus', 'started'))
      }
    },
    processResponse (response) {
      if (response) {
        this.responsesQueue.push(response)
        this.renderResponse()
        $store.state.responseData = undefined
      }
    },
    onRenderingStatusUpdate (status) {
      // when rendering start the WV should scroll to display the latest message at the top of the chat window.
      // to allow the latest message to reach the top of the chat window, the blank container "kai-component-default" height is adjusted.
      if (status === 'started') {
        this.containerHeight = this.$el.offsetHeight
        var _this = this
        setTimeout(function () {
          var lastElement = _this.$el.querySelector('#kai-core-components').lastElementChild
          if (lastElement !== undefined && lastElement !== null) {
            lastElement.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
          }
        }, 150)
      }
      // when rendering is finished the blank container "kai-component-default" height is reduce to fit the remaining space on the screen and not let the user scroll down on an empty window.
      if (status === 'finished') {
        this.containerHeight = this.resizeDefaultComponent()
        // remove first response in queue when rendering finished
        this.responsesQueue.splice(0, 1)
        this.$nextTick(() => this.renderResponse())
        $store.dispatch('actionRenderingStatus', 'idle')
      }
    }
  },
  filters: {
    moment: function (date) {
      return moment(date).format('Do MMMM., h:mm a')
    }
  },
  mounted () {
    // kick off the polyfill!
    const browser = detect()
    if (browser && (browser.name === 'safari' || browser.name === 'ios')) {
      window.__forceSmoothScrollPolyfill__ = true;
    }
    smoothscroll.polyfill();

    // Check for Mobile
    this.$nextTick(() => {
      window.addEventListener('load', () => {
        this.windowWidth = window.innerWidth
        if (this.windowWidth <= 960) {
          $jq('#kai-container').addClass('mobile')
        }
      })
      window.addEventListener('resize', () => {
        this.windowWidth = window.innerWidth
        if (this.windowWidth <= 960) {
          $jq('#kai-container').addClass('mobile')
        } else {
          $jq('#kai-container').removeClass('mobile')
        }
      })
    })
    if ($store.state.locationAPIKey && $store.state.locationAPIKey.length > 0) {
      const googleMapScript = document.createElement('script')
      const source = 'https://maps.google.com/maps/api/js?key=' + $store.state.locationAPIKey + '&sensor=false&libraries=places'
      googleMapScript.setAttribute('src', source)
      document.head.appendChild(googleMapScript)
    }
  },
  methods: {
    moment,
    resizeDefaultComponent () {
      var defComp = this.$el.querySelector('#kai-component-default')
      var currentHeight = defComp.offsetHeight
      var defCompRect = defComp.getBoundingClientRect()
      var kaiContainerRect = this.$el.getBoundingClientRect()
      var qrBottomBarRect = document.querySelector('#kai-qr-bottom-bar').getBoundingClientRect()
      return Math.max(0, qrBottomBarRect.top > 0 ? Math.min(currentHeight, qrBottomBarRect.top - defCompRect.top) : Math.min(currentHeight, kaiContainerRect.bottom - defCompRect.top))
    },
    renderResponse () {
      if ((this.$store.getters.getRenderingStatus !== 'started' && this.responsesQueue.length > 0) ||
        (this.$store.getters.getRenderingStatus === 'started' && this.responsesQueue.length === 1)) {
        Kai.Core.handleResponse(this.responsesQueue[0])
      }
    }
  },
  components: {
    TypingIndicator,
    ScreenReader
  }
}
</script>

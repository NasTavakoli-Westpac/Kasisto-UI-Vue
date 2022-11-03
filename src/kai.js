import { store } from './store/index'
import kserver from './kserver/kai.coreapi'
import kbaseserver from './kserver/kai.server.autocomplete'
import Vue from 'vue'
import App from './App'
import DatePicker from './core/components/DatePicker'
import TextBubble from './core/components/TextBubble'
import QuickReplies from './core/components/QuickReplies'
import ListViewBase from './core/components/ListViewBase'
import IntroScreen from './core/components/IntroScreen'
import Carousel from './core/components/Carousel'
import CardSingle from './core/components/CardSingle'
import MediumSingle from './core/components/MediumSingle'
import Select from './core/components/Select'
import CustomSingle from './core/components/CustomSingle'
import LiveChat from './core/components/LiveChat'
import LocationMap from './core/components/LocationMap'
import ContentButton from './core/components/ContentButton'
import ContentLink from './core/components/Link'
import CustomSearch from './core/components/Search'
import CustomSearchDetails from './core/components/SilverCloudSearchDetails'

import NBest from './core/components/NBest'
import TimeStamp from './core/components/TimeStamp'
import moment from 'moment'

import Cookies from 'js-cookie'

// Debug Data
import DebugMode from './core/components/DebugMode'
import cardSmallJsonData from './debug/card_small'
import cardGaugeJsonData from './debug/card_gauge'
import cardBarChartJsonData from './debug/card_bar_chart.json'
import carouselJsonData from './debug/carousel.json'
import carouselMediumJsonData from './debug/carousel_medium.json'
import cardJsonData from './debug/card.json'
import mediumPieChartJsonData from './debug/medium_piechart.json'
import mediumLineChartJsonData from './debug/medium_linechart_carousel.json'

import listJsonData from './debug/list.json'
import listGroupedJsonData from './debug/list_grouped.json'
import quickrepliesJsonData from './debug/quick-replies.json'
import textResponseJsonData from './debug/text-response.json'
import debugDocJsonData from './debug/debug.json'

import selectCarouselJsonData from './debug/select-carousel.json'
import selectListJsonData from './debug/select-list.json'
import selectChecklistJsonData from './debug/select-checklist.json'

import datepickerJsonData from './debug/datepicker.json'

import customKIMMediumJsonData from './debug/customKIMCard_medium.json'
import customKIMCardChartJsonData from './debug/customKIMCard_chart.json'
import customKIMCarouselChartJsonData from './debug/customKIMCarousel_chart.json'
import customConciergeCardJsonData from './debug/customConciergeCard.json'
import customConciergeCarouselJsonData from './debug/customConciergeCarousel.json'

import nbestJsonData from './debug/nbest.json'
import liveChatJsonData from './debug/LiveChat.json'
import ratingJsonData from './debug/rating-binary.json'
import ratingFiveJsonData from './debug/rating-five.json'
import ratingTenJsonData from './debug/rating-ten.json'

import linkJsonData from './debug/link.json'
import searchCustomJsonData from './debug/search.json'
import searchQuickReplyJsonData from './debug/searchQuickReply.json'
import shortcutPanelJsonData from './debug/shortcut.json'
import buttonJsonData from './debug/button.json'

// Avatar
import avatarActiveJsonData from './debug/avatar_hd_active.json'
import avatarChatIconJsonData from './debug/avatar_hd_chat_icon.json'
import avatarCheckmarkJsonData from './debug/avatar_hd_checkmark.json'
import avatarQuestionJsonData from './debug/avatar_hd_question.json'
import avatarTransactionJsonData from './debug/avatar_hd_transaction.json'
import avatarPlaygroundJsonData from './debug/avatar_hd_playground.json'
import avatarIdleJsonData from './debug/avatar_hd_idle.json'
import avatarSplash2JsonData from './debug/avatar_hd_splash2.json'
import avatarLeavingJsonData from './debug/avatar_hd_leaving.json'
import avatarNotificationJsonData from './debug/avatar_hd_notification.json'
import avatarSorryJsonData from './debug/avatar_hd_sorry.json'
import avatarThankYouJsonData from './debug/avatar_hd_thank_you.json'
import avatarVoiceStartJsonData from './debug/avatar_hd_voice1start.json'
import avatarVoiceLoopJsonData from './debug/avatar_hd_voice2loop.json'
import avatarVoiceEndJsonData from './debug/avatar_hd_voice3end.json'

// Webview version
import webviewLibraryVersion from '../build/webview-version.json'

// Testcases multi medium
import testcaseMultiMedium from './debug/testcase_multi_medium.json'
import list2JsonData from './debug/list2.json'

/// #if process.env.MODE === 'single'
import splash1Bodymovin from '@/avatars/splash1_bodymovin.json'
import splash2Bodymovin from '@/avatars/splash2_bodymovin.json'
import activeBodymovin from '@/avatars/active_bodymovin.json'
import chatIconBodymovin from '@/avatars/chat_icon_bodymovin.json'
import checkmarkBodymovin from '@/avatars/checkmark_bodymovin.json'
import idleBodymovin from '@/avatars/idle_bodymovin.json'
import playgroundBodymovin from '@/avatars/playground_bodymovin.json'
import questionBodymovin from '@/avatars/question_bodymovin.json'
import sorryBodymovin from '@/avatars/sorry_bodymovin.json'
import thankYouBodymovin from '@/avatars/thank_you_bodymovin.json'
import transactionBodymovin from '@/avatars/transaction_bodymovin.json'
import voice1startBodymovin from '@/avatars/voice_1start_bodymovin.json'
import voice2LoopBodymovin from '@/avatars/voice_2loop_bodymovin.json'
import voice3endBodymovin from '@/avatars/voice_3end_bodymovin.json'
import leavingBodymovin from '@/avatars/leaving_bodymovin.json'
import notificationBodymovin from '@/avatars/notification_bodymovin.json'
/// #endif

/****************************************************/

/* Global Values from 1.0  */

/****************************************************/

// window not defined error to fix - JB
// var currentY = $jq(window).scrollTop();
var typingIndicatorTimerHolder = false
var inactivityTimerHolder = false

// CAPI Status code
const STATUS_OK = '200'
const STATUS_OK_NO_CONTENTS = '204'
const STATUS_INVALID_REQUEST = '400'
const STATUS_AUTHENTICATION_FAILED = '401'
const STATUS_ACCESS_DENIED = '403'
const STATUS_LOGICAL_ERRORS = '422'
const STATUS_INVALID_SESSION_ID = '440'
const STATUS_OTP_REQUIRED = '450'
const STATUS_INVALID_OTP_RETRY = '451'
const STATUS_EXPIRED_OTP = '452'
const STATUS_TOO_MANY_OTP_FAILURES = '453'
const STATUS_INTERNAL_SERVER_ERROR = '500'
const STATUS_SERVICE_UNAVAILABLE = '503'

var invalidSessionCounter = 0
var invalidSessionAfterStartSessionCounter = 0

var cookieAutoRefreshTimeout = null

const Core = (function () {
  /****************************************************/

  /*  passToNativeMethod
        Used to pass JS code -> iOS + Android
    */

  /****************************************************/

  var passToNativeMethod = function (nativeFunctionName, params) {
    // console.log('passToNativeMethod: ' + nativeFunctionName, params)

    // For iOS
    try {
      execNativeMethod(nativeFunctionName, params)
    } catch (err) { }

    // For Android
    try {
      injectedJS.execNativeMethod(nativeFunctionName, JSON.stringify(params))
    } catch (err) { }
  }

  /****************************************************/

  /*  passToNativeWebviewCAPIResponseMethod
        Used to pass CAPI response from JS code -> iOS + Android
    */

  /****************************************************/

  var passToNativeWebviewCAPIResponseMethod = function (params) {
    // console.log('passToNativeWebviewCAPIResponseMethod', params)

    // For iOS
    try {
      execNativeMethod('webviewCAPIResponse', params)
    } catch (err) { }

    // For Android
    try {
      injectedJS.execNativeMethod('webviewCAPIResponse', JSON.stringify(params))
    } catch (err) { }
  }

  /****************************************************/

  /*  passToNativeWebviewCAPIRequestMethod
        Used to pass CAPI request from JS code -> iOS + Android
    */

  /****************************************************/

  var passToNativeWebviewCAPIRequestMethod = function (params) {
    // console.log('passToNativeWebviewCAPIRequestMethod', params)

    // For iOS
    try {
      execNativeMethod('webviewCAPIRequest', params)
    } catch (err) { }

    // For Android
    try {
      injectedJS.execNativeMethod('webviewCAPIRequest', JSON.stringify(params))
    } catch (err) { }
  }

  /****************************************************/

  /*  passToNativeWebviewCAPIErrorMethod
        Used to pass CAPI Errors from JS code -> iOS + Android
    */

  /****************************************************/

  var passToNativeWebviewCAPIErrorMethod = function (params) {
    // console.log('passToNativeWebviewCAPIErrorMethod', params)

    // For iOS
    try {
      execNativeMethod('webviewCAPIError', params)
    } catch (err) { }

    // For Android
    try {
      injectedJS.execNativeMethod('webviewCAPIError', JSON.stringify(params))
    } catch (err) { }
  }

  /****************************************************/

  /* Kai Init  */

  /****************************************************/

  var kaiInit = function (e) {
    const initMode = findGetParameter('initMode')

    // Check for kai_session_id cookie
    if ($store.getters.isSessionCookieEnabled && !(initMode && initMode === 'capi_redirect')) {
      var kaiSessionId = Cookies.get('k_session_id')
      if (kaiSessionId) {
        $store.state.kaiSessionId = kaiSessionId
      }
    }

    if (store.state.loadThemeFromBackend) {
      var config = Cookies.get('k_config')
      var style = Cookies.get('k_style')
      if (config || style) {
        // if previous style was stored in cookie, we apply this style first instead of waiting for the server response
        var response = {
          content: {}
        }
        if (config) {
          response.content.config = config
        }
        if (style) {
          response.content.style = style
        }
        updateConfigAndThemeVariables(response)
        store.state.webviewReady = true
        kserver.CoreAPI.getThemeVariables()
      } else {
        kserver.CoreAPI.getThemeVariables((response) => {
          updateConfigAndThemeVariables(response)
          store.state.webviewReady = true
        })
      }
    } else if (store.state.loadThemeAndAssistantPropertyFromQueryString) {
      var settings = findGetParameter('settings')
      if (settings) {
        try {
          settings = decodeURIComponent(settings)
          settings = JSON.parse(settings)
          if (settings) {
            updateConfigAndThemeVariables(settings)
          }
          if (settings && settings.config) {
            // check if "assistant_name" and "assistant_target" are passed in the config and if yes add them to request header
            var env = {
              SERVER_CONFIG: {}
            }
            if (settings.config.SERVER_URL) {
              env.SERVER_CONFIG.SERVER_URL = settings.config.SERVER_URL
            }
            if (settings.config.APP_AUTH_HEADER) {
              env.SERVER_CONFIG.APP_AUTH_HEADER = settings.config.APP_AUTH_HEADER
            }
            if (settings.config.APP_AUTH_KEY) {
              env.SERVER_CONFIG.APP_AUTH_KEY = settings.config.secret
            }
            if (settings.config.SPEECH_RECOGNITION_SERVER) {
              env.SERVER_CONFIG.SPEECH_RECOGNITION_SERVER = settings.config.SPEECH_RECOGNITION_SERVER
            }
            if (settings.config.assistant_name) {
              env.SERVER_CONFIG.assistant_name = settings.config.assistant_name
            }
            if (settings.config.assistant_target) {
              env.SERVER_CONFIG.assistant_target = settings.config.assistant_target
            }

            if (window.ENV && window.ENV.SERVER_CONFIG) {
              window.ENV.SERVER_CONFIG = { ...window.ENV.SERVER_CONFIG, ...env.SERVER_CONFIG }
            } else {
              window.ENV = env
            }
            // check if CAPI "context" fields are passed in the config and if yes update webview store context accordingly.
            if (settings.config.context) {
              kserver.CoreAPI.updateContext(settings.config.context)
            }
          }
          store.state.webviewReady = true
        } catch (err) {
          console.log('Decode and parse settings failed.')
        }
      }
    } else {
      store.state.webviewReady = true
    }

    generateMainContainerClass()

    // Extend components $mount
    const mount = Vue.prototype.$mount
    Vue.prototype.$mount = function (el, hydrating) {
      const options = this.$options

      // Check to see if component templates override
      if (options.templateOverride && typeof options.templateOverride === 'string' && options.templateOverride.charAt(0) === '#' && document.querySelector(options.templateOverride)) {
        const renderFunctions = Vue.compile(document.querySelector(options.templateOverride).innerHTML)
        Object.assign(options, renderFunctions)
      }

      return mount.call(this, el, hydrating)
    }

    /* eslint-disable no-new */
    new Vue({
      el: '#' + store.state.el,
      store: store,
      components: { App },
      template: '<App/>'
    })

    // check if "assistant_name" and "assistant_tartget" are defined in ENV and if yes add them to request header
    var additionalHeaders = {}
    if (window.ENV.SERVER_CONFIG.assistant_name) {
      additionalHeaders.assistant_name = window.ENV.SERVER_CONFIG.assistant_name
    }
    if (window.ENV.SERVER_CONFIG.assistant_target) {
      additionalHeaders.assistant_target = window.ENV.SERVER_CONFIG.assistant_target
    }
    additionalHeaders[ENV.SERVER_CONFIG.APP_AUTH_HEADER] = ENV.SERVER_CONFIG.APP_AUTH_KEY
    kserver.CoreAPI.setAdditionalRequestHeaders(additionalHeaders)

    passToNativeMethod('webviewReady')
    loadHistory()

    if ($store.getters.getKaiSessionId === '' && $store.getters.getStartSession === true) {
      kserver.CoreAPI.startSession()
    }

    if ($store.getters.getStartPullService || window.ENV.SERVER_CONFIG.START_PULL_SERVICE) {
      startPullService()
    }

    // load default payload message JSON file
    // Kai.Core.handleResponse(payloadMessage);
    // Kai.Core.handleResponse(nbestJsonData);
    if ($store.getters.getShowOnLoadTypingIcon === true) {
      store.dispatch('actionTypingIndicator', true)
    }

    inactivityWatcher()
  }

  /****************************************************/

  window.addEventListener('load', () => {
    kaiInit()

    // On Init load bottom bar
    setTimeout(function () {
      appendComponent({}, NBest, 'n-best')
      if (store.getters.getIntroScreen === true) {
        appendComponent({}, IntroScreen, 'kai-component-top')
      }
    }, 0)
  })

  /****************************************************/

  setTimeout(function () {
    var testCafeRunning = $jq('html').attr('data-hammerhead-hovered')
    if (typeof testCafeRunning !== typeof undefined && testCafeRunning !== false) {
      require('./styles/testCafe.css')
    }
  }, 1000)

  /****************************************************/

  /* Get Webview Version  */

  /****************************************************/

  var getVersion = function () {
    var buildVersion = '<b>Webview Version:</b><br>' + webviewLibraryVersion.version + ' - build ' + webviewLibraryVersion.build
    if (store.getters.getKaiApiVersion.length) {
      buildVersion += '<br><br><b>Kai API Version:</b><br>' + store.getters.getKaiApiVersion
    }
    if (store.getters.getKaiAppVersion.length) {
      buildVersion += '<br><br><b>Kai APP Version:</b><br>' + store.getters.getKaiAppVersion
    }
    if (store.getters.getKaiDataVersion.length) {
      buildVersion += '<br><br><b>Data Version:</b><br>' + store.getters.getKaiDataVersion
    }
    if (store.getters.getKaiModelVersion.length) {
      buildVersion += '<br><br><b>Model Version:</b><br>' + store.getters.getKaiModelVersion
    }
    this.addMessageContent('kai-core-components', buildVersion, TextBubble, 'kai-left', true)
  }

  /****************************************************/

  /* Get Session ID  */

  /****************************************************/

  var getSessionId = function () {
    this.addMessageContent('kai-core-components', store.getters.getKaiSessionId, TextBubble, 'kai-left', true)
  }

  /****************************************************/

  /* Debug Submit Message Handler  */

  /****************************************************/
  var debugSubmitMessageHandler = function (msg) {
    if (typeof msg === 'string') {
      msg = msg.toLowerCase()
    }
    switch (msg) {
      case '__button': {
        typingIndicator(true)
        store.dispatch('actionResponseData', buttonJsonData)
        return true
      }
      case '__card': {
        typingIndicator(true)
        store.dispatch('actionResponseData', cardJsonData)
        return true
      }
      case '__card_small': {
        typingIndicator(true)
        store.dispatch('actionResponseData', cardSmallJsonData)
        return true
      }
      case '__card_gauge': {
        typingIndicator(true)
        store.dispatch('actionResponseData', cardGaugeJsonData)
        return true
      }
      case '__card_bar_chart': {
        typingIndicator(true)
        store.dispatch('actionResponseData', cardBarChartJsonData)
        return true
      }
      case '__piechart': {
        typingIndicator(true)
        store.dispatch('actionResponseData', mediumPieChartJsonData)
        return true
      }
      case '__linechart': {
        typingIndicator(true)
        store.dispatch('actionResponseData', mediumLineChartJsonData)
        return true
      }
      case '__carousel': {
        var tempCarouselData1 = JSON.parse(JSON.stringify(carouselJsonData))
        // When webview is deployed on Reporting portal need to add the BaseImagePath to hardcoded image path
        for (var n = 0; n < tempCarouselData1.message_contents[2].payload.contents.length; n++) {
          if (tempCarouselData1.message_contents[2].payload.contents[n].payload.medium.medium_url.indexOf('http') === -1) {
            tempCarouselData1.message_contents[2].payload.contents[n].payload.medium.medium_url = require('@/assets/img/' + tempCarouselData1.message_contents[2].payload.contents[n].payload.medium.medium_url)
          }
        }
        typingIndicator(true)
        store.dispatch('actionResponseData', tempCarouselData1)
        return true
      }
      case '__carouselmedium': {
        typingIndicator(true)
        store.dispatch('actionResponseData', carouselMediumJsonData)
        return true
      }
      case '__list': {
        var tempListData = JSON.parse(JSON.stringify(listJsonData))
        // When webview is deployed on Reporting portal need to add the BaseImagePath to hardcoded image path
        for (var o = 0; o < tempListData.message_contents[0].payload.contents.length; o++) {
          if (tempListData.message_contents[0].payload.contents[o].payload.medium !== undefined) {
            if (tempListData.message_contents[0].payload.contents[o].payload.medium && tempListData.message_contents[0].payload.contents[o].payload.medium.medium_url.indexOf('http') === -1) {
              tempListData.message_contents[0].payload.contents[o].payload.medium.medium_url = require('@/assets/img/' + tempListData.message_contents[0].payload.contents[o].payload.medium.medium_url)
            }
          }
        }
        typingIndicator(true)
        store.dispatch('actionResponseData', tempListData)
        return true
      }
      case '__listgrouped': {
        var currentListMode = store.getters.getGroupedListMode
        store.state.groupedListMode = true
        typingIndicator(true)
        store.dispatch('actionResponseData', listGroupedJsonData)
        setTimeout(function () { store.state.groupedListMode = currentListMode }, 5000)
        return true
      }
      case '__quickreplies': {
        typingIndicator(true)
        store.dispatch('actionResponseData', quickrepliesJsonData)
        return true
      }
      case '__themechanger': {
        store.state.showThemeChanger = true
        return true
      }
      case '__widget': {
        store.state.useWidgetMode = !store.state.useWidgetMode
        return true
      }
      case '__typing=true': {
        typingIndicator(true)
        store.dispatch('actionTypingIndicator', true)
        return true
      }
      case '__typing=false': {
        typingIndicator(true)
        store.dispatch('actionTypingIndicator', false)
        return true
      }
      case '__textresponse': {
        typingIndicator(true)
        store.dispatch('actionResponseData', textResponseJsonData)
        return true
      }
      case '__map': {
        this.mapLocation()
        return true
      }
      case '__datepicker': {
        var tempDatepickerData = JSON.parse(JSON.stringify(datepickerJsonData))
        // When webview is deployed on Reporting portal need to add the BaseImagePath to hardcoded image path
        tempDatepickerData.quick_replies[0].image_url = require('@/assets/img/' + tempDatepickerData.quick_replies[0].image_url)
        typingIndicator(true)
        store.dispatch('actionResponseData', tempDatepickerData)
        return true
      }
      case '__customkim': {
        var customKIMArray = [customKIMMediumJsonData, customKIMCardChartJsonData, customKIMCarouselChartJsonData]

        for (var i = 0; i <= customKIMArray.length - 1; i++) {
          (function (x) {
            setTimeout(() => {
              store.dispatch('actionResponseData', customKIMArray[x])
            }, x * 500)
          })(i)
        }
        return true
      }
      case '__customconcierge': {
        typingIndicator(true)
        store.dispatch('actionResponseData', customConciergeCardJsonData)
        return true
      }
      case '__customconciergecarousel': {
        typingIndicator(true)
        store.dispatch('actionResponseData', customConciergeCarouselJsonData)
        return true
      }
      case '__debug=false': {
        this.debugMode(false)
        $jq('.debug-end-line').remove()
        $jq('.debug-content-container').fadeOut(1000, function () {
          $jq(this).remove()
        })
        return true
      }

      case '__selectcarousel': {
        var tempCarouselData = JSON.parse(JSON.stringify(selectCarouselJsonData))
        // When webview is deployed on Reporting portal need to add the BaseImagePath to hardcoded image path
        for (var k = 0; k < tempCarouselData.message_contents[0].payload.options.length; k++) {
          tempCarouselData.message_contents[0].payload.options[k].payload.medium.medium_url = require('@/assets/img/' + tempCarouselData.message_contents[0].payload.options[k].payload.medium.medium_url)
        }
        typingIndicator(true)
        store.dispatch('actionResponseData', tempCarouselData)
        return true
      }
      case '__selectlist': {
        var tempSelectListData = JSON.parse(JSON.stringify(selectListJsonData))
        // When webview is deployed on Reporting portal need to add the BaseImagePath to hardcoded image path
        for (var p = 0; p < tempSelectListData.message_contents[0].payload.options.length; p++) {
          if (tempSelectListData.message_contents[0].payload.options[p].payload.medium.medium_url.indexOf('http') === -1) {
            tempSelectListData.message_contents[0].payload.options[p].payload.medium.medium_url = require('@/assets/img/' + tempSelectListData.message_contents[0].payload.options[p].payload.medium.medium_url)
          }
        }
        typingIndicator(true)
        store.dispatch('actionResponseData', tempSelectListData)
        return true
      }
      case '__selectchecklist': {
        typingIndicator(true)
        store.dispatch('actionResponseData', selectChecklistJsonData)
        return true
      }
      case '__livechat': {
        for (var m = 0; m <= liveChatJsonData.length - 1; m++) {
          (function (x) {
            setTimeout(() => {
              store.dispatch('actionResponseData', liveChatJsonData[x])
            }, x * 3 * 1000)
          })(m)
        }
        return true
      }
      case '__nbest': {
        typingIndicator(true)
        store.dispatch('actionResponseData', nbestJsonData)
        return true
      }
      case '__rating_binary': {
        typingIndicator(true)
        store.dispatch('actionResponseData', ratingJsonData)
        return true
      }
      case '__rating_five': {
        typingIndicator(true)
        store.dispatch('actionResponseData', ratingFiveJsonData)
        return true
      }
      case '__rating_ten': {
        typingIndicator(true)
        store.dispatch('actionResponseData', ratingTenJsonData)
        return true
      }
      case '__link': {
        typingIndicator(true)
        store.dispatch('actionResponseData', linkJsonData)
        return true
      }
      case '__search': {
        typingIndicator(true)
        store.dispatch('actionResponseData', searchQuickReplyJsonData)
        return true
      }
      case '__search_custom': {
        typingIndicator(true)
        store.dispatch('actionResponseData', searchCustomJsonData)
        return true
      }
      case '__avatar_active':
      {
        store.dispatch('actionResponseData', avatarActiveJsonData)
        return true
      }
      case '__avatar_chat_icon':
      {
        store.dispatch('actionResponseData', avatarChatIconJsonData)
        return true
      }
      case '__avatar_checkmark':
      {
        store.dispatch('actionResponseData', avatarCheckmarkJsonData)
        return true
      }
      case '__avatar_question':
      {
        store.dispatch('actionResponseData', avatarQuestionJsonData)
        return true
      }
      case '__avatar_transaction':
      {
        store.dispatch('actionResponseData', avatarTransactionJsonData)
        return true
      }
      case '__avatar_playground':
      {
        store.dispatch('actionResponseData', avatarPlaygroundJsonData)
        return true
      }
      case '__avatar_idle':
      {
        store.dispatch('actionResponseData', avatarIdleJsonData)
        return true
      }
      case '__avatar_splash2':
      {
        store.dispatch('actionResponseData', avatarSplash2JsonData)
        return true
      }
      case '__avatar_leaving':
      {
        store.dispatch('actionResponseData', avatarLeavingJsonData)
        return true
      }
      case '__avatar_notification':
      {
        store.dispatch('actionResponseData', avatarNotificationJsonData)
        return true
      }
      case '__avatar_sorry':
      {
        store.dispatch('actionResponseData', avatarSorryJsonData)
        return true
      }
      case '__avatar_thank_you':
      {
        store.dispatch('actionResponseData', avatarThankYouJsonData)
        return true
      }
      case '__avatar_voice_start':
      {
        store.dispatch('actionResponseData', avatarVoiceStartJsonData)
        return true
      }
      case '__avatar_voice_loop':
      {
        store.dispatch('actionResponseData', avatarVoiceLoopJsonData)
        return true
      }
      case '__avatar_voice_end':
      {
        store.dispatch('actionResponseData', avatarVoiceEndJsonData)
        return true
      }
      case '__shortcuts':
      {
        store.dispatch('actionResponseData', shortcutPanelJsonData)
        return true
      }
      case '__testcasemultimedium': {
        typingIndicator(true)
        store.dispatch('actionResponseData', testcaseMultiMedium)
        return true
      }
      case '__list2': {
        typingIndicator(true)
        store.dispatch('actionResponseData', list2JsonData)
        return true
      }

      default: {
        return false
      }
    }
  }

  /****************************************************/

  /* Submit Message  */

  /****************************************************/
  var sendUserMessage = function (msg, callback, optionalDisplayText, optionalInputType) {
    this.submitMessage(msg, callback, optionalDisplayText, optionalInputType)
  }

  var sendHiddenUserMessage = function (msg, callback) {
    var isDebugMessage = false
    if (store.getters.getDebugMode) {
      isDebugMessage = this.debugSubmitMessageHandler(msg)
    }
    if (!isDebugMessage) {
      // Remove Quick Replies
      this.removeQuickReplies()

      this.typingIndicator(true)

      // Send Request Message to API
      kserver.CoreAPI.sendMessage(msg)
    }
    if (callback) {
      callback()
    }
  }

  var sendHiddenUserMessageWithMetaFields = function (msg, metaFields, callback) {
    var isDebugMessage = false
    if (store.getters.getDebugMode) {
      isDebugMessage = this.debugSubmitMessageHandler(msg)
    }
    if (!isDebugMessage) {
      // Remove Quick Replies
      this.removeQuickReplies()

      this.typingIndicator(true)

      // Send Request Message to API
      kserver.CoreAPI.sendMessageWithMetaFields(msg, metaFields)
    }
    if (callback) {
      callback()
    }
  }

  var submitMessage = function (msg, callback, optionalDisplayText, optionalInputType, optionalMetaFields) {
    var isDebugMessage = false
    if (store.getters.getDebugMode) {
      isDebugMessage = this.debugSubmitMessageHandler(msg)
    }
    if (!isDebugMessage) {
      store.dispatch('actionSendMessage', true)
      if (optionalDisplayText && optionalDisplayText.trim() !== '') {
        store.dispatch('actionInputMessage', optionalDisplayText)
      } else {
        store.dispatch('actionInputMessage', msg)
      }
      typingIndicator(true)

      // Send Request Message to API
      kserver.CoreAPI.sendMessage(msg, optionalInputType, optionalMetaFields)

      // Remove Quick Replies
      removeQuickReplies()
    }
    if (callback) {
      callback()
    }
  }

  var submitSelection = function (msg, callback) {
    var isDebugMessage = false
    if (store.getters.getDebugMode) {
      isDebugMessage = this.debugSubmitMessageHandler(msg)
    }
    if (!isDebugMessage) {
      if (msg && msg.length) {
        // Send Request Message to API
        kserver.CoreAPI.sendMessage(msg, 'SELECT')

        // Remove Quick Replies
        this.removeQuickReplies()
      }
    }
    if (callback) {
      callback()
    }
  }

  var submitIntent = function (intent, optionalLabel, callback) {
    store.dispatch('actionSendMessage', true)
    if (optionalLabel && optionalLabel !== '') {
      store.dispatch('actionInputMessage', optionalLabel)
    }
    typingIndicator(true)

    // Send Intent request to API
    kserver.CoreAPI.sendIntent(intent.name, intent.user_inputs)

    // Remove Quick Replies
    removeQuickReplies()

    if (callback) {
      callback()
    }
  }

  var sendRequest = function (request, callback) {
    var isDebugMessage = false
    if (store.getters.getDebugMode) {
      if (request.payload && request.payload.text) {
        var msg = request.payload.text
        isDebugMessage = this.debugSubmitMessageHandler(msg)
      }
    }
    if (!isDebugMessage) {
      store.dispatch('actionSendMessage', true)
      if (request.payload && request.payload.text) {
        store.dispatch('actionInputMessage', request.payload.text)
      }
      this.typingIndicator(true)

      // Send Request Message to API
      kserver.CoreAPI.sendRequest(request)

      // Remove Quick Replies
      this.removeQuickReplies()
    }
    if (callback) {
      callback()
    }
  }

  var sendHiddenRequest = function (request, callback) {
    var isDebugMessage = false
    if (store.getters.getDebugMode) {
      isDebugMessage = this.debugSubmitMessageHandler(request)
    }
    if (!isDebugMessage) {
      // Send Request Message to API
      kserver.CoreAPI.sendRequest(request)

      // Remove Quick Replies
      this.removeQuickReplies()
    }
    if (callback) {
      callback()
    }
  }

  var sendEnterTokenEvent = function (token, callback, optionalIntent) {
    kserver.CoreAPI.sendEnterTokenEvent(token, callback, optionalIntent)
  }

  var sendAuthPassThruEvent = function (metaFieldsArray, callback, optionalIntent) {
    kserver.CoreAPI.sendAuthPassThruEvent(metaFieldsArray, callback, optionalIntent)
  }

  var sendProcessOAuthEvent = function (token, callback, optionalIntent) {
    kserver.CoreAPI.sendProcessOAuthEvent(token, callback, optionalIntent)
  }

  var sendGenericEvent = function (type, metaFieldsArray, callback, optionalIntent) {
    kserver.CoreAPI.sendGenericEvent(type, metaFieldsArray, callback, optionalIntent)
  }

  var startPullService = function () {
    if (store.getters.getKaiSessionId && store.getters.getKaiSessionId.length > 0) {
      store.dispatch('actionPullServiceStart')
      kserver.CoreAPI.sendPullRequest()
    } else {
      // keep trying to start the pull service until there is a session_ID
      setTimeout(function () {
        Kai.Core.startPullService()
      }, store.getters.getPullServiceErrorSleepTimer * 1000)
    }
  }

  var stopPullService = function () {
    store.state.pullServiceState = false
    store.dispatch('actionPullServiceStop')
    kserver.CoreAPI.abortPullRequest()
  }

  var sendUserTypingStateToLiveChat = function () {
    kserver.CoreAPI.sendLiveChatCustomerStateEvent()
  }

  var getHistory = function (callback) {
    kserver.CoreAPI.getHistory(callback)
  }

  var logoutSession = function (callback) {
    kserver.CoreAPI.logoutSession(callback)
  }

  /****************************************************/

  /* Button Pressed */

  /****************************************************/

  var buttonPressed = function (buttonObj) {
    if (buttonObj) {
      var overrideWebviewDefaultBehavior = false
      var deeplinkConfig = ConvertKeysToUpperCase(store.getters.getDeepLinkHandleBehaviour)
      var upperButtonType = buttonObj.type.toUpperCase()

      if (deeplinkConfig && deeplinkConfig[upperButtonType] !== undefined) {
        // if we reach here it means this specific button type is condigured
        overrideWebviewDefaultBehavior = deeplinkConfig[upperButtonType]
      } else if (deeplinkConfig === true) {
        // if we reach here it means all the button types behaviour will be handled by customer
        overrideWebviewDefaultBehavior = true
      }
      if (!overrideWebviewDefaultBehavior) {
        if (upperButtonType === 'DEEPLINK') {
          this.deepLink(buttonObj)
        } else if (upperButtonType === 'LOCATION') {
          this.mapLocation()
        } else if (upperButtonType === 'DATE') {
          this.addDatePicker()
        } else if (upperButtonType === 'POSTBACK' || upperButtonType === 'TEXT') {
          this.postBackMessage(buttonObj, false)
        } else if (upperButtonType === 'TEXT_FOLLOWUP') {
          this.sendUserMessage(buttonObj.payload, false, buttonObj.question_display_text)
        } else if (upperButtonType === 'HYPERLINK') {
          window.open(buttonObj.payload, '_blank')
        } else if (upperButtonType === 'CAPI') {
          const href = new URL(window.location.href)
          if (buttonObj.payload && buttonObj.payload.length > 0) {
            // type CAPI should provide a new session ID in the payload
            href.searchParams.set('sessionID', buttonObj.payload)
          } else {
            // in case new session ID is not provided, make sure no session ID is passed in URL param
            href.searchParams.delete('sessionID')
          }
          href.searchParams.set('initMode', 'capi_redirect')
          window.open(href, '_blank')
        } else if (upperButtonType === 'INTENT') {
          if (buttonObj.intent) {
            this.submitIntent(buttonObj.intent, buttonObj.label)
          } else {
            this.submitIntent(buttonObj.payload, buttonObj.label)
          }
        } else if (upperButtonType === 'LOGIN') {
          window.open(buttonObj.payload, '_blank')
        } else if (upperButtonType === 'CALL') {
          var payload = 'tel://' + buttonObj.payload
          var win = window.open(payload, '_blank')
          win.focus()
        } else if (upperButtonType === 'WEB_SEARCH' || upperButtonType === 'WEB_SEARCH_GOOGLE' || upperButtonType === 'WEB_SEARCH_SILVERCLOUD') {
          this.addContentButton(buttonObj, 'kai-core-components', CustomSearch)
          removeQuickReplies()
        } else if (upperButtonType === 'WEB_SEARCH_CONTENT') {
          this.addContentButton(buttonObj, 'kai-core-components', CustomSearchDetails)
          removeQuickReplies()
        } else {
          this.deepLink(buttonObj)
        }
      } else {
        // TODO: Add more button types here default to deepLink for now
        this.deepLink(buttonObj)
      }
    }
  }

  /****************************************************/

  /* Post Back Message  */

  /****************************************************/

  var postBackMessage = function (buttonObj, callback, optionalInputType) {
    var message
    var optionalDisplayText
    if (buttonObj.payload && buttonObj.payload.trim() !== '') {
      message = buttonObj.payload
    } else if (buttonObj.display_text && buttonObj.display_text.trim() !== '') { // Check for quick_reply postbacks
      message = buttonObj.display_text
      optionalDisplayText = ''
    } else if (buttonObj.label && buttonObj.label.trim() !== '') {
      message = buttonObj.label
    } else {
      message = buttonObj
    }
    if (buttonObj.question_display_text && buttonObj.question_display_text.trim() !== '') {
      optionalDisplayText = buttonObj.question_display_text
    } else if (buttonObj.display_text) {
      optionalDisplayText = buttonObj.display_text
    } else if (buttonObj.label) {
      optionalDisplayText = buttonObj.label
    }
    if (optionalInputType) {
      this.sendUserMessage(message, callback, optionalDisplayText, optionalInputType)
    } else if (isApiVersionAtLeast(3.2)) {
      this.sendUserMessage(message, callback, optionalDisplayText, 'POSTBACK')
    } else {
      this.sendUserMessage(message, callback, optionalDisplayText)
    }
  }

  /****************************************************/

  /* Deep Link  */

  /****************************************************/

  var deepLink = function (buttonObj) {
    this.passToNativeMethod('webviewFunctionForNative:', buttonObj)
  }

  /****************************************************/

  /* Location  */

  /****************************************************/

  var locationPressed = function () {
    var _this = this

    if (store.getters.getUseNativeGPS) {
      this.passToNativeMethod('webviewFunctionForNative:', { type: 'LOCATION' })
    } else {
      this.getLocation(function (position) {
        _this.sendLocation(position)
      })
    }
  }

  var getLocation = function (callback) {
    var _this = this
    var options = {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 0
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (pos) {
          callback(pos)
          store.state.defaultMapLocation = pos
        },
        function (err) {
          _this.locationError(err)
        },
        options
      )
    } else {
      // console.log('Geolocation is not supported by this browser.')
      return false
    }
  }

  var locationError = function (error) {
    console.warn('ERROR(' + error.code + '): ' + error.message)
    this.typingIndicator(false)
  }

  var sendLocation = function (pos) {
    var _this = this
    this.typingIndicator(true)
    var crd = pos.coords
    // var locationText = 'Location Found! Latitude ' + crd.latitude + ', longitude ' + crd.longitude
    // console.log(locationText)

    // How to handle Location data
    var locationInput = store.getters.getLocationInputFormat
    locationInput = locationInput.replace('{latitude}', crd.latitude)
    locationInput = locationInput.replace('{longitude}', crd.longitude)
    var payload = locationInput

    // Show location data
    // _this.addMessageContent('kai-core-components', payload, TextBubble, 'kai-right', true);

    _this.sendHiddenUserMessage(payload)
  }

  /****************************************************/

  /* Date Picker  */

  /****************************************************/

  var addDatePicker = function () {
    this.appendComponent({}, DatePicker, 'kai-core-components')
  }

  /****************************************************/

  /* Debug  */

  /****************************************************/

  var debugMode = function (toggle) {
    if (toggle) {
      // Update debug mode in store.js true
      store.dispatch('actionDebugMode', true)
      this.handleResponse(debugDocJsonData)
      $jq('.kai-debug-container').slideDown('slow', function () {
        // Animation complete.
      })

      return false
    } else {
      // Update debug mode in store.js false
      store.dispatch('actionDebugMode', false)
      // Remove from the DON
      $jq('.kai-debug-container').slideUp('slow', function () {
        // Animation complete.
        $jq(this).remove()
      })
      return false
    }
  }

  /****************************************************/

  /* Add Message Bubble  */

  /****************************************************/

  var addMessageContent = function (element, msg, component, position, showIcon, callback) {
    // Slot obj to pass to the append component function
    var slots = {
      message: msg,
      position: position, // Left or Right
      showIcon: showIcon
    }
    // Append Dynamic Component to Container Vue component
    this.appendComponent(slots, component, element)
    // Update store send message
    store.dispatch('actionSendMessage', false)
    // Callback function
    if (callback) {
      callback()
    }
  }

  /****************************************************/

  /* Add Container Card  */

  /****************************************************/

  var addCardContainer = function (data, element, component, showIcon) {
    data.showIcon = showIcon
    this.appendComponent(data, component, element)
  }

  /****************************************************/

  /* Add Content Button  */

  /****************************************************/

  var addContentButton = function (data, element, component) {
    this.appendComponent(data, component, element)
  }

  /****************************************************/

  /* Add / Remove Quick Replies  */

  /****************************************************/

  var addQuickReplies = function (response, onCompletion) {
    // Make sure we remove previous Quick Replies if any
    removeQuickReplies()

    // Append Dynamic Component to Container Vue component
    $jq.each(response.quick_replies, function (index, value) {
      // Text
      if (response.quick_replies[index].display_text === '👍' || response.quick_replies[index].display_text === '👎') {
        if (!response.quick_replies[index].label) {
          response.quick_replies[index].label = getThumbsImage(response.quick_replies[index].display_text, true)
        }
        response.quick_replies[index].display_text = getThumbsImage(response.quick_replies[index].display_text)
      }
      //  Label
      if (response.quick_replies[index].label === '👍' || response.quick_replies[index].label === '👎') {
        if (!response.quick_replies[index].display_text) {
          response.quick_replies[index].display_text = getThumbsImage(response.quick_replies[index].label)
        }
        response.quick_replies[index].label = getThumbsImage(response.quick_replies[index].label, true)
      }
      if (response.quick_replies[index].type === 'TEXT_FOLLOWUP' || response.quick_replies[index].style === 'FOLLOWUP') {
        response.quick_replies[index].isDynamic = true
      }
    })
    $jq('#kai-qr-bottom-bar').show()
    appendComponent(response.quick_replies, QuickReplies, 'kai-qr-bottom-bar')
  }

  var getThumbsImage = function (text, useDark) {
    var darkSuffix = ''
    if (useDark) {
      darkSuffix = '-dark'
    }
    if (text === '👍') {
      let src
      if (!$store.getters.isInlineImagesEnabled) {
        src = store.getters.getBaseImagePath + 'thumb-up' + darkSuffix + '.png'
      } else {
        src = require('@/assets/img/' + 'thumb-up' + darkSuffix + '.png')
      }
      return '<img class="thumb-icon" ondragstart="return false;" src="' + src + '" width="20">'
    }
    if (text === '👎') {
      let src
      if (!$store.getters.isInlineImagesEnabled) {
        src = store.getters.getBaseImagePath + 'thumb-down' + darkSuffix + '.png'
      } else {
        src = require('@/assets/img/' + 'thumb-down' + darkSuffix + '.png')
      }
      return '<img class="thumb-icon" ondragstart="return false;" src="' + src + '" width="20">'
    }
  }

  var removeQuickReplies = function () {
    $jq('#kai-qr-bottom-bar').hide()
    $jq('.quickreplies').remove()
  }

  /****************************************************/

  /* Check If CAPI Response Contains Avatar */

  /****************************************************/

  var checkIfContainsAvatar = (response) => {
    if (response && response.message_contents) {
      for (let i = 0; i < response.message_contents.length; i++) {
        if (checkIfMessageContentContainsAvatar(response.message_contents[i])) {
          return true
        }
      }
    }
    return false
  }

  var checkIfMessageContentContainsAvatar = (currentMessageContent) => {
    const useCustomAvatar = currentMessageContent.type === 'CUSTOM' &&
      currentMessageContent.payload.type === 'AVATAR'
    if (currentMessageContent.type === 'AVATAR' || useCustomAvatar) {
      return true
    }
    return false
  }

  /****************************************************/

  /* Check If CAPI Response Contains ONLY Shortcut  */

  /****************************************************/

  var checkIfContainsOnlyShortcuts = (response) => {
    let containsShortcuts = false
    if (response && response.message_contents) {
      for (let i = 0; i < response.message_contents.length; i++) {
        const isCustomerShortcuts = response.message_contents[i].type === 'EVENT' &&
          response.message_contents[i].payload.type === 'CUSTOMER_SHORTCUTS'
        if (!isCustomerShortcuts) {
          // return false as soon as a message content is not a CUSTOMER_SHORTCUTS
          return false
        } else {
          containsShortcuts = true
        }
      }
    }
    return containsShortcuts
  }

  /****************************************************/

  /* Check If CAPI Response Contains ONLY Livechat Typing event  */

  /****************************************************/

  var isLastMessageAgentTyping = (response) => {
    const agentTyping = false

    if (response && response.message_contents && response.message_contents.length > 0) {
      const lastResponse = response.message_contents[response.message_contents.length - 1]
      const containsTyping = lastResponse.type === 'EVENT' &&
        lastResponse.payload.type === 'LIVE_CHAT_SEND_AGENT_STATE' &&
        lastResponse.payload.payload && lastResponse.payload.payload.is_typing !== undefined
      if (containsTyping) {
        return true
      }
    }
    return agentTyping
  }

  /****************************************************/

  /* Handle CAPI Request  */

  /****************************************************/

  var handleCAPIRequest = function (functionName, response) {
    // console.log('handleCAPIRequest', functionName, response)
    this.passToNativeWebviewCAPIRequestMethod({ name: functionName, response: response })
  }

  /****************************************************/

  /* Handle CAPI Response  */

  /****************************************************/

  var handleCAPIResponse = function (functionName, response) {
    // console.log('handleCAPIResponse', functionName, response)
    this.passToNativeWebviewCAPIResponseMethod({ name: functionName, response: response })
  }

  /****************************************************/

  /* Handle CAPI Error  */

  /****************************************************/

  var handleCAPIError = function (functionName, response) {
    // console.log('handleCAPIError', functionName, response)
    this.passToNativeWebviewCAPIErrorMethod({ name: functionName, response: response })
  }

  /****************************************************/

  /* Main Engine - Handle Response Data and pass to requested component to display content in the view   */

  /****************************************************/

  var handleResponse = function (response, optionalMessageDelayTimer, optionalDisableScrolling) {
    var _this = this
    // Disable textbox and send button when message sent
    // console.log('handleResponse', response)
    const containsOnlyShortcuts = checkIfContainsOnlyShortcuts(response)
    if (!containsOnlyShortcuts) {
      store.dispatch('actionRenderingStatus', 'started')
    }

    updateSessionCookie()
    resetInactivityTimer()

    if (!isValidResponse(response) || response.status.code === STATUS_OK_NO_CONTENTS) {
      store.dispatch('actionRenderingStatus', 'finished')
      return
    }

    // Get response from Screen Reader
    _this.accessibilityContentScreenReader(response)

    // Update session id if available from response
    if (response.context && response.context.user && response.context.user.session_id) {
      store.dispatch('actionKaiSessionId', response.context.user.session_id)
    }

    var messageTextCounter = 0
    nextTask(_this, 0, response, optionalMessageDelayTimer, optionalDisableScrolling, messageTextCounter)
  }

  /****************************************************/

  /* NEXT TASK AFTER MESSENGER CONTENT ENDS */

  /****************************************************/

  function nextTask (_this, counter, response, optionalMessageDelayTimer, optionalDisableScrolling, messageTextCounter) {
    var messageContentLength = -1
    if (response.message_contents) {
      messageContentLength = response.message_contents.length
    } else {
      // No message contents so hide typing indicator
      _this.typingIndicator(false)
    }

    var containsQuickReplies = response.quick_replies && response.quick_replies.length > 0
    var showQuickReplies = (counter === messageContentLength - 1 || messageContentLength < 0) && containsQuickReplies

    var responseContainsAvatar = checkIfContainsAvatar(response)

    // If response contains message content
    if (messageContentLength > 0) {
      // Message Text
      if (response.message_contents[counter].type === 'TEXT') {
        if (!optionalDisableScrolling) {
          _this.typingIndicator(true)
        }
      }
      if (counter === 0) {
        // Add Chatbot timestamp except for first message of the session or if the response contains only customer_shortcuts
        if (document.getElementById('kai-core-components').children.length > 0 && !checkIfContainsOnlyShortcuts(response)) {
          if (response.timestamp) {
            if (moment(response.timestamp).locale($store.getters.getBotLanguages.localeTimeStamp).format(store.getters.getTimeStampFormat) !== store.getters.getLastMessageReceievedEpoc) {
              // optionalTimeStamp is used for displaying chat history
              store.dispatch('actionLastMessageReceievedEpoc', moment(response.timestamp).locale($store.getters.getBotLanguages.localeTimeStamp).format(store.getters.getTimeStampFormat))
              _this.appendComponent(response.timestamp, TimeStamp, 'kai-core-components')
            }
          } else if ((store.state.liveChatStarted === false || store.state.isLiveAgentConnected === true) && moment().locale($store.getters.getBotLanguages.localeTimeStamp).format(store.getters.getTimeStampFormat) !== store.getters.getLastMessageReceievedEpoc) {
            store.dispatch('actionLastMessageReceievedEpoc', moment().locale($store.getters.getBotLanguages.localeTimeStamp).format(store.getters.getTimeStampFormat))
            _this.appendComponent({}, TimeStamp, 'kai-core-components')
          }
        }
      }

      var timer = $store.state.defaultMessageDelayTimer

      if (response.message_contents[counter].type === 'PAUSE' && response.message_contents[counter].payload.duration) {
        timer = response.message_contents[counter].payload.duration
      } else if (optionalMessageDelayTimer !== undefined && optionalMessageDelayTimer !== null) {
        timer = optionalMessageDelayTimer
      }

      if (checkIfMessageContentContainsAvatar(response.message_contents[counter]) && counter === messageContentLength - 1) {
        _this.typingIndicator(false)
      }

      if (timer > 0) {
        setTimeout(() => {
          renderMessageContent(_this, counter, response, optionalMessageDelayTimer, optionalDisableScrolling, messageTextCounter)
          if (showQuickReplies) {
            addQuickReplies(response)
          }
        }, timer)
      } else {
        renderMessageContent(_this, counter, response, optionalMessageDelayTimer, optionalDisableScrolling, messageTextCounter)
        if (showQuickReplies) {
          addQuickReplies(response)
        }
      }

      if (!responseContainsAvatar && counter === 0) {
        // Per default we display Active Avatar if the response doesn't precise which avatar to use
        // We use JSON.parse and stringify to create a new object and make sure the Vue mutation is getting triggered
        store.dispatch('actionAvatarUpdate', JSON.parse(JSON.stringify(avatarActiveJsonData.message_contents[0].payload)))
      }
      // Clear input message inside the store
      store.dispatch('actionInputMessage', '')
    } else {
      if (showQuickReplies) {
        addQuickReplies(response)
      }
      store.dispatch('actionRenderingStatus', 'finished')
    }
  } // Next Task method ends

  var renderMessageContent = function (_this, counter, response, optionalMessageDelayTimer, optionalDisableScrolling, messageTextCounter) {
    var messageContentLength = response.message_contents.length
    /****************************************************/

    /* Type = DEBUG  */

    /****************************************************/

    if (response.message_contents[counter].type === 'DEBUG') {
      // console.log('payload', response.message_contents[counter].payload)

      var slots = {
        debugContent: response.message_contents[counter].payload
      }
      _this.appendComponent(slots, DebugMode, 'kai-core-components')
    }

    /****************************************************/

    /* Type = EVENT and payload type is CUSTOMER_SHORTCUTS  (custom shortcut panel payload) */

    /****************************************************/

    if (response.message_contents[counter].type === 'EVENT' && response.message_contents[counter].payload.type === 'CUSTOMER_SHORTCUTS') {
      store.dispatch('actionShortcutPayload', response.message_contents[counter].payload)
    }

    /****************************************************/

    /* Type = EVENT  */

    /****************************************************/
    if (response.message_contents[counter].type === 'EVENT') {
      // add new LiveChat component when live chat is triggered and this is the first time we receive the LIVE_CHAT_NOTIFY_CUSTOMER_QUEUE_STATE event
      if (response.message_contents[counter].payload.type === 'LIVE_CHAT_NOTIFY_CUSTOMER_QUEUE_STATE' && !$store.getters.isLiveChatStarted) {
        store.state.liveChatStarted = true
        _this.appendComponent(response.message_contents[counter], LiveChat, 'kai-core-components')
      }

      // add a second LiveChat component to display the LIVE_CHAT_NOTIFY_SESSION_STOPPED event only if an agent has been connected to the chat.
      // if LIVE_CHAT_NOTIFY_SESSION_STOPPED is received when user was still in the queue, then the first LiveChat component is used.
      if (response.message_contents[counter].payload.type === 'LIVE_CHAT_NOTIFY_SESSION_STOPPED') {
        if ($store.getters.isLiveAgentConnected) {
          _this.appendComponent(response.message_contents[counter], LiveChat, 'kai-core-components')
        }
      }
      if (response.message_contents[counter].payload.type === 'LIVE_CHAT_SEND_AGENT_STATE') {
        _this.typingIndicator(response.message_contents[counter].payload.payload.is_typing)
      }
      store.dispatch('actionLastEvent', response.message_contents[counter])
    }

    /****************************************************/

    /* Type = TEXT  */

    /****************************************************/
    if (response.message_contents[counter].type === 'TEXT') {
      // If multiple messages don't show icon profile images after the second text bubble
      if (messageTextCounter === 0) {
        _this.addMessageContent('kai-core-components', response.message_contents[counter].payload.text, TextBubble, 'kai-left', true)
      } else {
        _this.addMessageContent('kai-core-components', response.message_contents[counter].payload.text, TextBubble, 'kai-left', false)
      }
      messageTextCounter++
    }

    /****************************************************/

    /* Type = CARD  */

    /****************************************************/

    if (response.message_contents[counter].type === 'CARD') {
      // _this.addCardContainer(response.message_contents[counter], 'kai-core-components', CardSingle)
      // If multiple messages don't show icon profile images after the second text bubble
      if (messageTextCounter === 0) {
        _this.addCardContainer(response.message_contents[counter], 'kai-core-components', CardSingle, true)
      } else {
        _this.addCardContainer(response.message_contents[counter], 'kai-core-components', CardSingle, false)
      }
      messageTextCounter++
    }

    /****************************************************/

    /* Type = MEDIUM  */

    /****************************************************/

    if (response.message_contents[counter].type === 'MEDIUM') {
      if (messageTextCounter === 0) {
        _this.addCardContainer(response.message_contents[counter], 'kai-core-components', MediumSingle, true)
      } else {
        _this.addCardContainer(response.message_contents[counter], 'kai-core-components', MediumSingle, false)
      }
      messageTextCounter++
    }

    /****************************************************/

    /* Type = Select  */

    /****************************************************/
    if (response.message_contents[counter].type === 'SELECT') {
      _this.addCardContainer(response.message_contents[counter], 'kai-core-components', Select)
    }

    /****************************************************/

    /* Type = CONTAINER  */

    /****************************************************/

    // Message Container
    if (response.message_contents[counter].type === 'CONTAINER') {
      // Check for mode === LIST
      if (response.message_contents[counter].payload.mode === 'LIST') {
        if (messageTextCounter === 0) {
          _this.addCardContainer(response.message_contents[counter], 'kai-core-components', ListViewBase, true)
        } else {
          _this.addCardContainer(response.message_contents[counter], 'kai-core-components', ListViewBase, false)
        }
        messageTextCounter++
      }

      // Check for mode === CAROUSEL
      if (response.message_contents[counter].payload.mode === 'CAROUSEL') {
        if (response.message_contents[counter].payload.contents.length > 1) {
          // If multiple cards inside carousel
          _this.addCardContainer(response.message_contents[counter], 'kai-core-components', Carousel)
          // Increase card carousel value inside the store
          store.dispatch('actionCarouselCounter', '')
        } else {
          // If single cards inside carousel
          if (response.message_contents[counter].payload.contents[0].type === 'CARD') {
            _this.addCardContainer(response.message_contents[counter].payload.contents[0], 'kai-core-components', CardSingle)
          } else if (response.message_contents[counter].payload.contents[0].type === 'MEDIUM') {
            _this.addCardContainer(response.message_contents[counter].payload.contents[0], 'kai-core-components', MediumSingle)
          } else if (response.message_contents[counter].payload.contents[0].type === 'CUSTOM') {
            _this.addCardContainer(response.message_contents[counter].payload.contents[0], 'kai-core-components', CustomSingle)
          }
        }
      }
    }

    /****************************************************/

    /* Type = CUSTOM  */

    /****************************************************/

    if (response.message_contents[counter].type === 'CUSTOM' &&
      (response.message_contents[counter].payload.type === 'WEB_SEARCH' ||
        response.message_contents[counter].payload.type === 'WEB_SEARCH_GOOGLE' ||
        response.message_contents[counter].payload.type === 'WEB_SEARCH_SILVERCLOUD')) {
      _this.addContentButton(response.message_contents[counter], 'kai-core-components', CustomSingle)
    } else if (response.message_contents[counter].type === 'CUSTOM') {
      if (response.message_contents[counter].payload.type === 'AVATAR') {
        if (!store.state.useAvatar) {
          // in case WV is not configured to use Avatar Lottie animation, check instead if custom Avatar payload contains an image_url for KORC.
          // if yes we update the path botWidgetIconUrl used by MessageProfileImage for static avatar.
          if (response.message_contents[counter].payload.data && response.message_contents[counter].payload.data.image_url) {
            if (!$store.getters.isInlineImagesEnabled) {
              $store.state.botWidgetIconUrl = response.message_contents[counter].payload.data.image_url
            } else {
              $store.state.botWidgetIconInlineUrl = response.message_contents[counter].payload.data.image_url
            }
          } else {
            if (!$store.getters.isInlineImagesEnabled) {
              $store.state.botWidgetIconUrl = $store.getters.getBaseImagePath + 'chat-icon.png'
            } else {
              $store.state.botWidgetIconInlineUrl = require('@/assets/img/' + 'chat-icon.png')
            }
          }
        } else {
          store.dispatch('actionAvatarUpdate', response.message_contents[counter].payload)
        }
      } else {
        _this.addCardContainer(response.message_contents[counter], 'kai-core-components', CustomSingle)
      }
    }

    /****************************************************/

    /* Type = BUTTON  (Standalone button) */

    /****************************************************/

    if (response.message_contents[counter].type === 'BUTTON') {
      _this.typingIndicator(false)
      _this.addContentButton(response.message_contents[counter], 'kai-core-components', ContentButton)
    }

    /****************************************************/

    /* Type = REDIRECT  */

    /****************************************************/

    if (response.message_contents[counter].type === 'REDIRECT') {
      _this.buttonPressed(response.message_contents[counter].payload)
    }

    /****************************************************/

    /* Type = LINK  (Standalone link) */

    /****************************************************/

    if (response.message_contents[counter].type === 'LINK') {
      _this.addContentButton(response.message_contents[counter], 'kai-core-components', ContentLink)
    }

    /****************************************************/

    /* Type = Avatar  */

    /****************************************************/

    if (response.message_contents[counter].type === 'AVATAR') {
      store.dispatch('actionAvatarUpdate', response.message_contents[counter])
    }

    /****************************************************/

    /* Type = WEB_SEARCH  (custom search engine) */

    /****************************************************/

    if (response.message_contents[counter].type === 'WEB_SEARCH' || response.message_contents[counter].type === 'WEB_SEARCH_GOOGLE' || response.message_contents[counter].type === 'WEB_SEARCH_SILVERCLOUD') {
      _this.addContentButton(response.message_contents[counter], 'kai-core-components', CustomSearch)
    }

    /****************************************************/

    /* Type = NBEST  */

    /****************************************************/

    if (response.alternative_questions) {
      if (response.alternative_questions.length > 0) {
        _this.addContentButton(response.alternative_questions, 'kai-core-components', NBest)
      }
    }

    /****************************************************/

    $jq('.kai-left-wrapper').addClass('msg-row')

    // Add class to the last msg bubble
    $jq('.kai-left-wrapper').last().addClass('last-left-msg-bubble')

    if (counter === messageContentLength - 1) {
      if (!optionalDisableScrolling) {
        if (!isLastMessageAgentTyping(response)) {
          _this.typingIndicator(false)
        }
        setTimeout(() => store.dispatch('actionRenderingStatus', 'finished'), $store.state.defaultMessageDelayTimer)
      }
    }

    counter++

    if (counter < messageContentLength) {
      nextTask(_this, counter, response, optionalMessageDelayTimer, optionalDisableScrolling, messageTextCounter)
    }
  }

  /****************************************************/

  /* Check CAPI Response Status is V  */

  /****************************************************/

  var isValidResponse = function (response) {
    if (response.status && response.status.code &&
      (response.status.code === STATUS_OK || response.status.code === parseInt(STATUS_OK) ||
        response.status.code === STATUS_OK_NO_CONTENTS || response.status.code === parseInt(STATUS_OK_NO_CONTENTS) ||
        response.status.code === STATUS_INVALID_REQUEST || response.status.code === parseInt(STATUS_INVALID_REQUEST) ||
        response.status.code === STATUS_AUTHENTICATION_FAILED || response.status.code === parseInt(STATUS_AUTHENTICATION_FAILED) ||
        response.status.code === STATUS_ACCESS_DENIED || response.status.code === parseInt(STATUS_ACCESS_DENIED) ||
        response.status.code === STATUS_LOGICAL_ERRORS || response.status.code === parseInt(STATUS_LOGICAL_ERRORS) ||
        response.status.code === STATUS_OTP_REQUIRED || response.status.code === parseInt(STATUS_OTP_REQUIRED) ||
        response.status.code === STATUS_INVALID_OTP_RETRY || response.status.code === parseInt(STATUS_INVALID_OTP_RETRY) ||
        response.status.code === STATUS_EXPIRED_OTP || response.status.code === parseInt(STATUS_EXPIRED_OTP) ||
        response.status.code === STATUS_TOO_MANY_OTP_FAILURES || response.status.code === parseInt(STATUS_TOO_MANY_OTP_FAILURES) ||
        response.status.code === STATUS_INTERNAL_SERVER_ERROR || response.status.code === parseInt(STATUS_INTERNAL_SERVER_ERROR) ||
        response.status.code === STATUS_SERVICE_UNAVAILABLE || response.status.code === parseInt(STATUS_SERVICE_UNAVAILABLE))) {
      return true
    } else if (response.status && response.status.code === STATUS_INVALID_SESSION_ID) {
      handleInvalidSessionID(response)
      return false
    } else {
      return false
    }
  }

  /****************************************************/

  /* Typing Icon  */

  /****************************************************/

  var typingIndicator = function (toggle) {
    if (typingIndicatorTimerHolder) {
      clearTimeout(typingIndicatorTimerHolder)
    }
    if (toggle === true) {
      store.dispatch('actionTypingIndicator', true)

      // When livechat is started, automatically remove typing indicator after 5s in case it has not been removed manually
      // (needed in case customer Live Chat system is not properly sending event when agent stopped typing)
      if ($store.getters.isLiveChatStarted) {
        typingIndicatorTimerHolder = setTimeout(function () {
          store.dispatch('actionTypingIndicator', false)
        }, 5000)
      }
    } else {
      store.dispatch('actionTypingIndicator', false)
    }
  }

  /****************************************************/

  /* Append Component  */

  /****************************************************/

  var appendComponent = function (obj, component, element, position) {
    var ComponentClass = Vue.extend(component)
    var instance = new ComponentClass({
      propsData: { type: 'primary' }
    })
    instance.$slots.default = obj
    instance.$mount()

    if (document.getElementById(element) != null) {
      if (position === 'bottom') {
        document.getElementById(element).before(instance.$el)
      } else {
        document.getElementById(element).appendChild(instance.$el)
      }
    }
  }

  /****************************************************/

  /* Map Location  */

  /****************************************************/

  var mapLocation = function () {
    appendComponent({}, LocationMap, 'kai-core-components')
  }

  /****************************************************/

  /* Multi Select  */

  /****************************************************/

  var select = function () {
    appendComponent({}, Select, 'bottombar', 'bottom')
  }

  /****************************************************/

  /* Load History  */

  /****************************************************/

  var loadHistory = function () {
    // If seesion id
    const initMode = findGetParameter('initMode')
    if (findGetParameter('sessionID')) {
      var sessionID = findGetParameter('sessionID')
      $store.state.kaiSessionId = sessionID
      if (!(initMode && initMode === 'capi_redirect')) {
        kserver.CoreAPI.getHistory()
      }
    } else if ($store.getters.getKaiSessionId !== '' && $store.getters.isSessionCookieEnabled && !(initMode && initMode === 'capi_redirect')) {
      kserver.CoreAPI.getHistory()
    }
  }

  var findGetParameter = function (parameterName) {
    const params = new URLSearchParams(location.search)
    let result = params.get(parameterName)
    if (!result) {
      if ($store.state.scriptSrc) {
        const scriptURL = new URL($store.state.scriptSrc)
        const scriptParams = new URLSearchParams(scriptURL.search)
        result = scriptParams.get(parameterName)
      }
    }
    return result
  }

  var generateMainContainerClass = () => {
    if ($store.state.useWidgetMode && $store.state.generateWebviewMainContainer) {
      if (document.getElementsByClassName('webview--app').length === 0) {
        const body = document.getElementsByTagName('body')[0]
        body.classList.add('webview--app')
        const newElem = document.createElement('div')
        newElem.setAttribute('id', $store.state.el)
        body.appendChild(newElem)
      }
    }
  }

  /****************************************************/

  /* Accessibility Content ScreenReader  */

  /****************************************************/

  var accessibilityContentScreenReader = function (response) {
    // Check config to see if screenReader is false
    if (store.getters.getScreenReader === false) {
      return false
    }

    // Reset screen array
    var screenReaderMessage = []
    var screenReaderQuickReplies = []
    var countItems = 0
    // var screenReaderCurrentDate = parseInt(moment().format('LT').replace(/\D+/g, ''));
    var screenReaderCurrentDate = moment().format('hh:mm A')

    var screenReaderLanguage = $store.getters.getBotLanguages.translations.screenReader

    //* *** Message Content Data
    if (response.message_contents !== undefined && response.message_contents !== null) {
      for (var i = 0; i < response.message_contents.length; i++) {
        // TEXT Content
        if (response.message_contents[i].type === 'TEXT') {
          screenReaderMessage.push(response.message_contents[i].payload.text)
        }
        // BUTTON Content
        if (response.message_contents[i].type === 'BUTTON') {
          screenReaderMessage.push(screenReaderLanguage.button + ': ' + response.message_contents[i].payload.label)
        }

        if (response.message_contents[i].type === 'CARD') {
          screenReaderMessage.push(screenReaderLanguage.card + ': ' + response.message_contents[i].payload.title + '. ')
          // TODO: add medium image description if available in CAPI payload
          screenReaderMessage.push(response.message_contents[i].payload.subtitle + '. ')
          if (response.message_contents[i].payload.buttons) {
            for (var k = 0; k < response.message_contents[i].payload.buttons.length; k++) {
              screenReaderMessage.push(screenReaderLanguage.button + ' ' + [k + 1] + ': ' + response.message_contents[i].payload.buttons[k].label + '. ')
            }
          }
        }

        // CAROUSEL CARD Content
        if (response.message_contents[i].type === 'CONTAINER') {
          countItems = 0
          screenReaderMessage.push(response.message_contents[i].payload.contents.length + ' ' + screenReaderLanguage.carouselCards + '. ')
          for (var j = 0; j < response.message_contents[i].payload.contents.length; j++) {
            countItems++
            screenReaderMessage.push(screenReaderLanguage.card + ' ' + [countItems] + ': ' + response.message_contents[i].payload.contents[j].payload.title + '. ')
            screenReaderMessage.push(response.message_contents[i].payload.contents[j].payload.subtitle + '. ')
            if (response.message_contents[i].payload.contents[j].payload.buttons) {
              for (var m = 0; m < response.message_contents[i].payload.contents[j].payload.buttons.length; m++) {
                screenReaderMessage.push(screenReaderLanguage.button + ' ' + [m + 1] + ': ' + response.message_contents[i].payload.contents[j].payload.buttons[m].label + '. ')
              }
            }
          }
        }

        if (response.message_contents[i].type === 'SELECT') {
          countItems = 0
          screenReaderMessage.push(response.message_contents[i].payload.options.length + ' ' + response.message_contents[i].payload.mode + ' ' + screenReaderLanguage.cards + '. ')
          for (var o = 0; o < response.message_contents[i].payload.options.length; o++) {
            countItems++
            if (response.message_contents[i].payload.options[o].payload) {
              if (response.message_contents[i].payload.options[o].payload.title) {
                screenReaderMessage.push(screenReaderLanguage.card + ' ' + [countItems] + ': ' + response.message_contents[i].payload.options[o].payload.title + '. ')
              }
              if (response.message_contents[i].payload.options[o].payload.subtitle) {
                screenReaderMessage.push(response.message_contents[i].payload.options[o].payload.subtitle + '. ')
              }
              if (response.message_contents[i].payload.options[o].payload.buttons) {
                for (var p = 0; p < response.message_contents[i].payload.options[o].payload.buttons.length; p++) {
                  screenReaderMessage.push(screenReaderLanguage.button + ' ' + [p + 1] + ': ' + response.message_contents[i].payload.options[o].payload.buttons[p].label + '. ')
                }
              }
            } else if (response.message_contents[i].payload.options[o].label) {
              screenReaderMessage.push(screenReaderLanguage.card + ' ' + [countItems] + ': ' + response.message_contents[i].payload.options[o].label + '. ')
            }
          }
        }
      }
    }

    //* *** Quick Replies Data
    if (response.quick_replies !== undefined && response.quick_replies !== null) {
      // Reset Counter
      countItems = 0
      // Post quick reply length
      screenReaderMessage.push(screenReaderLanguage.thereAre + ' ' + (response.quick_replies.length) + ' ' + screenReaderLanguage.quickReplies + '. ')

      for (var n = 0; n < response.quick_replies.length; n++) {
        // BUTTON Content
        countItems++
        var quickReplyLabel
        if (response.quick_replies[n].label && response.quick_replies[n].label.length > 0) {
          quickReplyLabel = response.quick_replies[n].label
        } else {
          quickReplyLabel = response.quick_replies[n].display_text
        }
        screenReaderMessage.push(screenReaderLanguage.quickReply + ' ' + [countItems] + ': ' + quickReplyLabel + '. ')
      }
    }

    //* *** Alternative Question Data
    if (response.alternative_questions !== undefined && response.alternative_questions !== null) {
      // Reset Counter
      countItems = 0
      screenReaderMessage.push(screenReaderLanguage.thereAre + ' ' + (response.alternative_questions.length) + ' ' + screenReaderLanguage.alternativeQuestionBottom + '. ')

      for (var l = 0; l < response.alternative_questions.length; l++) {
        // Alternative Question Content
        countItems++
        if (response.alternative_questions[l].question && response.alternative_questions[l].question.length > 0) {
          screenReaderMessage.push(screenReaderLanguage.alternativeQuestion + ' ' + [countItems] + ': ' + response.alternative_questions[l].question + '. ')
        } else {
          screenReaderMessage.push(screenReaderLanguage.alternativeQuestion + ' ' + [countItems] + ': ' + response.alternative_questions[l].display_sentence + '. ')
        }
      }
    }

    if (screenReaderMessage.length > 0) {
      setTimeout(function () {
        $jq('#virtual-assistant-content').children('div').html(screenReaderLanguage.timeSendAt + ' ' + screenReaderCurrentDate + '. ' + screenReaderLanguage.from + ' ' + screenReaderLanguage.virtualAssistantDesignation + ':<br>' + screenReaderMessage.join(' ') + ' ' + screenReaderQuickReplies.join(' '))
      }, 2000)
    }
  }

  /****************************************************/

  /* update Session cookie  */

  /****************************************************/

  var updateSessionCookie = function () {
    if ($store.getters.getKaiSessionId !== '' && $store.getters.isSessionCookieEnabled) {
      if (!$store.getters.getCookieAutoRefresh) {
        setCookieSession($store.getters.getKaiSessionId, $store.getters.getCookieExpirationTimeInSec)
      } else {
        if (!cookieAutoRefreshTimeout) {
          setCookieSession($store.getters.getKaiSessionId, $store.getters.getCookieExpirationTimeInSec)
          cookieAutoRefreshTimeout = setInterval(function () {
            setCookieSession($store.getters.getKaiSessionId, $store.getters.getCookieExpirationTimeInSec)
          }, $store.getters.getCookieExpirationTimeInSec * 1000 - 100) // reset the cookie a few ms before it expired just to be safe.
        }
      }
    }
  }

  function setCookieSession (sessionId, cookieExpirationTimeInSe) {
    var expiringDate = new Date(new Date().getTime() + cookieExpirationTimeInSe * 1000)
    Cookies.remove('k_session_id')
    Cookies.set('k_session_id', sessionId, { expires: expiringDate })
  }

  /****************************************************/

  /* Handle Invalid Session ID  */

  /****************************************************/

  var handleInvalidSessionID = function (response, isAfterStartSession) {
    typingIndicator(false)
    if (!store.state.overrideInvalidSessionIdHandling) {
      if (store.getters.getKaiSessionId === '') {
        // reach here when the user sent a request before the first Session Init event is called
        Kai.Core.addMessageContent('kai-core-components', store.getters.getBotLanguages.translations.errorMessage.invalidSessionID.sessionNotInitialized, TextBubble, 'kai-left', true)
      }

      if (store.getters.getKaiSessionId !== '') {
        // reach here when session break
        invalidSessionCounter++
        if (isAfterStartSession) {
          invalidSessionAfterStartSessionCounter++
        }
        if (invalidSessionAfterStartSessionCounter >= store.getters.getMaxInvalidSessionIdCounterAfterStartSessionEvent) {
          // if an error 440 occured just after a call to the the Start session event more than 1 (configurable)
          Kai.Core.addMessageContent('kai-core-components', store.getters.getBotLanguages.translations.errorMessage.invalidSessionID.TooManyInvalidSessionsAfterStartSessionEvent, TextBubble, 'kai-left', true)
        } else if (invalidSessionCounter >= store.getters.getMaxInvalidSessionIdCounter) {
          // if the total number of error 440 is more than 5 (configurable) times during the chat
          Kai.Core.addMessageContent('kai-core-components', store.getters.getBotLanguages.translations.errorMessage.invalidSessionID.TooManyInvalidSessions, TextBubble, 'kai-left', true)
        } else {
          // try to recover by starting the session again and upon success sending the user input back.
          var previousUserMessage = store.state.inputMessage
          kserver.CoreAPI.startSession(function (callbackData) {
            if (callbackData && callbackData.status.code === STATUS_OK) {
              sendUserMessage(previousUserMessage)
            }
          })
        }
      }
    } else {
      store.state.overrideInvalidSessionIdHandling(response)
    }
  }

  /****************************************************/

  /* Browser Detection  */

  /****************************************************/

  var isIE11 = !!window.MSInputMethodContext && !!document.documentMode

  if (!isIE11) {
    // Focus when users scroll window inside iframe fix keyboard freezing issue.
    document.addEventListener('keydown', function (e) {
      window.focus()
      // console.log("keydown");
    })

    document.addEventListener('touchend', function (e) {
      window.focus()
      // console.log("touchend");
    })
  }

  /****************************************************/

  /* Detect iOS devices - Where is this being used? JB   */

  /****************************************************/
  var agent = navigator.userAgent
  if (agent.indexOf('iPhone') > 0 || agent.indexOf('iPod') > 0) {
    // document.querySelector('#kai-container').addClass('ios');
    // console.log("IOS device");
    // Question slide panel styling inside Iframe
    // $jq('.info-panel, .info-panel p, .info-panel h3, .info-panel div').css('font-size','9px')

  }
  /*
           var agent = navigator.userAgent;
           if (agent.indexOf('iPhone') > 0 || agent.indexOf('iPod') > 0) {
               this._element.find('.kai-chat-content').addClass('ios');

               //Question slide panel styling inside Iframe
               //$jq('.info-panel, .info-panel p, .info-panel h3, .info-panel div').css('font-size','9px')

           }

       //Polyfill
       //Method endsWith() not supported in IE
       if (!String.prototype.endsWith) {
         String.prototype.endsWith = function(searchString, position) {
             var subjectString = this.toString();
             if (typeof position !== 'number' || !isFinite(position)
                 || Math.floor(position) !== position || position > subjectString.length) {
               position = subjectString.length;
             }
             position -= searchString.length;
             var lastIndex = subjectString.indexOf(searchString, position);
             return lastIndex !== -1 && lastIndex === position;
         };
       }
     */

  function ConvertKeysToUpperCase (obj) {
    var output = {}
    for (var i in obj) {
      if (Object.prototype.toString.apply(obj[i]) === '[object Object]') {
        output[i.toUpperCase()] = ConvertKeysToUpperCase(obj[i])
      } else if (Object.prototype.toString.apply(obj[i]) === '[object Array]') {
        output[i.toUpperCase()] = []
        output[i.toUpperCase()].push(ConvertKeysToUpperCase(obj[i][0]))
      } else {
        output[i.toUpperCase()] = obj[i]
      }
    }
    return output
  }

  function isApiVersionAtLeast (desiredVersion) {
    var apiVersion = store.state.api_version
    if (typeof desiredVersion === 'number') {
      return parseFloat(apiVersion.substring(0, 3)) >= desiredVersion
    }
    // api_version length should be at least 3 characters with 2 digits, e.g 4.1
    // but it can be also 5 characters with 3 digits, e.g 4.1.2
    var isSuperiorOrEqual = false
    var extraDigit = false
    var extraDigitCompare = false
    if (typeof apiVersion !== 'undefined') {
      if (apiVersion.length === 5 && desiredVersion.length === 5) {
        extraDigit = true
        extraDigitCompare = apiVersion[4] >= desiredVersion[4]
      } else {
        var tempDigit = 0
        if (apiVersion.length === 5) {
          extraDigit = true
          // extraDigitCompare = apiVersion[4] >= tempDigit? true: false
          extraDigitCompare = true
        } else if (desiredVersion.length === 5) {
          extraDigit = true
          extraDigitCompare = tempDigit >= desiredVersion[4]
        }
      }
      isSuperiorOrEqual = !(parseFloat(apiVersion.substring(0, 3)) < parseFloat(desiredVersion.substring(0, 3)))

      if (isSuperiorOrEqual) {
        if (extraDigit && parseFloat(apiVersion.substring(0, 3)) === parseFloat(desiredVersion.substring(0, 3))) {
          isSuperiorOrEqual = extraDigitCompare
        }
      }
    }
    return isSuperiorOrEqual
  }

  function updateConfigAndThemeVariables (response) {
    // response = {
    //   config: {
    //     "useWidgetMode": false,
    //     "useHeaderBar": false,
    //     "useSplashScreen": false,
    //   },
    //   content: {
    //     style: {
    //       'main-background-color': '#f2f2f2',
    //       'component-background-color': '#ffffff',
    //       'background-gradient-starting-color-rgb': 'rgba(255, 255, 255, 0)',
    //       'background-gradient-ending-color-rgb': 'rgba(255, 255, 255, 1)',
    //       'left-message-color': '#ffffff',
    //       'left-message-text-color': '#000000',
    //       'right-message-color': '#444A58',
    //       'right-message-text-color': '#ffffff',
    //       'text-bubble-and-button-max-width': '222px',
    //       'text-color': '#1c2029',
    //       'font-title-size': '20px',
    //       'font-sub-title-size': '14px'
    //     }
    //   }
    // }
    Cookies.remove('k_config')
    if (response.config) {
      Cookies.set('k_config', response.config)
      for (const [key, value] of Object.entries(response.config)) {
        console.log('key = ' + key)
        console.log('value = ' + value)
        if (store.state[key] !== undefined) {
          if (key === 'botLanguages') {
            store.state[key] = $jq.extend(true, store.state[key], value)
          } else {
            store.state[key] = value
          }
        }
      }
    }

    generateMainContainerClass()

    Cookies.remove('k_style')
    if (response.content && response.content.style) {
      Cookies.set('k_style', response.content.style)
      for (const [key, value] of Object.entries(response.content.style)) {
        var currentValue = getComputedStyle(document.getElementsByClassName('webview--app')[0]).getPropertyValue('--' + key)
        if (currentValue) {
          document.getElementsByClassName('webview--app')[0].style.setProperty('--' + key, value)
        }
      }
    }
  }

  function inactivityWatcher () {
    window.onload = resetInactivityTimer
    window.onmousemove = resetInactivityTimer
    window.onmousedown = resetInactivityTimer // catches touchscreen presses as well
    window.ontouchstart = resetInactivityTimer // catches touchscreen swipes as well
    window.onclick = resetInactivityTimer // catches touchpad clicks as well
    window.onkeydown = resetInactivityTimer
    window.addEventListener('scroll', resetInactivityTimer, true) // improved see comments
  }

  function onInactivityTimerFinished () {
    kserver.CoreAPI.sendIntent('kcb_timeout')
  }

  function resetInactivityTimer () {
    clearTimeout(inactivityTimerHolder)
    if (store.state.inactivityTimeInSec > 0) {
      inactivityTimerHolder = setTimeout(onInactivityTimerFinished, store.state.inactivityTimeInSec * 1000)
    }
  }

  /****************************************************/

  /* AutoComplete  */

  /****************************************************/

  var autoCompleteRequest = function (ajaxSettings, query) {
    return kbaseserver.BaseAPI.autoCompleteAjaxRequest(ajaxSettings, query)
  }

  /****************************************************/

  /* Avatar Files  */

  /****************************************************/

    
  var  getAvatarFile = async (name) => {
    if ($store.getters.isInlineAvatarEnabled) {
      /// #if process.env.MODE !== 'single'
        // eslint-disable-next-line
        let avatar = await import('@/avatars/' + name + '.json')
        return avatar
      /// #else
      const nameLowerCase = name.toLowerCase()
      if (nameLowerCase === 'splash1_bodymovin') {
        return splash1Bodymovin
      }
      if (nameLowerCase === 'splash2_bodymovin') {
        return splash2Bodymovin
      }
      if (nameLowerCase === 'active_bodymovin') {
        return activeBodymovin
      }
      if (nameLowerCase === 'chat_icon_bodymovin') {
        return chatIconBodymovin
      }
      if (nameLowerCase === 'checkmark_bodymovin') {
        return checkmarkBodymovin
      }
      if (nameLowerCase === 'idle_bodymovin') {
        return idleBodymovin
      }
      if (nameLowerCase === 'leaving_bodymovin') {
        return leavingBodymovin
      }
      if (nameLowerCase === 'notification_bodymovin') {
        return notificationBodymovin
      }
      if (nameLowerCase === 'playground_bodymovin') {
        return playgroundBodymovin
      }
      if (nameLowerCase === 'question_bodymovin') {
        return questionBodymovin
      }
      if (nameLowerCase === 'sorry_bodymovin') {
        return sorryBodymovin
      }
      if (nameLowerCase === 'thank_you_bodymovin') {
        return thankYouBodymovin
      }
      if (nameLowerCase === 'transaction_bodymovin') {
        return transactionBodymovin
      }
      if (nameLowerCase === 'voice_1start_bodymovin') {
        return voice1startBodymovin
      }
      if (nameLowerCase === 'voice_2loop_bodymovin') {
        return voice2LoopBodymovin
      }
      if (nameLowerCase === 'voice_3end_bodymovin') {
        return voice3endBodymovin
      }
      return name
      /// #endif
    } else {
      return $store.getters.getBaseAvatarPath + name + '.json'
    }

  }

  /****************************************************/

  /* MAKE SURE TO EXPORT YOUR FUNCTIONS */

  /****************************************************/

  return {
    passToNativeMethod,
    passToNativeWebviewCAPIRequestMethod,
    passToNativeWebviewCAPIResponseMethod,
    passToNativeWebviewCAPIErrorMethod,
    getVersion,
    getSessionId,
    sendUserMessage,
    sendHiddenUserMessage,
    sendHiddenUserMessageWithMetaFields,
    submitMessage,
    debugSubmitMessageHandler,
    buttonPressed,
    postBackMessage,
    deepLink,

    locationPressed,
    getLocation,
    locationError,
    sendLocation,

    addMessageContent,
    addCardContainer,
    addQuickReplies,
    checkIfContainsAvatar,
    checkIfContainsOnlyShortcuts,
    getThumbsImage,
    addContentButton,
    DatePicker,
    addDatePicker,
    IntroScreen,
    ListViewBase,
    removeQuickReplies,
    handleCAPIRequest,
    handleCAPIResponse,
    handleCAPIError,
    handleResponse,
    typingIndicator,
    appendComponent,
    mapLocation,
    debugMode,
    loadHistory,
    select,
    accessibilityContentScreenReader,
    // Remove Misc function and add inside a separate file.
    findGetParameter,
    isValidResponse,
    sendRequest,
    sendHiddenRequest,
    sendEnterTokenEvent,
    sendAuthPassThruEvent,
    sendProcessOAuthEvent,
    sendGenericEvent,
    startPullService,
    stopPullService,
    sendUserTypingStateToLiveChat,
    getHistory,
    logoutSession,
    submitSelection,
    handleInvalidSessionID,
    isApiVersionAtLeast,
    updateSessionCookie,
    submitIntent,
    autoCompleteRequest,
    getAvatarFile
  }
}()) // End Core.

// For referencing in API as Kai.API.<function> instead of depreciated Kai.Core.<function>
const API = Core

// Export Core
export default {
  Core,
  API
}

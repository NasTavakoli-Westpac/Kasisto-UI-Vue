import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions'
import mutations from './mutations'
import getters from './getters'

import defaultLang from '../assets/language/en-lang'

Vue.use(Vuex)

// If no window.config is added make it definedx
if (typeof window.config === 'undefined') {
  window.config = {}
}

export const store = new Vuex.Store({
  state: {
    /// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Internal use not for config exposure
    kaiSessionId: '', // Stores session Id from kai
    kaiApiVersion: '',
    kaiAppVersion: '',
    kaiDataVersion: '',
    kaiModelVersion: '',
    api_version: (window.config.api_version === undefined) ? '4.1' : window.config.api_version, // The targeted API version for CAPI request
    debug: false, // Flag for when debug mode is turned on using "__debug=true"
    typingIndicator: false, // Trigger typing indicator
    userTyping: false, // indicate if the user started typing
    inputMessage: '', // Stores input message from user
    lastMessageReceievedEpoc: 0, // Last time message was received in epoc time
    sendMessage: false, // Send message flag
    sendSelection: false,
    lastUserMessage: [], // Last user message payload
    responseData: [], // Last response content
    renderingStatus: 'idle',
    carouselCounter: 0, // Increments on new carousel displayed in webview to distinguish between others
    botLanguages: window.langConfig ? window.langConfig : defaultLang, // Import language files
    pullServiceErrorSleepTimer: 5, // time in seconds before triggering the pull service again after an error occured,
    pullServiceErrorOngoing: false, // indicate if there is recurrent error when running pull service
    pullServiceStarted: false, // flag to indicate if the pull service has been started
    pullServiceState: false,
    lastEvent: [], // last event payload
    liveChatStarted: false, // live chat status,
    liveAgentConnected: false,
    showThemeChanger: false,
    showWebviewWidget: false,
    chipSelectedItem: [],
    chipSelectedElement: [],
    chipSelectedItemMax: null,
    selectSubmitIsValid: false,
    avatar: false,
    shortcutPayload: false,
    perviousCompValidation: undefined,
    webviewReady: false, // only set to true once the webview UI is ready to be displayed
    longPressButtonTime: 400, // Minimum time in ms that a user has to press on a button in order for the "long press" event to be triggered.
    defaultMessageDelayTimer: 500, // default pause time in ms between each message content
    scriptSrc: false, // use to keep reference of the script src attribute at the the time it is loaded in the DOM for eventual query String.
    /// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Exposed in window.config.js

    el: window.config.el === undefined ? 'webview' : window.config.el, // element id to construct webview inside
    generateWebviewMainContainer: window.config.el === undefined ? false : window.config.generateWebviewMainContainer,
    useInlineImages:
    window.config.useInlineImages === undefined
      ? false
      : window.config.useInlineImages, // set to true use inline images from /src/assets/ folder, set to false to use static images path specified in baseImagePath
    useInlineAvatar:
    window.config.useInlineAvatar === undefined
      ? true
      : window.config.useInlineAvatar, // set to true use avatar packaged in /src/avatars/ folder, set to false to use static avatars path specified in baseAvatarPath
    baseAvatarPath:
    window.config.baseAvatarPath === undefined
      ? './static/avatar/'
      : window.config.baseAvatarPath, // Path to avatars Lottie animation files
    baseImagePath:
      window.config.baseImagePath === undefined
        ? './static/img/'
        : window.config.baseImagePath, // Path to thumbs-up.png, thumbs-down.png
    botLogoUrl:
      window.config.botLogoUrl === undefined
        ? './static/img/Logo_Kai.png'
        : window.config.botLogoUrl, // Path to bot's chat avatar animation image
    botLogoBackupUrl:
      window.config.botLogoBackupUrl === undefined
        ? './static/img/Logo_Kai.png'
        : window.config.botLogoBackupUrl, // Path to bot's chat avatar animation image if botLogoUrl failed to load
    botWidgetIconUrl: window.config.botWidgetIconUrl === undefined
      ? './static/img/chat-icon.png'
      : window.config.botWidgetIconUrl, //  // Path to widget launcher's icon image
    botWidgetIconBackupUrl: window.config.botWidgetIconBackupUrl === undefined
      ? './static/img/chat-icon.png'
      : window.config.botWidgetIconBackupUrl, // Path to widget launcher's backup image if botWidgetIconUrl failed to load
    botLogoInlineUrl: window.config.botLogoInlineUrl === undefined ? 'Logo_Kai.png'
      : window.config.botLogoInlineUrl, // default file name used for bot's chat avatar animation icon when userInlineImages is enabled.
    botWidgetIconInlineUrl: window.config.botWidgetIconInlineUrl === undefined ? 'chat-icon.png'
      : window.config.botWidgetIconInlineUrl, // default file name used for widget launcher's icon when userInlineImages is enabled.
    useWidgetMode: window.config.useWidgetMode === undefined
      ? true
      : window.config.useWidgetMode, // Flag to use Webview embedded as widget window
    useHeaderBar: window.config.useHeaderBar === undefined
      ? true
      : window.config.useHeaderBar, // Flag to use Header bar on top of webview
    headerBarConfig:
      window.config.headerBarConfig === undefined
        ? { minimizeButtonAlignRight: false, overrideMinimizeButtonClick: false }
        : window.config.headerBarConfig,
    defaultMapLocation:
      window.config.defaultMapLocation === undefined
        ? {
          coords: {
            latitude: 40.7433, // Latitude of center point when location picker map loads
            longitude: -73.9913 // Longitude of center point when location picker map loads
          },
          zoom: 16 // Zoom level of center point when location picker loads. Lower number = zoomed further out
        }
        : window.config.defaultMapLocation,
    locationAPIKey: window.config.locationAPIKey === undefined ? '' : window.config.locationAPIKey,
    startSession:
      window.config.startSession === undefined
        ? false
        : window.config.startSession, // Start session on page load vs first message sent
    startPullService:
      window.config.startPullService === undefined
        ? false
        : window.config.startPullService, // Start session on page load vs first message sent
    introScreen:
      window.config.introScreen === undefined
        ? false
        : window.config.introScreen, // Display "intro screen" which has the "Typically responds in minutes" view at top of chat
    showOnLoadTypingIcon:
      window.config.showOnLoadTypingIcon === undefined
        ? false
        : window.config.showOnLoadTypingIcon, // Display ... when webview loads
    screenReader:
      window.config.screenReader === undefined
        ? false
        : window.config.screenReader, // Include screen reader content in responses
    useNativeGPS:
      window.config.useNativeGPS === undefined
        ? false
        : window.config.useNativeGPS, // true = use iOS + Android for coordinates. false == use web browser to get coordinates
    capiRequestTimeoutSeconds:
      window.config.capiRequestTimeoutSeconds === undefined
        ? 60
        : window.config.capiRequestTimeoutSeconds, // Seconds before CAPI request times out
    inlineButtonModeForList:
      window.config.inlineButtonModeForList === undefined
        ? false
        : window.config.inlineButtonModeForList, // set to true to display List component buttons inline instead of stack.
    inlineButtonStartingOnFirstLine:
      window.config.inlineButtonStartingOnFirstLine === undefined
        ? false
        : window.config.inlineButtonStartingOnFirstLine, // set to true to start displaying the List inline buttons on the same line as subtitle.
    groupedListMode:
      window.config.groupedListMode === undefined
        ? false
        : window.config.groupedListMode, // set to true to group together the list items in a same bubble.
    cardSizeMode:
      window.config.cardSizeMode === undefined
        ? 'adaptive'
        : window.config.cardSizeMode, // Determines card sizing, either: "adaptive" or "fixed"
    carouselHorizontalScrollingAccelerationFactor:
      window.config.carouselHorizontalScrollingAccelerationFactor === undefined
        ? 5
        : window.config.carouselHorizontalScrollingAccelerationFactor, // Factor used to increase or decrease the carousel swipe gesture speed, (i.e. 1 = normal speed, 2 = twice faster, 0.5 = twice slower)
    maximumButtonsPerCard:
      window.config.maximumButtonsPerCard === undefined
        ? 3
        : window.config.maximumButtonsPerCard, // Used to limit the number of buttons that will be rendered for each carousel item when using the 'fixed' carousel card mode
    textMessageFontSize:
      window.config.textMessageFontSize === undefined
        ? 14
        : window.config.textMessageFontSize, // Font size (in px) for user request and bot response text in bubble
    timeStampFormat:
      window.config.timeStampFormat === undefined
        ? 'MMMM DD | hh:mm A'
        : window.config.timeStampFormat, // Datetime format for center timestamp using Moment.js formatting https://momentjs.com/docs/#/displaying/
    dateInputFormat:
      window.config.dateInputFormat === undefined
        ? 'YYYY-MM-DD'
        : window.config.dateInputFormat, // date input format used to send DATE to CAPI
    locationInputFormat:
      window.config.locationInputFormat === undefined
        ? 'At latitude {latitude}, longitude {longitude}'
        : window.config.locationInputFormat, // Format for location to be sent back to kai servers
    deepLinkHandleBehaviour:
      window.config.deepLinkHandleBehaviour === undefined
        ? false
        : window.config.deepLinkHandleBehaviour, // set desire button type property to true to handle click event as deeplink and prevent webview default behavior
    // if deepLinkHandleBehaviour is set to true all the button types click event will be passed as deeplink
    // if deepLinkHandleBehaviour is set to false all button types click event are triggering the webview default behavior
    maxInvalidSessionIdCounter:
      window.config.maxInvalidSessionIdCounter === undefined
        ? 5
        : window.config.maxInvalidSessionIdCounter, // number of invalid session ID error before displaying the TooManyInvalidSessions error
    maxInvalidSessionIdCounterAfterStartSessionEvent:
      window.config.maxInvalidSessionIdCounterAfterStartSessionEvent ===
      undefined
        ? 1
        : window.config.maxInvalidSessionIdCounterAfterStartSessionEvent, // number of invalid session ID error before displaying the TooManyInvalidSessionsAfterStartSessionEvent error
    overrideInvalidSessionIdHandling:
      window.config.overrideInvalidSessionIdHandling === undefined
        ? false
        : window.config.overrideInvalidSessionIdHandling, // a function can be assigned here to override the default webview behavior when dealing with invalid Session ID
    sessionCookieEnabled:
      window.config.sessionCookieEnabled === undefined
        ? false
        : window.config.sessionCookieEnabled, // set to true to store current the session ID in a cookie and retrieve it when the webview is re-loaded
    cookieExpirationTimeInSec:
      window.config.cookieExpirationTimeInSec === undefined
        ? 900
        : window.config.cookieExpirationTimeInSec, // second before the session ID cookie expires, default is 900 seconds (15 min)
    cookieAutoRefresh:
      window.config.cookieAutoRefresh === undefined
        ? false
        : window.config.cookieAutoRefresh, // specify if cookie should be refreshed automatically or not, when set to false cookie is refreshed only when receiving Kai server response.
    rating:
      window.config.rating === undefined
        ? { type: 'circle' }
        : window.config.rating,
    requestHeaders:
      window.config.requestHeaders === undefined
        ? {}
        : window.config.requestHeaders,
    searchEngineSilverCloudID: window.config.searchEngineSilverCloudID === undefined ? false : window.config.searchEngineSilverCloudID, // specify the SilverCloud Search Engine ID
    searchEngineSilverCloudAPIKey: window.config.searchEngineSilverCloudAPIKey === undefined ? false : window.config.searchEngineSilverCloudAPIKey, // specify the SilverCloud Search Engine API Key
    searchEngineGoogleID: window.config.searchEngineGoogleID === undefined ? false : window.config.searchEngineGoogleID, // specify the Google Search Engine ID
    searchEngineGoogleAPIKey: window.config.searchEngineGoogleAPIKey === undefined ? false : window.config.searchEngineGoogleAPIKey, // specify the Google Search Engine API Key
    searchEngineNumberOfResult: window.config.searchEngineNumberOfResult === undefined ? 5 : window.config.searchEngineNumberOfResult, // Number of search results to return (Valid values are integers between 1 and 10, inclusive.)
    useAvatar: window.config.useAvatar === undefined ? false : window.config.useAvatar, // Number of search results to return (Valid values are integers between 1 and 10, inclusive.)
    showShortCutMenu:
      window.config.showShortCutMenu === undefined
        ? false
        : window.config.showShortCutMenu, //
    useSplashScreen: window.config.useSplashScreen === undefined ? false : window.config.useSplashScreen,
    splashScreenSettings: {
      skipAfterFirstTimeLaunch: (window.config.splashScreenSettings === undefined || window.config.splashScreenSettings.skipAfterFirstTimeLaunch === undefined)
        ? true
        : window.config.splashScreenSettings.skipAfterFirstTimeLaunch,
      skipForNDays: (window.config.splashScreenSettings === undefined || window.config.splashScreenSettings.skipForNDays === undefined)
        ? 30
        : window.config.splashScreenSettings.skipForNDays // optional number of days the splash screen animation will be skipped when the option skipAfterFirstTimeLaunch is true. Set to 0 or false to disable this option.
    },
    shortcutIcon: window.config.shortcutIcon === undefined ? 'hamburger_animate' : window.config.shortcutIcon,
    loadThemeFromBackend: window.config.loadThemeFromBackend === undefined ? false : window.config.loadThemeFromBackend,
    loadThemeAndAssistantPropertyFromQueryString: window.config.loadThemeAndAssistantPropertyFromQueryString === undefined ? false : window.config.loadThemeAndAssistantPropertyFromQueryString,
    inactivityTimeInSec: window.config.inactivityTimeInSec === undefined ? 0 : window.config.inactivityTimeInSec, // inactivity time in second before triggering Kai interruption intent, deactivated if set to 0
    useAutocomplete: (window.config.useAutocomplete === undefined)
      ? true
      : window.config.useAutocomplete,
    autocompleteSettings: {
      url: (window.ENV && window.ENV.SERVER_CONFIG) ? `${window.ENV.SERVER_CONFIG.SERVER_URL}/event` : undefined,
      useLocalCache: (window.config.autocompleteSettings === undefined || window.config.autocompleteSettings.useLocalCache === undefined)
        ? false
        : window.config.autocompleteSettings.useLocalCache,
      suggestionCount: (window.config.autocompleteSettings === undefined || window.config.autocompleteSettings.suggestionCount === undefined)
        ? 4
        : window.config.autocompleteSettings.suggestionCount,
      prefetchedData: (window.config.autocompleteSettings === undefined || window.config.autocompleteSettings.prefetchedData === undefined)
        ? undefined
        : window.config.autocompleteSettings.prefetchedData,
      characterCountBeforeStart: (window.config.autocompleteSettings === undefined || window.config.autocompleteSettings.characterCountBeforeStart === undefined)
        ? 1
        : window.config.autocompleteSettings.characterCountBeforeStart,
      highlightTyped: (window.config.autocompleteSettings === undefined || window.config.autocompleteSettings.characterCountBeforeStart === undefined)
        ? 1
        : window.config.autocompleteSettings.highlightTyped,
      serverLimitDelay: (window.config.autocompleteSettings === undefined || window.config.autocompleteSettings.serverLimitDelay === undefined)
        ? 200
        : window.config.autocompleteSettings.serverLimitDelay,
      serverLimitType: (window.config.autocompleteSettings === undefined || window.config.autocompleteSettings.serverLimitType === undefined)
        ? 'debounce'
        : window.config.autocompleteSettings.serverLimitType
    },
    autocompleteServiceSettings: {
      maxResults: (window.config.autocompleteServiceSettings === undefined || window.config.autocompleteServiceSettings.maxResults === undefined)
        ? 10
        : window.config.autocompleteServiceSettings.maxResults,
      noResultsIfExceedsMaxResults: (window.config.autocompleteServiceSettings === undefined || window.config.autocompleteServiceSettings.noResultsIfExceedsMaxResults === undefined)
        ? false
        : window.config.autocompleteServiceSettings.noResultsIfExceedsMaxResults,
      maxSlotExpansions: (window.config.autocompleteServiceSettings === undefined || window.config.autocompleteServiceSettings.maxSlotExpansions === undefined)
        ? 5
        : window.config.autocompleteServiceSettings.maxSlotExpansions,
      includeIntentInResults: (window.config.autocompleteServiceSettings === undefined || window.config.autocompleteServiceSettings.includeIntentInResults === undefined)
        ? false
        : window.config.autocompleteServiceSettings.includeIntentInResults,
      alternateIntents: (window.config.autocompleteServiceSettings === undefined || window.config.autocompleteServiceSettings.alternateIntents === undefined)
        ? true
        : window.config.autocompleteServiceSettings.alternateIntents,
      intentPriorities: (window.config.autocompleteServiceSettings === undefined || window.config.autocompleteServiceSettings.intentPriorities === undefined)
        ? null
        : window.config.autocompleteServiceSettings.intentPriorities
    },
    useSpeechRecognition: window.config.useSpeechRecognition === undefined
      ? false
      : window.config.useSpeechRecognition,
    speechRecognitionSettings: {
      enableAutomaticPunctuation: (window.config.useSpeechRecognition === undefined || window.config.useSpeechRecognition.enableAutomaticPunctuation === undefined)
        ? true
        : window.config.useSpeechRecognition.enableAutomaticPunctuation,
      enableWordConfidence: (window.config.useSpeechRecognition === undefined || window.config.useSpeechRecognition.enableWordConfidence === undefined)
        ? true
        : window.config.useSpeechRecognition.enableWordConfidence
    },
    chartToolTipMatchSliceColors: window.config.chartToolTipMatchSliceColors === undefined ? false : window.config.chartToolTipMatchSliceColors
  },
  getters,
  mutations,
  actions
})

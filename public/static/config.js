// All editable configs with default value for reference
var config = {
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  api_version: "4.1",// The targeted API version for CAPI request
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Exposed in window.config.js
  el: "webview", // element id to construct webview inside
  useInlineImages: true, // set to true use inline images from /src/assets/ folder, set to false to use static images path specified in baseImagePath
  baseImagePath: "./static/img/", // Path to thumbs-up.png, thumbs-down.png, default-fail-image.png, controls.png, bx_loader.gif
  botLogoUrl: "./static/img/Logo_Kai.png", // Path to bot's chat avatar image
  botLogoBackupUrl: "./static/img/Logo_Kai.png", // Path to bot's chat avatar animation image if botLogoUrl failed to load
  botWidgetIconUrl: "./static/img/chat-icon.png", // Path to widget launcher's icon image
  botWidgetIconBackupUrl: "./static/img/chat-icon.png", // Path to widget launcher's backup image if botWidgetIconUrl failed to load
  useWidgetMode: true, // Flag to use Webview embedded as widget window
  useHeaderBar: false, // Flag to use Header bar on top of webview
  headerBarConfig:{
    minimizeButtonAlignRight: false, // set to true to align the Minimize button on the header's right side.
    overrideMinimizeButtonClick: false // a function can be assigned here to override the default behavior when clicking on the Minimize button.
  },
  useSplashScreen: true,
  splashScreenSettings: {
    skipAfterFirstTimeLaunch: true,
    skipForNDays: 30, // optional number of days the splash screen animation will be skipped when the option skipAfterFirstTimeLaunch is true. Set to 0 or false and the splashscreen will be disabled for the browser session.
  },
  useAvatar:true,
  showShortCutMenu: true,
  defaultMapLocation: {
    coords: {
      latitude: 40.7433, // Latitude of center point when location picker map loads
      longitude: -73.9913 // Longitude of center point when location picker map loads
    },
    zoom: 16 // Zoom level of center point when location picker loads. Lower number = zoomed further out
  },
  locationAPIKey: "AIzaSyAcr4aKOJq8-zWAMEPWLZL-l9EgOk97OrM",
  startSession: true, // Start session on page load vs first message sent
  introScreen: false, // Display "intro screen" which has the "Typically responds in minutes" view at top of chat
  showOnLoadTypingIcon: false, // Display ... when webview loads
  screenReader: true, // Include screen reader content in responses
  useNativeGPS: false, // true = use iOS + Android for coordinates. false == use web browser to get coordinates
  capiRequestTimeoutSeconds: 60, // Seconds before CAPI request times out
  inlineButtonModeForList: true, // set to true to display List component buttons inline instead of stack.
  inlineButtonStartingOnFirstLine: true, // set to true to start displaying the List inline buttons on the same line as subtitle.
  groupedListMode: false, // set to true to group together the list items in a same bubble.
  cardSizeMode: "adaptive", // Determines card sizing, either: "adaptive" or "fixed"
  carouselHorizontalScrollingAccelerationFactor: 5, // Factor used to increase or decrease the carousel swipe gesture speed, (i.e. 1 = normal speed, 2 = twice faster, 0.5 = twice slower)
  textMessageFontSize: 14, // Font size (in px) for user request and bot response text in bubble
  timeStampFormat: "MMMM DD | hh:mm A", // Datetime format for center timestamp using Moment.js formatting https://momentjs.com/docs/#/displaying/
  dateInputFormat: "YYYY-MM-DD", // date input format used to send DATE to CAPI
  locationInputFormat: "At latitude {latitude}, longitude {longitude}", // Format for location to be sent back to kai servers
  deepLinkHandleBehaviour: {
    // set desire button type property to true to handle click event as deeplink and prevent webview default behavior
    LOCATION: false, // if deepLinkHandleBehaviour is set to true all the buton types click event will be passed as deeplink
    POSTBACK: false, // if deepLinkHandleBehaviour is set to false all buton types click event are triggering the webview default behavior
    DATE: false,
    TEXT: false,
    HYPERLINK: false,
    LOGIN: false,
    CALL: false,
    DEEPLINK: false
  },
  maxInvalidSessionIdCounter: 5,
  maxInvalidSessionIdCounterAfterStartSessionEvent: 1,
  overrideInvalidSessionIdHandling: false, // a function can be assigned here to override the default webview behavior when dealing with invalid Session ID
  sessionCookieEnabled: false, // set to true to store current the session ID in a cookie and retrieve it when the webview is re-loaded
  cookieExpirationTimeInSec: 900, // second before the session ID cookie expires, default is 900 seconds (15 min)
  cookieAutoRefresh: true, // specify if cookie should be refreshed automatically or not, when set to false cookie is refreshed only when receiving Kai server response.
  rating: {
    type: 'circle'
  },
  requestHeaders: {}, // Add additional request headers
  searchEngineSilverCloudID: '60cb3bb324c067037b55c250',
  searchEngineSilverCloudAPIKey: 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2MGNiM2M1MjI0YTM2YTQ5MmNlNDNmMDMiLCJpYXQiOjE2MjQ1NDQ1MTQsImF1ZCI6WyJsaXRoby5zaWx2ZXJjbG91ZGluYy5jb20iLG51bGwsImxvY2FsaG9zdCIsImxvY2FsaG9zdCJdfQ.aT3v02bHETFsEJ0ucwKZ_kajAKVNdPPxBcPRCpnirbQ',
  searchEngineGoogleID: '006201814203881506293:dmdu1ogeshs',
  searchEngineGoogleAPIKey: 'AIzaSyAQB-PvjoB4uIB342_5UzaldXi291bVoHw',
  searchEngineNumberOfResult: 3,
  loadThemeFromBackend: false,
  loadThemeAndAssistantPropertyFromQueryString: false,
  useAutocomplete: false,
  autocompleteSettings: {
    useLocalCache: false,
    characterCountBeforeStart: 1,
    highlightTyped: true,
    suggestionCount: 'Infinity',
    serverLimitType: 'debounce', // 'debounce' or 'throttle'
    serverLimitDelay: 200 // in milliseconds
  },
  autocompleteServiceSettings: {
    maxResults: 4,
    noResultsIfExceedsMaxResults: false,
    maxSlotExpansions: 5,
    includeIntentInResults: false,
    alternateIntents: true,
    intentPriorities: null
  },
  useSpeechRecognition: true,
  chartToolTipMatchSliceColors: true // set to true to use the same color for the tooltip background as for the Pie Chart slices. set to false the global variable @chart-tooltip-color is used for all the tooltips.
};

if (typeof module !== "undefined") {
  module.exports = config;
}

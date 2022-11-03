/****************************************************/

/* Store Getters  */

/****************************************************/

const getKaiSessionId = state => {
  return state.kaiSessionId
}

const getKaiApiVersion = state => {
  return state.kaiApiVersion
}
const getKaiAppVersion = state => {
  return state.kaiAppVersion
}
const getKaiDataVersion = state => {
  return state.kaiDataVersion
}
const getKaiModelVersion = state => {
  return state.kaiModelVersion
}

const getDebugMode = state => {
  return state.debug
}

const getInputMessage = state => {
  return state.inputMessage
}

const getSendMessage = state => {
  return state.sendMessage
}

const getSendSelection = state => {
  return state.sendSelection
}

const getResponseData = state => {
  return state.responseData
}

const getRenderingStatus = state => {
  return state.renderingStatus
}

const getTypingIndicator = state => {
  return state.typingIndicator
}

const getLastMessageReceievedEpoc = state => {
  return state.lastMessageReceievedEpoc
}

const getCarouselCounter = state => {
  return state.carouselCounter
}

const isLiveChatStarted = state => {
  return state.liveChatStarted
}

const isLiveAgentConnected = state => {
  return state.liveAgentConnected
}

const isPullServiceErrorOngoing = state => {
  return state.pullServiceErrorOngoing
}

const isUserTyping = state => {
  return state.userTyping
}

const getMaximumButtonsPerCard = state => {
  return state.maximumButtonsPerCard
}

const getCarouselHorizontalScrollingAccelerationFactor = state => {
  return state.carouselHorizontalScrollingAccelerationFactor
}

const isInlineButtonModeForList = state => {
  return state.inlineButtonModeForList
}

const isInlineButtonStartingOnFirstLine = state => {
  return state.inlineButtonStartingOnFirstLine
}

const getGroupedListMode = state => {
  return state.groupedListMode
}

const getDeepLinkHandleBehaviour = state => {
  return state.deepLinkHandleBehaviour
}

const getMaxInvalidSessionIdCounter = state => {
  return state.maxInvalidSessionIdCounter
}

const getMaxInvalidSessionIdCounterAfterStartSessionEvent = state => {
  return state.maxInvalidSessionIdCounterAfterStartSessionEvent
}

const isSessionCookieEnabled = state => {
  return state.sessionCookieEnabled
}
const getCookieExpirationTimeInSec = state => {
  return state.cookieExpirationTimeInSec
}
const getCookieAutoRefresh = state => {
  return state.cookieAutoRefresh
}
const getDateInputFormat = state => {
  return state.dateInputFormat
}
const isInlineImagesEnabled = state => {
  return state.useInlineImages
}
const isInlineAvatarEnabled = state => {
  return state.useInlineAvatar
}
const getBotLogoInlineUrl = state => {
  return state.botLogoInlineUrl
}
const getBotWidgetIconInlineUrl = state => {
  return state.botWidgetIconInlineUrl
}

/****************************************************/

/* NOTES = Need to add mutation and actions for getters below  */

/****************************************************/

const getBaseImagePath = state => {
  return state.baseImagePath
}
const getBaseAvatarPath = state => {
  return state.baseAvatarPath
}
const getCardSizeMode = state => {
  return state.cardSizeMode
}
const getTextMessageFontSize = state => {
  return state.textMessageFontSize
}
const getTimeStampFormat = state => {
  return state.timeStampFormat
}
const getLocationInputFormat = state => {
  return state.locationInputFormat
}
const getIntroScreen = state => {
  return state.introScreen
}
const getCapiRequestTimeoutSeconds = state => {
  return state.capiRequestTimeoutSeconds
}
const getScreenReader = state => {
  return state.screenReader
}
const getStartSession = state => {
  return state.startSession
}
const getStartPullService = state => {
  return state.startPullService
}
const getShowOnLoadTypingIcon = state => {
  return state.showOnLoadTypingIcon
}
const getUseNativeGPS = state => {
  return state.useNativeGPS
}
const getBotLanguages = state => {
  return state.botLanguages
}
const getDefaultMapLocation = state => {
  return state.defaultMapLocation
}
const getBotLogoUrl = state => {
  return state.botLogoUrl
}
const getBotLogoBackupUrl = state => {
  return state.botLogoBackupUrl
}
const getBotWidgetIconUrl = state => {
  return state.botWidgetIconUrl
}
const getBotWidgetIconBackupUrl = state => {
  return state.botWidgetIconBackupUrl
}
const getPullServiceErrorSleepTimer = state => {
  return state.pullServiceErrorSleepTimer
}
const isPullServiceStarted = state => {
  return state.pullServiceStarted
}
const getPullServiceState = state => {
  return state.pullServiceState
}
const getLastEvent = state => {
  return state.lastEvent
}
const getRequestHeaders = state => {
  return state.requestHeaders
}
const getAvatar = state => {
  return state.avatar
}
const isSplashScreenEnabled = state => {
  return state.useSplashScreen
}
const getShortcutPayload = state => {
  return state.shortcutPayload
}
const getShortcutIcon = state => {
  return state.shortcutIcon
}
const getAutocompleteServiceSettings = state => {
  return {
    max_results: state.autocompleteServiceSettings.maxResults,
    no_results_if_exceeds_max_results: state.autocompleteServiceSettings.noResultsIfExceedsMaxResults,
    max_slot_expansions: state.autocompleteServiceSettings.maxSlotExpansions,
    include_intent_in_results: state.autocompleteServiceSettings.includeIntentInResults,
    alternate_intents: state.autocompleteServiceSettings.alternateIntents,
    intent_priorities: state.autocompleteServiceSettings.intentPriorities
  }
}
/****************************************************/

/* Export Getters  */

/****************************************************/

export default {
  getKaiSessionId,
  getKaiApiVersion,
  getKaiAppVersion,
  getKaiDataVersion,
  getKaiModelVersion,
  getDebugMode,
  getResponseData,
  getRenderingStatus,
  getLastMessageReceievedEpoc,
  getCarouselCounter,
  getInputMessage,
  getTypingIndicator,
  getBotLogoInlineUrl,
  getBotWidgetIconInlineUrl,
  isInlineImagesEnabled,
  isInlineAvatarEnabled,
  getBaseImagePath,
  getBaseAvatarPath,
  getCardSizeMode,
  getTextMessageFontSize,
  getTimeStampFormat,
  getLocationInputFormat,
  getIntroScreen,
  getCapiRequestTimeoutSeconds,
  getScreenReader,
  getStartSession,
  getStartPullService,
  getShowOnLoadTypingIcon,
  getUseNativeGPS,
  getBotLanguages,
  getDefaultMapLocation,
  getBotLogoUrl,
  getBotLogoBackupUrl,
  getBotWidgetIconUrl,
  getBotWidgetIconBackupUrl,
  getPullServiceErrorSleepTimer,
  isPullServiceStarted,
  isPullServiceErrorOngoing,
  getPullServiceState,
  isLiveChatStarted,
  isLiveAgentConnected,
  getLastEvent,
  isUserTyping,
  getMaximumButtonsPerCard,
  getCarouselHorizontalScrollingAccelerationFactor,
  isInlineButtonModeForList,
  isInlineButtonStartingOnFirstLine,
  getGroupedListMode,
  getDeepLinkHandleBehaviour,
  getMaxInvalidSessionIdCounter,
  getMaxInvalidSessionIdCounterAfterStartSessionEvent,
  isSessionCookieEnabled,
  getCookieExpirationTimeInSec,
  getCookieAutoRefresh,
  getSendMessage,
  getSendSelection,
  getDateInputFormat,
  getRequestHeaders,
  getAvatar,
  isSplashScreenEnabled,
  getShortcutPayload,
  getShortcutIcon,
  getAutocompleteServiceSettings
}

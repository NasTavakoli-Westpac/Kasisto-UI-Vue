
/****************************************************/

/* Store Actions  */

/****************************************************/
const actionKaiSessionId = ({ commit }, payload) => {
  commit('mutateKaiSessionId', payload)
}

const actionDebugMode = ({ commit }, payload) => {
  commit('mutateDebugMode', payload)
}

const actionInputMessage = ({ commit }, payload) => {
  commit('mutateInputMessage', payload)
}

const actionSendMessage = ({ commit }, payload) => {
  commit('mutateSendMessage', payload)
}

const actionSendSelection = ({ commit }, payload) => {
  commit('mutateSendSelection', payload)
}

const actionResponseData = ({ commit }, payload) => {
  commit('mutateResponseData', payload)
}

const actionRenderingStatus = ({ commit }, payload) => {
  commit('mutateRenderingStatus', payload)
}

const actionTypingIndicator = ({ commit }, payload) => {
  commit('mutateTypingIndicator', payload)
}

const actionLastMessageReceievedEpoc = ({ commit }, payload) => {
  commit('mutateLastMessageReceievedEpoc', payload)
}

const actionCarouselCounter = ({ commit }, payload) => {
  commit('mutateCarouselCounter', payload)
}

const actionPullServiceStart = ({ commit }) => {
  commit('mutatePullServiceStatus', true)
}

const actionPullServiceStop = ({ commit }) => {
  commit('mutatePullServiceStatus', false)
}

const actionLastEvent = ({ commit }, payload) => {
  commit('mutateLastEvent', payload)
}

const actionRequestHeaders = ({ commit }, payload) => {
  commit('mutateRequestHeaders', payload)
}

const actionUserTyping = ({ commit }, payload) => {
  commit('mutateUserTyping', payload)
}

const actionAvatarUpdate = ({ commit }, payload) => {
  commit('mutateAvatar', payload)
}

const actionShortcutPayload = ({ commit }, payload) => {
  commit('mutateShortcutPayload', payload)
}

const actionShortcutIcon = ({ commit }, icon) => {
  commit('mutateShortcutIcon', icon)
}
/****************************************************/

/* Export Actions  */

/****************************************************/

export default {
  actionKaiSessionId,
  actionDebugMode,
  actionInputMessage,
  actionSendMessage,
  actionSendSelection,
  actionResponseData,
  actionRenderingStatus,
  actionTypingIndicator,
  actionLastMessageReceievedEpoc,
  actionCarouselCounter,
  actionPullServiceStart,
  actionPullServiceStop,
  actionLastEvent,
  actionRequestHeaders,
  actionUserTyping,
  actionAvatarUpdate,
  actionShortcutPayload,
  actionShortcutIcon
}

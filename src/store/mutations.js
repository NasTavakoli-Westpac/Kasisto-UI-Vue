/****************************************************/

/* Store Mutations  */

/****************************************************/

const mutateKaiSessionId = (state, payload) => {
  state.kaiSessionId = payload
  // console.log('update user session_id in store with:', state.kaiSessionId)
}

const mutateDebugMode = (state, payload) => {
  state.debug = payload
}

const mutateInputMessage = (state, payload) => {
  state.inputMessage = payload
}

const mutateLastMessageReceievedEpoc = (state, payload) => {
  state.lastMessageReceievedEpoc = payload
}

const mutateCarouselCounter = (state, payload) => {
  state.carouselCounter++
}

const mutateSendMessage = (state, payload) => {
  if (payload === false) {
    state.sendMessage = false
  } else {
    state.sendMessage = true
  }
}

const mutateSendSelection = (state, payload) => {
  if (payload === false) {
    state.sendSelection = false
  } else {
    state.sendSelection = true
  }
}

const mutateResponseData = (state, payload) => {
  state.responseData = payload
}

const mutateRenderingStatus = (state, payload) => {
  state.renderingStatus = payload
}

const mutateTypingIndicator = (state, payload) => {
  state.typingIndicator = payload
}

const mutatePullServiceStatus = (state, payload) => {
  if (payload) {
    state.pullServiceStarted = true
  } else {
    state.pullServiceStarted = false
  }
}

const mutateLastEvent = (state, payload) => {
  state.lastEvent = payload
}

const mutateRequestHeaders = (state, payload) => {
  for (const [key, value] of Object.entries(payload)) {
    // console.log(key, value)
    state.requestHeaders[key] = value
  }
}

const mutateUserTyping = (state, payload) => {
  state.userTyping = payload
}

const mutateAvatar = (state, payload) => {
  state.avatar = payload
}

const mutateShortcutPayload = (state, payload) => {
  if (!state.shortcutPayload && payload.message_contents && payload.message_contents.length > 0) {
    state.shortcutPayload = payload
  } else {
    if (payload.message_contents && payload.message_contents.length > 0) {
      for (var i = 0; i < payload.message_contents.length; i++) {
        if (state.shortcutPayload.message_contents && state.shortcutPayload.message_contents.length > 0) {
          for (var j = 0; j < state.shortcutPayload.message_contents.length; j++) {
            if (payload !== undefined && payload.message_contents[i] !== undefined &&
              state.shortcutPayload.message_contents[j] !== undefined && payload !== undefined &&
              payload.message_contents[i].payload.title === state.shortcutPayload.message_contents[j].payload.title) {
              state.shortcutPayload.message_contents.splice(j, 1)
            }
          }
        }
        if (payload !== undefined && payload.message_contents[i] !== undefined &&
          payload.message_contents[i].payload) {
          state.shortcutPayload.message_contents.push(payload.message_contents[i])
        }
      }
    }
  }
}

const mutateShortcutIcon = (state, icon) => {
  state.shortcutIcon = icon
}

const mutateSplashScreen = (state, payload) => {
  state.useSplashScreen = payload
}

/****************************************************/

/* Export Mutations  */

/****************************************************/

export default {
  mutateKaiSessionId,
  mutateDebugMode,
  mutateInputMessage,
  mutateLastMessageReceievedEpoc,
  mutateCarouselCounter,
  mutateSendMessage,
  mutateSendSelection,
  mutateResponseData,
  mutateRenderingStatus,
  mutateTypingIndicator,
  mutatePullServiceStatus,
  mutateLastEvent,
  mutateRequestHeaders,
  mutateUserTyping,
  mutateAvatar,
  mutateShortcutPayload,
  mutateSplashScreen,
  mutateShortcutIcon
}

var langConfig = {
  localeTimeStamp: 'en',
  translations: {
    sendMessageButton: 'Send',
    inputPlaceHolderMsg: 'Type a message...',
    sendEnterTokenErrorMsg: 'We were unable to verify your account',
    header: {
      title: 'Enlighten Digital Assistant'
    },
    introScreen: {
      introTitle: 'BOT',
      introMessage: 'Typically replies instantly'
    },
    locationPicker: {
      headerTitle: 'Pick your Location',
      inputLabel: 'Location',
      sendButton: 'Select Position'
    },
    screenReader: {
      virtualAssistantDesignation: 'Enlighten Digital Assistant',
      chatArea: 'Chat Area',
      userDesignation: 'You',
      sentBy: 'Sent by',
      timeSendAt: 'At',
      card: 'Card',
      cards: 'cards',
      button: 'Button',
      carouselCards: 'Carousel Cards',
      carouselArrowLeft: 'Previous card',
      carouselArrowRight: 'Next card',
      inACarousel: 'in a Carousel',
      thereAre: 'There are',
      quickReplies: 'quick replies',
      quickReply: 'Quick Reply',
      quickReplyArrowLeft: 'Previous quick reply',
      quickReplyArrowRight: 'Next quick reply',
      alternativeQuestionBottom: 'Alternative questions at the bottom',
      alternativeQuestion: 'Alternative question',
      from: 'from',
      says: 'says',
      say: 'say',
      said: 'said',
      displayed: 'displayed',
      chipArrowLeft: 'Previous item',
      chipArrowRight: 'Next item',
      expand: 'expand',
      collapse: 'collapse',
      shortcutMenu: 'shortcut menu',
      speechRecognitionButton: 'Microphone',
      shortcutInfoButton: 'Info',
      open: 'Open',
      minimize: 'Minimize'
    },
    selectTemplate: {
      tooManyItemsMessage: 'Too many items selected',
      insufficientItemsMessage: 'Insufficient items selected',
      fallbackListSubmitButton: 'Select'
    },
    searchTemplate: {
      nextPageLabel: 'Show More',
      // firstResultMessage:"here are the 3 first results I found on <a href='www.kasisto.com'>www.kasisto.com</a>",
      firstResultMessage: "I searched for related articles and here's what I found:",
      noResultMessage: "Sorry I didn't catch that. Would you mind rephrasing?",
      firstResultMessageQuickReply: '',
      noResultMessageQuickReply: '',
      nextResultMessage: 'Here are the next 3 results:'
    },
    errorMessage: {
      error0: 'You are not connected.',
      error404: 'Page note found.',
      error201: 'Server error.',
      error500: 'Internal Server Error [500].',
      parsererror: 'Impossible to parse result.',
      timeout: 'Request timeout.',
      invalidSessionID: {
        sessionNotInitialized: 'Sorry, the session need to be initialized first.',
        TooManyInvalidSessions: 'Oops, something went wrong with your session',
        TooManyInvalidSessionsAfterStartSessionEvent: 'Oops, something went wrong during the session initialization'
      }
    },
    liveChatMessages: {
      customerQueue: 'You are now in a queue to speak with a live agent.',
      agentConnected: 'You are now being connected to a live agent.',
      sessionStopped: 'Your conversation with the live agent has ended.'
    },
    speechToText: {
      languageCode: 'en-US',
      microphoneUnavailableMsg: 'Sorry, the microphone is unavailable.',
      microphoneAccessDeniedMsg: '<bold>Microphone access required.</bold> <br> In order to use the Voice recognition, you must allow this webpage access to your microphone.',
      inputPlaceHolderHint: 'Tap and hold to record voice'
    },
    nBest: {
      questionSelectButtonText: 'View',
      relatedQuestionsTitle: 'Related Questions'
    }
  }
}

if (typeof module !== 'undefined') {
  module.exports = langConfig
}

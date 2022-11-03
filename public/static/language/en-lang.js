var langConfig = {
  localeTimeStamp: 'en',
  translations: {
    sendMessageButton: 'Send',
    inputPlaceHolderMsg: 'Type a message...',
    sendEnterTokenErrorMsg: 'We were unable to verify your account',
    header: {
      title: 'Kai Bot'
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
      virtualAssistantDesignation: "Kai",
      userDesignation: "User",
      sentBy: "Sent by",
      timeSendAt: "At",
      card: "Card",
      button: "Button",
      carouselCards: "Carousel Cards",
      thereAre: "There are",
      quickReplies: "quick replies",
      quickReply: "Quick Reply",
      alternativeQuestionBottom: "Alternative questions at the bottom",
      alternativeQuestion: "Alternative question",
      from: "from"
    },
    selectTemplate: {
      tooManyItemstMessage: "Too many items selected",
      insufficientItemsMessage: "Insufficient items selected",
      fallbackListSubmitButton:"Select"
    },
    searchTemplate:{
      nextPageLabel: "Show More",
      // firstResultMessage:"here are the 3 first results I found on <a href='www.kasisto.com'>www.kasisto.com</a>",
      firstResultMessage:"",
      nextResultMessage:"Here are the next 3 results:"
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
    }
  }
}

if (typeof module !== 'undefined') {
  module.exports = langConfig
}

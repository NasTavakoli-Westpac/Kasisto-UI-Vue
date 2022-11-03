import Kai from '../kai'
import $ from 'jquery'
import { store } from '../store/index'
import kaiConversational from './kai.create.context'
import TextBubble from '../core/components/TextBubble'

var requestJson = {}
var ENV = window.ENV
var pullServiceRequest

const CoreAPI = (function () {
  /****************************************************/

  /* Get Context  */

  /****************************************************/

  var getContext = function () {
    try {
      var context = kaiConversational.context.createContext().context
      return context
    } catch (e) {
      console.error(e)
    }
  }

  /****************************************************/

  /* Update Context  */

  /****************************************************/

  var updateContext = function (contextUpdates) {
    // console.log('[LOG] updateContext', contextUpdates)
    kaiConversational.context.updateContext(contextUpdates)
  }

  /****************************************************/

  /* Remove extra context  */

  /****************************************************/

  var removeExtraContext = function () {
    // console.log('[LOG] removeExtraContext')
    kaiConversational.context.removeExtraContext()
  }

  /****************************************************/

  /* Create Ajax Manager  */

  /****************************************************/
  var ajaxManager = (function () {
    var requests = []

    return {
      addReq: function (opt) {
        requests.push(opt)
      },
      removeReq: function (opt) {
        if ($jq.inArray(opt, requests) > -1) { requests.splice($jq.inArray(opt, requests), 1) }
      },
      run: function () {
        var self = this
        var oriSuc

        if (requests.length) {
          oriSuc = requests[0].complete

          requests[0].complete = function (data) {
            if (typeof (oriSuc) === 'function') oriSuc(data)
            requests.shift()
            self.run([])
          }
          // make sure that request stored in the queue without a session_id at the time get updated if session_id has been received
          if (JSON.parse(requests[0].data).context.user.session_id.length === 0 && $store.getters.getKaiSessionId.length) {
            var updatedData = JSON.parse(requests[0].data)
            updatedData.context.user.session_id = $store.getters.getKaiSessionId
            requests[0].data = JSON.stringify(updatedData)
          }
          // stop using jquery ajax method and rely on standard javascript XMLHttpRequest instead
          // $jq.ajax(requests[0]);

          var xhr = new XMLHttpRequest()
          xhr.open(requests[0].type, requests[0].url)
          xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
          xhr = addRequestHeadersToXHRRequest(xhr)
          xhr.timeout = requests[0].timeout
          xhr.onload = function () {
            if (xhr.status === 200) {
              requests[0].success(JSON.parse(xhr.response))
            } else if (xhr.status !== 200) {
              requests[0].error(xhr)
            }
          }
          xhr.ontimeout = function (data) {
            requests[0].error({ exception: data.type })
          }
          xhr.onerror = function (data) {
            requests[0].error({ status: 0 })
          }
          xhr.onloadend = requests[0].complete
          xhr.send(requests[0].data)
        } else {
          self.tid = setTimeout(function () {
            self.run([])
          }, 1000)
        }
      },
      stop: function () {
        requests = []
        clearTimeout(this.tid)
      }
    }
  }())
  ajaxManager.run()

  /****************************************************/

  /* Request Headers */

  /****************************************************/
  var getAdditionalRequestHeaders = function () {
    return store.getters.getRequestHeaders
  }
  var setAdditionalRequestHeaders = function (headers) {
    store.dispatch('actionRequestHeaders', headers)
  }
  var addRequestHeadersToXHRRequest = function (xhr) {
    const requestHeaders = store.getters.getRequestHeaders
    if (typeof requestHeaders !== 'undefined' && requestHeaders) {
      Object.keys(requestHeaders).forEach(function (key) {
        xhr.setRequestHeader(key, requestHeaders[key])
      })
    }
    return xhr
  }

  /****************************************************/

  /* Get SessionId  */

  /****************************************************/

  var startSession = function (callback, optionalIntent) {
    var requestJson = kaiConversational.context.createStartSessionEventRequestJson.call(this, this.options)
    // Get Request Context Object
    kaiConversational.context.buildRequestContextObject()

    if (optionalIntent && optionalIntent.name && optionalIntent.name.length > 0) {
      requestJson.payload.intent = optionalIntent
    }

    // console.log("SESSION ID REQUEST :"+JSON.stringify(requestJson));
    // Make request call to CAPI

    Kai.Core.handleCAPIRequest('sessionStarted', requestJson)

    ajaxManager.addReq({
      url: ENV.SERVER_CONFIG.SERVER_URL + '/event',
      type: 'POST',
      dataType: 'json',
      timeout: store.getters.getCapiRequestTimeoutSeconds * 1000,
      contentType: 'application/json',
      data: JSON.stringify(requestJson),
      success: function (data) {
        // console.log('[INFO] startSession response data', data)
        if (data && data.status === '440') {
          Kai.Core.handleInvalidSessionID(data, true)
        }
        checkForSessionIDAndHandleResponse(data, 'sessionStarted')
        if (callback) {
          callback(data)
        }
      },
      error: function (data) {
        console.info('[ERROR] startSession error data', data)
        checkForSessionIDAndHandleResponse(data, 'sessionStarted', true)

        if (data) {
          Kai.Core.handleCAPIError('startSession', data)
        }
      }
    })
  }

  /****************************************************/

  /* Send Request  */

  /****************************************************/

  var sendRequest = function (requestJson, metaFields) {
    var msg = 'sendRequest'

    // Confirm metaFields is object not string (android)
    if (metaFields) {
      if (typeof metaFields === 'string') {
        try {
          metaFields = JSON.parse(metaFields)
        } catch (err) { }
      }
      msg = 'sendRequestWithMetaFields'
      // console.log('[INFO] sendRequestWithMetaFields:', requestJson, metaFields)
      requestJson.context.user.meta_fields = metaFields
    }

    Kai.Core.handleCAPIRequest(msg, requestJson)

    // Make request call to CAPI
    ajaxManager.addReq({
      url: ENV.SERVER_CONFIG.SERVER_URL + '/user_message',
      type: 'POST',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify(requestJson),
      cache: false,
      timeout: store.getters.getCapiRequestTimeoutSeconds * 1000,
      success: function (data) {
        // console.log('[INFO] sendRequest response data', data)

        checkForSessionIDAndHandleResponse(data, 'requestSent')
      },
      error: function (data) {
        console.info('[ERROR] sendRequestWithMetaFields error data', data)
        handleServerError(data.status, data.exception)

        if (requestJson.context.user.meta_fields) {
          var contextUpdates = { user: { meta_fields: [] } }
          kaiConversational.context.updateContext(contextUpdates)
        }

        if (data) {
          Kai.Core.handleCAPIError(msg, data)
        }
      }
    })
  }

  /****************************************************/

  /* Send Message  */

  /****************************************************/

  var sendMessage = function (message, optionalInputType, metaFields) {
    // Get Request Context Object
    requestJson = kaiConversational.context.buildRequestContextObject()
    var msg = 'sendMessage'
    if (metaFields) {
      msg = 'sendMessageWithMetaFields'
      if (typeof metaFields === 'string') {
        try {
          metaFields = JSON.parse(metaFields)
        } catch (err) { }
      }
      requestJson.context.user.meta_fields = metaFields
    }

    if (optionalInputType === 'SELECT') {
      requestJson.type = 'SELECT'
      if (!message) {
        requestJson.payload = {}
      } else if (Array.isArray(message)) {
        requestJson.payload = {
          values: message
        }
      } else {
        requestJson.payload = {
          value: message
        }
      }
    } else if (optionalInputType === 'DATE') {
      requestJson.type = 'DATE'
      requestJson.payload = {
        date: message
      }
    } else if (optionalInputType === 'POSTBACK') {
      requestJson.type = 'POSTBACK'
      requestJson.payload = {
        state: message
      }
    } else if (optionalInputType === 'VOICE') {
      // TODO: set to type VOICE once it is fully supported by Platform.
      requestJson.type = 'TEXT'
      requestJson.payload = {
        text: message
      }
    } else {
      requestJson.type = 'TEXT'
      requestJson.payload = {
        text: message
      }
    }

    $store.state.lastUserMessage = requestJson

    Kai.Core.handleCAPIRequest(msg, requestJson)

    // Make request call to CAPI
    ajaxManager.addReq({
      url: ENV.SERVER_CONFIG.SERVER_URL + '/user_message',
      type: 'POST',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify(requestJson),
      cache: false,
      timeout: store.getters.getCapiRequestTimeoutSeconds * 1000,
      success: function (data) {
        // console.log('[INFO] sendMessage response data', data)
        checkForSessionIDAndHandleResponse(data, msg)
        handleKaiVersions(data)
      },
      error: function (data) {
        console.info('[ERROR] sendMessage error data', data)
        handleServerError(data.status, data.exception)

        checkForSessionIDAndHandleResponse(data, msg, true)
      }
    })
  }

  /****************************************************/

  /* AUTH - Send Enter Token Event */

  /****************************************************/

  var sendEnterTokenEvent = function (token, callback, optionalIntent) {
    var requestJson = kaiConversational.context.createEnterTokenEventRequestJson.call(this, this.options, token)

    if (optionalIntent && optionalIntent.name && optionalIntent.name.length > 0) {
      requestJson.payload.intent = optionalIntent
    }

    kaiConversational.context.buildRequestContextObject()

    if (typeof $ !== 'undefined') {
      Kai.Core.handleCAPIRequest('sendEnterTokenEvent', requestJson)

      ajaxManager.addReq({

        url: ENV.SERVER_CONFIG.SERVER_URL + '/event',
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(requestJson),
        cache: false,
        timeout: store.getters.getCapiRequestTimeoutSeconds * 1000,
        success: function (data) {
          // console.log('[INFO] sendEnterTokenEvent response data', data)
          checkForSessionIDAndHandleResponse(data, 'sendEnterTokenEvent')

          if (callback) {
            callback(data)
          }
        },
        error: function (data) {
          console.info('[ERROR] sendEnterTokenEvent error data', data)

          handleServerError(data.status, data.exception)

          checkForSessionIDAndHandleResponse(data, 'sendEnterTokenEvent', true)

          if (callback) {
            callback(data)
          }
        }
      })
    } else {
      var passData = {

        url: ENV.SERVER_CONFIG.SERVER_URL + '/event',
        requestJson: requestJson
      }
      if (callback) {
        callback(passData)
      }
    }
  }

  /****************************************************/

  /* AUTH - Send Auth Pass Thru Event */

  /****************************************************/

  var sendAuthPassThruEvent = function (metaFieldsArray, callback, optionalIntent) {
    var requestJson = kaiConversational.context.createAuthPassThruEventRequestJson.call(this, this.options, metaFieldsArray)
    var _this = this

    if (optionalIntent && optionalIntent.name && optionalIntent.name.length > 0) {
      requestJson.payload.intent = optionalIntent
    }

    kaiConversational.context.buildRequestContextObject()

    if (typeof $ !== 'undefined') {
      Kai.Core.handleCAPIRequest('sendAuthPassThruEvent', requestJson)

      ajaxManager.addReq({

        url: ENV.SERVER_CONFIG.SERVER_URL + '/event',
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(requestJson),
        cache: false,
        timeout: store.getters.getCapiRequestTimeoutSeconds * 1000,
        success: function (data) {
          // console.log('[INFO] sendAuthPassThruEvent response data', data)
          checkForSessionIDAndHandleResponse(data, 'sendAuthPassThruEvent')
          if (callback) {
            callback(data)
          }
        },
        error: function (data) {
          console.info('[ERROR] sendAuthPassThruEvent error data', data)

          handleServerError(data.status, data.exception)

          checkForSessionIDAndHandleResponse(data, 'sendAuthPassThruEvent', true)

          if (callback) {
            callback(data)
          }
        }
      })
    } else {
      var passData = {

        url: _this.options.serverConfig.SERVER_URL + '/event',
        requestJson: requestJson
      }
      if (callback) {
        callback(passData)
      }
    }
  }

  /****************************************************/

  /* AUTH - send Process OAuth Event */

  /****************************************************/

  var sendProcessOAuthEvent = function (token, callback, optionalIntent) {
    var requestJson = kaiConversational.context.createProcessOAuthCodeEventRequestJson.call(this, this.options, token)

    kaiConversational.context.buildRequestContextObject()

    if (optionalIntent && optionalIntent.name && optionalIntent.name.length > 0) {
      requestJson.payload.intent = optionalIntent
    }

    if (typeof $ !== 'undefined') {
      Kai.Core.handleCAPIRequest('sendProcessOAuthEvent', requestJson)

      ajaxManager.addReq({

        url: ENV.SERVER_CONFIG.SERVER_URL + '/event',
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(requestJson),
        cache: false,
        timeout: store.getters.getCapiRequestTimeoutSeconds * 1000,
        success: function (data) {
          // console.log('[INFO] sendProcessOAuthEvent response data', data)
          if (data) {
            Kai.Core.handleCAPIResponse('sendProcessOAuthEvent', data)
          }

          if (callback) {
            callback(data)
          }
        },
        error: function (data) {
          console.info('[ERROR] sendProcessOAuthEvent error data', data)

          handleServerError(data.status, data.exception)

          if (data) {
            Kai.Core.handleCAPIError('sendProcessOAuthEvent', data)
          }

          if (callback) {
            callback(data)
          }
        }
      })
    } else {
      var passData = {

        url: ENV.SERVER_CONFIG.SERVER_URL + '/event',
        requestJson: requestJson
      }
      if (callback) {
        callback(passData)
      }
    }
  }

  /****************************************************/

  /* Send Generic Event */

  /****************************************************/

  var sendGenericEvent = function (type, metaFieldsArray, callback, optionalIntent) {
    // console.log("sendGenericEvent");
    var requestJson = kaiConversational.context.createGenericEventRequestJson.call(this, this.options, type, metaFieldsArray)
    window.sendGenericRequestJson = requestJson

    if (optionalIntent && optionalIntent.name && optionalIntent.name.length > 0) {
      requestJson.payload.intent = optionalIntent
    }

    console.warn('Requesty', requestJson)

    if (typeof $ !== 'undefined') {
      Kai.Core.handleCAPIRequest('sendGenericEvent', requestJson)

      ajaxManager.addReq({

        url: ENV.SERVER_CONFIG.SERVER_URL + '/event',
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(requestJson),
        cache: false,
        timeout: store.getters.getCapiRequestTimeoutSeconds * 1000,
        success: function (data) {
          // console.log('[INFO] sendGenericEvent response data', data)

          checkForSessionIDAndHandleResponse(data, 'sendGenericEvent')

          if (callback) {
            callback(data)
          }
        },
        error: function (data) {
          console.info('[ERROR] sendGenericEvent error data', data)

          handleServerError(data.status, data.exception)

          checkForSessionIDAndHandleResponse(data, 'sendGenericEvent', true)
          if (callback) {
            callback(passData)
          }
        }
      })
    } else {
      var passData = {

        url: ENV.SERVER_CONFIG.SERVER_URL + '/event',
        requestJson: requestJson
      }
      if (callback) {
        callback(passData)
      }
    }
  }

  /****************************************************/

  /* Send Pull Request  */

  /****************************************************/

  var sendPullRequest = function () {
    // Get Request Context Object

    requestJson = kaiConversational.context.buildRequestContextObject()

    if (store.getters.getPullServiceState) {
      requestJson.state = store.getters.getPullServiceState
    }

    Kai.Core.handleCAPIRequest('sendPullRequest', requestJson)

    // if isPullServiceStarted is false, it means Kai.API.stopPullService was called, so we shouldn't send a new request
    if (store.getters.isPullServiceStarted) {
      // only send a new pull request if previous pull request is done
      if (!pullServiceRequest || (pullServiceRequest && (pullServiceRequest.readyState === 4 || pullServiceRequest.readyState === 0))) {
        pullServiceRequest = new XMLHttpRequest()
        pullServiceRequest.open('POST', ENV.SERVER_CONFIG.SERVER_URL + '/pull')
        pullServiceRequest.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
        pullServiceRequest = addRequestHeadersToXHRRequest(pullServiceRequest)
        pullServiceRequest.timeout = store.getters.getCapiRequestTimeoutSeconds * 1000
        pullServiceRequest.onload = function () {
          if (pullServiceRequest.status === 200) {
            var data = JSON.parse(pullServiceRequest.response)

            // console.log('[INFO] sendPullRequest response data', data)
            if (data && data.state) {
              store.state.pullServiceState = data.state
            }
            Kai.Core.startPullService()
            checkForSessionIDAndHandleResponse(data, 'sendPullRequest')
          } else if (pullServiceRequest.status !== 200) {
            var error = pullServiceRequest

            console.info('[ERROR] sendPullRequest error data', error)
            setTimeout(function () {
              if (store.getters.isPullServiceStarted) {
                Kai.Core.startPullService()
              }
            }, store.getters.getPullServiceErrorSleepTimer * 1000)

            // handle error only if isPullServiceStarted flag is true
            // if isPullServiceStarted is false, it means Kai.API.stopPullService was called and the pull request was aborted,
            // hence we can ignore the error
            if (store.getters.isPullServiceStarted && !store.getters.isPullServiceErrorOngoing) {
              handleServerError(error.status, error.exception)
            }

            if (pullServiceRequest.readyState === 0) {
              // Network error

              // use this flag  to display error message only on the first time a connectivity issue is happening
              store.state.pullServiceErrorOngoing = true
            }

            if (error) {
              Kai.Core.handleCAPIError('sendPullRequest', error)
            }
          }
        }
        pullServiceRequest.send(JSON.stringify(requestJson))
      }
    }
  }

  /****************************************************/

  /* Abort Pull Request  */

  /****************************************************/

  var abortPullRequest = function (state) {
    if (pullServiceRequest) {
      pullServiceRequest.abort()
    }
  }

  /****************************************************/

  /* Send the live chat customer state - i.e user is typing status */

  /****************************************************/

  var sendLiveChatCustomerStateEvent = function () {
    var requestJson = kaiConversational.context.createLiveChatSendCustomerStateRequest.call(this, this.options, store.getters.isUserTyping)

    Kai.Core.handleCAPIRequest('sendLiveChatCustomerStateEvent', requestJson)

    ajaxManager.addReq({
      url: ENV.SERVER_CONFIG.SERVER_URL + '/event',
      type: 'POST',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify(requestJson),
      cache: false,
      timeout: store.getters.getCapiRequestTimeoutSeconds * 1000,
      success: function (data) {
        // console.log('[INFO] sendLiveChatCustomerStateEvent response data', data)
      },
      error: function (data) {
        console.info('[ERROR] sendLiveChatCustomerStateEvent error data', data)
        if (data) {
          Kai.Core.handleCAPIError('sendLiveChatCustomerStateEvent', data)
        }
      }
    })
  }

  /****************************************************/

  /* Send the live chat customer state - i.e user is typing status */

  /****************************************************/

  var sendLiveChatContactBackPhoneEvent = function () {
    var requestJson = kaiConversational.context.createLiveChatContactBackPhoneRequest.call(this, this.options, store.getters.isUserTyping)

    Kai.Core.handleCAPIRequest('sendLiveChatContactBackPhoneEvent', requestJson)

    ajaxManager.addReq({
      url: ENV.SERVER_CONFIG.SERVER_URL + '/event',
      type: 'POST',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify(requestJson),
      cache: false,
      timeout: store.getters.getCapiRequestTimeoutSeconds * 1000,
      success: function (data) {
        // console.log('[INFO] sendLiveChatContactBackPhoneEvent response data', data)
      },
      error: function (data) {
        console.info('[ERROR] sendLiveChatContactBackPhoneEvent error data', data)
        if (data) {
          Kai.Core.handleCAPIError('sendLiveChatContactBackPhoneEvent', data)
        }
      }
    })
  }

  /****************************************************/

  /* Send the live chat end session request

  /****************************************************/

  var sendLiveChatEndSessionEvent = function () {
    var requestJson = kaiConversational.context.createLiveChatEndSessionRequest.call(this, this.options)

    Kai.Core.handleCAPIRequest('sendLiveChatEndSessionEvent', requestJson)

    ajaxManager.addReq({
      url: ENV.SERVER_CONFIG.SERVER_URL + '/event',
      type: 'POST',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify(requestJson),
      cache: false,
      timeout: store.getters.getCapiRequestTimeoutSeconds * 1000,
      success: function (data) {
        // console.log('[INFO] sendLiveChatEndSessionEvent response data', data)
      },
      error: function (data) {
        console.info('[ERROR] sendLiveChatEndSessionEvent error data', data)
        if (data) {
          Kai.Core.handleCAPIError('sendLiveChatEndSessionEvent', data)
        }
      }
    })
  }

  /****************************************************/

  /* Send INTENT  */

  /****************************************************/

  var sendIntent = function (intentName, optionalUserInputArray) {
    // Get Request Context Object
    requestJson = kaiConversational.context.createIntentRequestJson()

    requestJson.payload = {
      name: intentName
    }

    if (optionalUserInputArray) {
      requestJson.payload.user_inputs = optionalUserInputArray
    }

    Kai.Core.handleCAPIRequest('sendIntent', requestJson)

    // Make request call to CAPI
    ajaxManager.addReq({
      url: ENV.SERVER_CONFIG.SERVER_URL + '/user_message',
      type: 'POST',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify(requestJson),
      cache: false,
      timeout: store.getters.getCapiRequestTimeoutSeconds * 1000,
      success: function (data) {
        // console.log('[INFO] sendIntent response data', data)
        checkForSessionIDAndHandleResponse(data, 'sendIntent')
        handleKaiVersions(data)
      },
      error: function (data) {
        console.info('[ERROR] sendIntent error data', data)
        handleServerError(data.status, data.exception)

        checkForSessionIDAndHandleResponse(data, 'sendIntent', true)
      }
    })
  }

  /****************************************************/

  /* Get History */

  /****************************************************/

  var getHistory = function (callback) {
    var requestJson = kaiConversational.context.createHistoryRequestJson.call(this, this.options)

    if (typeof $ !== 'undefined') {
      Kai.Core.handleCAPIRequest('getHistory', requestJson)

      ajaxManager.addReq({

        url: ENV.SERVER_CONFIG.SERVER_URL + '/event',
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(requestJson),
        cache: false,
        timeout: store.getters.getCapiRequestTimeoutSeconds * 1000,
        success: function (data) {
          // console.log('[INFO] getHistory response data', data)

          handleSessionTranscript(data)

          if (data) {
            Kai.Core.handleCAPIResponse('getHistory', data)
          }

          if (callback) {
            callback(data)
          }
        },
        error: function (data) {
          console.info('[ERROR] getHistory error data', data)
          if (data) {
            Kai.Core.handleCAPIError('getHistory', data)
          }

          if (callback) {
            callback(data)
          }
        }
      })
    } else {
      var passData = {

        url: ENV.SERVER_CONFIG.SERVER_URL + '/event',
        requestJson: requestJson
      }
      if (callback) {
        callback(passData)
      }
    }
  }

  /****************************************************/

  /* Get Theme Variables  */

  /****************************************************/

  var getThemeVariables = function (callback) {
    var requestJson = kaiConversational.context.createThemeVariablesEventRequestJson.call(this, this.options)
    // Get Request Context Object

    Kai.Core.handleCAPIRequest('getThemeVariables', requestJson)

    ajaxManager.addReq({
      url: ENV.SERVER_CONFIG.SERVER_URL + '/event',
      type: 'POST',
      dataType: 'json',
      timeout: store.getters.getCapiRequestTimeoutSeconds * 1000,
      contentType: 'application/json',
      data: JSON.stringify(requestJson),
      success: function (data) {
        // console.log('[INFO] getThemeVariables response data', data)
        if (data && data.status === '440') {
          Kai.Core.handleInvalidSessionID(data, true)
        }
        // checkForSessionIDAndHandleResponse(data, 'getThemeVariables')
        if (callback) {
          callback(data)
        }
      },
      error: function (data) {
        console.info('[ERROR] getThemeVariables error data', data)
        checkForSessionIDAndHandleResponse(data, 'getThemeVariables', true)

        if (data) {
          Kai.Core.handleCAPIError('getThemeVariables', data)
        }
      }
    })
  }

  /****************************************************/

  /* Logout Session */

  /****************************************************/

  var logoutSession = function (callback) {
    var requestJson = kaiConversational.context.createSessionLogoutRequestJson.call(this, this.options)
    if (typeof $ !== 'undefined') {
      Kai.Core.handleCAPIRequest('logoutSession', requestJson)

      ajaxManager.addReq({

        url: ENV.SERVER_CONFIG.SERVER_URL + '/event',
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(requestJson),
        cache: false,
        timeout: store.getters.getCapiRequestTimeoutSeconds * 1000,
        success: function (data) {
          // console.log('[INFO] logoutSession response data', data)
          if (data) {
            Kai.Core.handleCAPIResponse('logoutSession', data)
          }
          if (callback) {
            callback(data)
          }
        },
        error: function (data) {
          console.info('[ERROR] logoutSession error data', data)
          if (data) {
            Kai.Core.handleCAPIError('logoutSession', data)
          }
          if (callback) {
            callback(data)
          }
        }
      })
    } else {
      var passData = {

        url: ENV.SERVER_CONFIG.SERVER_URL + '/event',
        requestJson: requestJson
      }
      if (callback) {
        callback(passData)
      }
    }
  }

  /****************************************************/

  /* Handle Server Error */

  /****************************************************/

  var handleServerError = function (errorStatusCode, exception) {
    // console.log('errorStatusCode', errorStatusCode);
    // console.log('xhr', xhr);
    // console.log('exception', exception);
    Kai.Core.typingIndicator(false)
    if (errorStatusCode === 0) {
      Kai.Core.addMessageContent('kai-core-components', $store.getters.getBotLanguages.translations.errorMessage.error0, TextBubble, 'kai-left', true)
    } else if (errorStatusCode === '201') {
      Kai.Core.addMessageContent('kai-core-components', $store.getters.getBotLanguages.translations.errorMessage.error201, TextBubble, 'kai-left', true)
    // console.log('Error : ' + errorStatusCode + ' Server error.');
    } else if (errorStatusCode === '404') {
      Kai.Core.addMessageContent('kai-core-components', $store.getters.getBotLanguages.translations.errorMessage.error404, TextBubble, 'kai-left', true)
    // console.log('Error : ' + errorStatusCode + ' Page note found');
    } else if (errorStatusCode === '500') {
      Kai.Core.addMessageContent('kai-core-components', $store.getters.getBotLanguages.translations.errorMessage.error500, TextBubble, 'kai-left', true)
    // console.log('Internal Server Error [500].');
    } else if (exception === 'parsererror') {
      Kai.Core.addMessageContent('kai-core-components', $store.getters.getBotLanguages.translations.errorMessage.parsererror, TextBubble, 'kai-left', true)
    // console.log('Error : ' + errorStatusCode + ' Impossible to parse result.');
    } else if (exception === 'timeout') {
      Kai.Core.addMessageContent('kai-core-components', $store.getters.getBotLanguages.translations.errorMessage.timeout, TextBubble, 'kai-left', true)
    // console.log('Error : ' + errorStatusCode + ' Request timeout.');
    } else {

    }
  }

  var handleKaiVersions = function (data) {
    if (data && data.context) {
      if (typeof data.context.api_version !== 'undefined' && !$store.getters.getKaiApiVersion.length) {
        store.state.kaiApiVersion = data.context.api_version
      }
      if (typeof data.context.app_version !== 'undefined' && !$store.getters.getKaiAppVersion.length) {
        store.state.kaiAppVersion = data.context.app_version
      }
      if (typeof data.context.data_version !== 'undefined' && !$store.getters.getKaiDataVersion.length) {
        store.state.kaiDataVersion = data.context.data_version
      }
      if (typeof data.context.model_version !== 'undefined' && !$store.getters.getKaiModelVersion.length) {
        store.state.kaiModelVersion = data.context.model_version
      }
    }
  }

  var checkForSessionIDAndHandleResponse = function (data, optionalMethodName, isErrorResponse) {
    if (isErrorResponse && data && data.responseJSON) {
      data = data.responseJSON
    }
    if (data) {
      store.dispatch('actionResponseData', data)
      try {
        if (typeof data.context.user.session_id !== 'undefined') {
          // console.log('SESSION ID', data.context.user.session_id)
          store.dispatch('actionKaiSessionId', data.context.user.session_id)
          checkForContextFeatures(data)
          if (optionalMethodName) {
            if (!isErrorResponse) {
              Kai.Core.handleCAPIResponse(optionalMethodName, data)
            } else {
              Kai.Core.handleCAPIError(optionalMethodName, data)
            }
          }
        }
      } catch (err) { }
    }
  }

  var checkForContextFeatures = function (data) {
    if (typeof data.context.features !== 'undefined') {
      if (data.context.features.disallowed && data.context.features.disallowed.length > 0) {
        for (var i = 0; i < data.context.features.disallowed.length; i++) {
          if (data.context.features.disallowed[i].toLowerCase() === 'message_contents.avatar') {
            $store.state.useAvatar = false
          }
        }
      }
    }
  }

  var handleSessionTranscript = function (data) {
    if (data) {
      if (data.entries && data.entries.length > 0) {
        for (var i = 0; i < data.entries.length; i++) {
          (function (x) {
            setTimeout(() => {
              if (data.entries[x].source === 'CUSTOMER_INPUT') {
                for (var j = 0; j < data.entries[x].message_contents.length; j++) {
                  if (data.entries[x].message_contents[j].type === 'TEXT') {
                    if (data.entries[x].message_contents[j].payload.text === '👍' || data.entries[x].message_contents[j].payload.text === '👎') {
                      data.entries[x].message_contents[j].payload.text = Kai.Core.getThumbsImage(data.entries[x].message_contents[j].payload.text)
                    }
                    Kai.Core.addMessageContent('kai-core-components', data.entries[x].message_contents[j].payload.text, TextBubble, 'kai-right')
                  }
                }
              } else if (data.entries[x].source === 'BOT_REPLY') {
                if (data.entries[x].quick_replies && x !== data.entries.length - 1) {
                  // only keep the latest quick reply, we don't want to render the older ones.
                  delete data.entries[x].quick_replies
                }
                data.entries[x].status = data.status
                Kai.Core.handleResponse(data.entries[x], 0, true)

                // for now we disable the scrolling animation when rendering previous session transcript,
                // only once the last entry is being rendered we can trigger the scrollContainer
                if (x === data.entries.length - 1) {
                  $store.dispatch('actionRenderingStatus', 'started')
                }
              }
            }, i * 100)
          })(i)
        }
      }
    }
  }

  /****************************************************/

  /* MAKE SURE TO EXPORT YOUR FUNCTIONS */

  /****************************************************/

  return {
    getContext,
    updateContext,
    removeExtraContext,
    sendRequest,
    startSession,
    sendEnterTokenEvent,
    sendAuthPassThruEvent,
    sendProcessOAuthEvent,
    sendGenericEvent,
    sendPullRequest,
    abortPullRequest,
    sendLiveChatCustomerStateEvent,
    sendLiveChatEndSessionEvent,
    sendLiveChatContactBackPhoneEvent,
    getHistory,
    logoutSession,
    handleServerError,
    sendMessage,
    sendIntent,
    handleKaiVersions,
    checkForSessionIDAndHandleResponse,
    getAdditionalRequestHeaders,
    setAdditionalRequestHeaders,
    getThemeVariables
    // extendSession
  }
}())// End Core

// Export Core
export default {
  CoreAPI
}

import Utils from '../js/kasisto/utils'
import { store } from '../store/index'

import TextBubble from '../core/components/TextBubble'

var utils = new Utils()
var requestJson = {}

const context = (function () {
  var userContext = createUserContext()
  var platformContext = createUserPlatformContext()
  var deviceContext = createUserDeviceContext()
  var extraContext
  var features

  /****************************************************/

  /* Update Context  */

  /****************************************************/

  var updateContext = function (context) {
    if (context) {
      if (context.device) {
        // console.log('deviceContext before update:', deviceContext)
        deviceContext = $jq.extend({}, deviceContext, context.device)
        // console.log('deviceContext after update:', deviceContext)
      }
      if (context.platform) {
        // console.log('platformContext before update:', platformContext)
        platformContext = $jq.extend({}, platformContext, context.platform)
        // console.log('platformContext after update:', platformContext)
      }
      if (context.user) {
        // console.log('userContext before update:', userContext)
        userContext = $jq.extend({}, userContext, context.user)
        // console.log('userContext after update:', userContext)
      }
      if (context.extra) {
        // console.log('extraContext before update:', extraContext)
        extraContext = $jq.extend({}, extraContext, context.extra)
        // console.log('extraContext after update:', extraContext)
      }
      if (context.features) {
        features = $jq.extend({}, features, context.features)
      }
      if (context.api_version) {
        // console.log('api_version before update:', store.state.api_version)
        store.state.api_version = context.api_version
        // console.log('api_version after update:', store.state.api_version)
      }
    }

    var updatedContext = createContext.call(this)
    // console.log('updatedContext', updatedContext)
    return updatedContext
  }

  /****************************************************/

  /* Remove Extra Context  */

  /****************************************************/

  var removeExtraContext = function () {
    extraContext = false
  }

  /****************************************************/

  /* Create User Device Context  */

  /****************************************************/

  function createUserDeviceContext () {
    if (!deviceContext) {
      deviceContext = {
        os: utils.getUserOS(),
        model: utils.getUserModel(),
        id: '',
        type: 'web'
      }
    }
    return deviceContext
  }

  /****************************************************/

  /* Create User Platform Context  */

  /****************************************************/

  function createUserPlatformContext () {
    if (!platformContext) {
      platformContext = {
        name: 'web',
        conversation_id: '',
        session_id: null,
        // "version": kaiOptions.webviewLibraryVersion
        version: '1.34',
        user_id: 'f073964'
      }
    }
    return platformContext
  }

  /****************************************************/

  /* Create User Context  */

  /****************************************************/

  function createUserContext (options) {
    if (!userContext) {
      userContext = {
      // "time_zone": getUserTimezone()
      // "meta_fields":[],
        time_zone: 'America/New_York'
      }
    }
    userContext.session_id = store.getters.getKaiSessionId
    return userContext
  }

  /****************************************************/

  /* Create Features Context  */

  /****************************************************/

  var createFeaturesContext = function (options) {
    if (!features) {
      features = {}
    }
    var disallowedFeatures = []
    if (!store.state.useAvatar && Kai.API.isApiVersionAtLeast('4.1.2')) {
      disallowedFeatures.push('message_contents.avatar')
    }

    if (disallowedFeatures.length > 0) {
      features.disallowed = disallowedFeatures
    }

    return features
  }

  /****************************************************/

  /* Create Content  */

  /****************************************************/

  var createContext = function (options) {
    try {
      var data = {
        context: {
          device: createUserDeviceContext.call(this),
          platform: createUserPlatformContext.call(this),
          user: createUserContext.call(this),
          api_version: store.state.api_version
        }
      }

      features = createFeaturesContext.call(this)
      if (!$jq.isEmptyObject(features)) {
        data.context.features = features
      }

      if (extraContext) {
        data.context.extra = extraContext
      }

      checkForMissingCapiContextFields(data.context)

      return data
    } catch (e) {
      console.error(e)
    }
  }

  /****************************************************/

  /* Build Request Context Object  */

  /****************************************************/

  var buildRequestContextObject = function () {
    requestJson = createContext.call(this)
    return requestJson
  }

  /****************************************************/

  /* Create Start Session Event RequestJson           */

  /****************************************************/
  var createStartSessionEventRequestJson = function (option) {
    var data = {
      ...createContext.call(this, this.options),
      type: 'START_SESSION',
      payload: {}
    }
    return data
  }

  /****************************************************/

  /* Create Enter Token Event RequestJson  */

  /****************************************************/

  var createEnterTokenEventRequestJson = function (options, token) {
    var data
    if (token) {
      data = {
        ...createContext.call(this, this.options),
        type: 'ENTER_TOKEN',
        payload: {
          token: token
        }
      }
      return data
    } else {
      if (ENV.SERVER_CONFIG.userToken) {
        data = {
          ...createContext.call(this, this.options),
          type: 'ENTER_TOKEN',
          payload: {
            token: ENV.SERVER_CONFIG.userToken
          }
        }
        return data
      } else {
        data = {
          ...createContext.call(this, this.options),
          type: 'ENTER_TOKEN',
          payload: {
            token: ''
          }
        }
        return data
      }
    }
  }

  /****************************************************/

  /* Create Auth Pass Thru Event Request Json  */

  /****************************************************/

  var createAuthPassThruEventRequestJson = function (options, metaFieldsArray) {
    if (metaFieldsArray) {
      var data = {
        ...createContext.call(this, this.options),
        type: 'AUTH_PASSTHRU',
        payload: {
          meta_fields: metaFieldsArray
        }
      }
      return data
    }
  }

  /****************************************************/

  /* Create Process OAuth Code Event RequestJson  */

  /****************************************************/

  function createProcessOAuthCodeEventRequestJson (options, token) {
    if (token) {
      var data = {
        ...createContext.call(this, this.options),
        type: 'PROCESS_OAUTH_AUTH_CODE',
        payload: {
          auth_code: token
        }
      }
      return data
    }
  }

  /****************************************************/

  /* Create Generic Event RequestJson  */

  /****************************************************/

  function createGenericEventRequestJson (options, type, metaFieldsArray) {
    if (metaFieldsArray) {
      var data = {
        ...createContext.call(this, this.options),
        type: type,
        payload: {
          meta_fields: metaFieldsArray
        }
      }
      return data
    }
  }

  /****************************************************/

  /* Create Intent Request Json */

  /****************************************************/

  function createIntentRequestJson (options) {
    var data = {
      ...createContext.call(this, this.options),
      type: 'INTENT'
    }

    return data
  }

  /****************************************************/

  /* Create Autocomplete Request Json */

  /****************************************************/

  function createAutocompleteRequestJson (options) {
    var data = {
      ...createContext.call(this, this.options),
      type: 'AUTO_COMPLETE'
    }

    return data
  }

  /****************************************************/

  /* Create History Request Json */

  /****************************************************/

  function createHistoryRequestJson (options) {
    var data = {
      ...createContext.call(this, this.options),
      type: 'GET_SESSION_TRANSCRIPT',
      payload: {}
    }

    return data
  }

  /****************************************************/

  /* Create Session Logout Request Json */

  /****************************************************/

  function createSessionLogoutRequestJson (options) {
    var data = {
      ...createContext.call(this, this.options),
      type: 'LOGOUT'
    }

    return data
  }

  /****************************************************/

  /* Create Live Chat Related Requests Json data  */

  /****************************************************/

  var createLiveChatSendCustomerStateRequest = function (options, isUserTyping) {
    var data = {
      ...createContext.call(this, this.options),
      type: 'LIVE_CHAT_SEND_CUSTOMER_STATE',
      payload: {
        is_typing: isUserTyping || false
      }
    }
    return data
  }

  function createLiveChatEndSessionRequest (options) {
    var data = {
      ...createContext.call(this, this.options),
      type: 'LIVE_CHAT_END_SESSION'
    }

    return data
  }

  function createLiveChatContactBackPhoneRequest (options, phoneNumber) {
    var data = {
      ...createContext.call(this, this.options),
      type: 'LIVE_CHAT_CONTACT_BACK',
      payload: {
        type: 'PHONE',
        phone_number: phoneNumber || null
      }
    }

    return data
  }

  /****************************************************/

  /* Create Get Theme Variables Event RequestJson           */

  /****************************************************/
  var createThemeVariablesEventRequestJson = function (option) {
    var data = {
      ...createContext.call(this, this.options),
      type: 'GET_UI_CONFIGURATION'
    }
    return data
  }

  /****************************************************/

  /* Display CAPI context missing field message       */

  /****************************************************/

  var checkForMissingCapiContextFields = function (context) {
    const missingDeviceType = context && context.device && (context.device.type === undefined || context.device.type.length === 0)
    const missingPlatformUserID = context && context.platform && (context.platform.user_id === undefined || context.platform.user_id.length === 0)
    if (missingDeviceType || missingPlatformUserID) {
      setTimeout(
        () => {
          Kai.Core.typingIndicator(false)
          if (missingDeviceType) {
            displayMissingCapiContextFieldMessage('device.type')
          }
          if (missingPlatformUserID) {
            displayMissingCapiContextFieldMessage('platform.user_id')
          }
          const capiContextAdditionalInfo = "Please refer to the <a href='https://docs.kasisto.com/4.3/webview#getting-started'>developer documentation</a> for more info."
          Kai.Core.addMessageContent('kai-core-components', capiContextAdditionalInfo, TextBubble, 'kai-left', true)
          store.dispatch('actionInputMessage', '')
        }, 500)

      throw new Error('Missing CAPI Context field(s).')
    }
  }

  var displayMissingCapiContextFieldMessage = function (fieldName) {
    const capiContextMissingFieldError = 'Error - Configure the following field in Kasisto Conversational API context: <b>' + fieldName + '</b>'
    Kai.Core.addMessageContent('kai-core-components', capiContextMissingFieldError, TextBubble, 'kai-left', true)
  }
  /****************************************************/

  return {
    createContext,
    updateContext,
    removeExtraContext,
    buildRequestContextObject,
    createStartSessionEventRequestJson,
    createEnterTokenEventRequestJson,
    createAuthPassThruEventRequestJson,
    createProcessOAuthCodeEventRequestJson,
    createGenericEventRequestJson,
    createHistoryRequestJson,
    createSessionLogoutRequestJson,
    createLiveChatSendCustomerStateRequest,
    createLiveChatEndSessionRequest,
    createLiveChatContactBackPhoneRequest,
    createThemeVariablesEventRequestJson,
    createIntentRequestJson,
    createAutocompleteRequestJson,
    checkForMissingCapiContextFields,
    displayMissingCapiContextFieldMessage
  }
}())// End Core

// Export Core
export default {
  context
}

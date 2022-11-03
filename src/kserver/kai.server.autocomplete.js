import { store } from '../store/index'
import kaiConversational from './kai.create.context'

const BaseAPI = (function () {
  /*************************************************************/

  /* Test autocomplete response for Typeahead bloodhound.js */

  /***********************************************************/

  var addRequestHeadersToXHRRequest = function (xhr) {
    const requestHeaders = store.getters.getRequestHeaders
    if (typeof requestHeaders !== 'undefined' && requestHeaders) {
      Object.keys(requestHeaders).forEach(function (key) {
        xhr.headers[key] = requestHeaders[key]
      })
    }
    return xhr
  }

  var autoCompleteAjaxRequest = (ajaxSettings, query) => {
    // the parameters other than the prefix are the default values

    const requestJson = kaiConversational.context.createAutocompleteRequestJson()

    requestJson.payload = store.getters.getAutocompleteServiceSettings
    requestJson.payload.prefix = query

    ajaxSettings.type = 'POST'
    ajaxSettings.dataType = 'json'
    ajaxSettings.headers = {
      [window.ENV.SERVER_CONFIG.APP_AUTH_HEADER]: window.ENV.SERVER_CONFIG.APP_AUTH_KEY
    }

    addRequestHeadersToXHRRequest(ajaxSettings)

    ajaxSettings.timeout = store.getters.getCapiRequestTimeoutSeconds * 1000
    ajaxSettings.contentType = 'application/json;charset=UTF-8'
    ajaxSettings.data = JSON.stringify(requestJson)
    ajaxSettings.host = window.ENV.SERVER_CONFIG.SERVER_URL
    // ajaxSettings.connection = 'keep-alive'
    // ajaxSettings.accept = '*/*'
    // ajaxSettings.acceptEncoding = 'gzip, deflate, br'
    // ajaxSettings.acceptLanguage = 'en-US,en;q=0.9'
    // ajaxSettings['Sec-Fetch-Mode'] = 'cors'
    // ajaxSettings['Sec-Fetch-Dest'] = 'empty'
    return ajaxSettings
  }
  /****************************************************/

  /* MAKE SURE TO EXPORT YOUR FUNCTIONS */

  /****************************************************/

  return {
    autoCompleteAjaxRequest
  }
}())// End Core

// Export Core
export default {
  BaseAPI
}

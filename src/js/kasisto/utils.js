function Utils () {}
module.exports = Utils

Utils.prototype.getUserOS = function () {
  var OSName = 'Unknown'
  if (typeof window !== 'undefined') {
    if (window.navigator.userAgent.indexOf('Windows NT 10.0') !== -1) OSName = 'Windows 10'
    if (window.navigator.userAgent.indexOf('Windows NT 6.2') !== -1) OSName = 'Windows 8'
    if (window.navigator.userAgent.indexOf('Windows NT 6.1') !== -1) OSName = 'Windows 7'
    if (window.navigator.userAgent.indexOf('Windows NT 6.0') !== -1) OSName = 'Windows Vista'
    if (window.navigator.userAgent.indexOf('Windows NT 5.1') !== -1) OSName = 'Windows XP'
    if (window.navigator.userAgent.indexOf('Windows NT 5.0') !== -1) OSName = 'Windows 2000'
    if (window.navigator.userAgent.indexOf('Mac') !== -1) OSName = 'Mac/iOS'
    if (window.navigator.userAgent.indexOf('X11') !== -1) OSName = 'UNIX'
    if (window.navigator.userAgent.indexOf('Linux') !== -1) OSName = 'Linux'
  }
  return OSName
}

Utils.prototype.getUserModel = function () {
  if (typeof window !== 'undefined') {
    // Opera 8.0+
    // eslint-disable-next-line no-undef
    var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0

    // Firefox 1.0+
    var isFirefox = typeof InstallTrigger !== 'undefined'

    // Safari 3.0+ "[object HTMLElementConstructor]"
    // eslint-disable-next-line no-undef
    var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === '[object SafariRemoteNotification]' })(!window.safari || safari.pushNotification)

    // Internet Explorer 6-11
    var isIE = /* @cc_on!@ */false || !!document.documentMode

    // Edge 20+
    var isEdge = !isIE && !!window.StyleMedia

    // Chrome 1+
    var isChrome = !!window.chrome && !!window.chrome.webstore

    if (isOpera) {
      return 'Opera'
    }
    if (isFirefox) {
      return 'Firefox'
    }
    if (isSafari) {
      return 'Safari'
    }
    if (isIE) {
      return 'Internet Explorer'
    }
    if (isEdge) {
      return 'Edge'
    }
    if (isChrome) {
      return 'Chrome'
    }
  }
  return 'Unknown'
}

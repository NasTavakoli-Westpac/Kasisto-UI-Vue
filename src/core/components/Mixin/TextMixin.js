module.exports = {
  methods: {
    linkify: function (text) {
      if ((typeof text !== 'undefined' && typeof text === 'string') || text instanceof String) {
        if (text.length) {
          if (text.trim() !== '') {
            var urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/ig
            var urls = text.match(urlRegex)
            if (urls) {
              for (var i = 0; i < urls.length; i++) {
                var url = urls[i]
                var parts = text.split(url)
                if (parts[0].trim().length >= 6) {
                  var beforeURLText = parts[0].trim().substr(parts[0].trim().length - 6)
                  if (beforeURLText.indexOf('href=') === -1 && beforeURLText.indexOf('src=') === -1) {
                    text = text.replace(url, '<a href="' + url + '" target="_blank">' + url + '</a>')
                  }
                }
              }
            }
            var textToHTML = $jq('<div>').append(text)
            textToHTML.find('a').each(function () {
              // in case customer have inserted an anchor, tag make sure it is using the attribute "target"="_blank"
              $jq(this).attr('target', '_blank')
              // prevent tab key to focus on the link
              $jq(this).attr('tabindex', '-1')
            })
            textToHTML.find('area, button, iframe, input, select, summary, textarea, video controls').each(function () {
              // prevent tab key to focus on other standard elements
              $jq(this).attr('tabindex', '-1')
            })
            text = textToHTML.html()
          }
        }
      }
      return text
    },
    lineBreak: function (message) {
      if ((typeof message !== 'undefined' && typeof message === 'string') || message instanceof String) {
        message = message.replace(/(\r\n|\n|\r)/gm, '<br class="linebreak">')
        return message
      }
    }
  }
}

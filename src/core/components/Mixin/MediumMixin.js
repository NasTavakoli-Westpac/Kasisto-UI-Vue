module.exports = {
  methods: {
    mediumContent: function (value, optionalType) {
      if (!value || value === '') {
        return ''
      }

      // try if video
      var videoId = this.getId(value)
      if (value.match(/(?:\b|_)(?:vimeo.com)(?:\b|_)/i)) {
        this.isVimeoVideo = true
        this.source = 'https://player.vimeo.com/video/' + videoId
      } else if (value.match(/(?:\b|_)(?:youtube.com)(?:\b|_)/i)) {
        this.isYoutubeVideo = true
        this.source = 'https://www.youtube.com/embed/' + videoId + '?playsinline=1'
      } else if (value.substr(value.length - 4).indexOf('.mp4') > -1 || (optionalType && optionalType === 'VIDEO')) {
        var url = new URL(value)
        this.isMP4Video = true
        this.source = 'https://' + url.hostname + url.pathname + '?playsinline=1'
      } else {
        // fallback to image
        this.isImage = true
        this.source = value
      }
      return this.source
    },
    getId (url) {
      var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
      var vimeoId = url.match(/^.+vimeo.com\/(.*\/)?([^#?]*)/)

      if (url.indexOf('youtube') > -1) {
        var match = url.match(regExp)

        if (match && match[2].length === 11) {
          return match[2]
        } else {
          return 'error'
        }
      } else {
        vimeoId = url.match(/^.+vimeo.com\/(.*\/)?([^#?]*)/)
        return vimeoId ? vimeoId[2] || vimeoId[1] : null
      }
    },
    imageLoaded (optionalText) {
      this.$emit('imageLoaded')
    }
  }
}

module.exports = {
  methods: {
    getImagePath (fileName) {
      if ($store.getters.isInlineImagesEnabled) {
        return require('@/assets/img/' + fileName)
      } else {
        return $store.getters.getBaseImagePath + fileName
      }
    }
  }
}

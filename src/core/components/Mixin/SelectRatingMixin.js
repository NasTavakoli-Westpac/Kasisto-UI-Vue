module.exports = {
  methods: {
    submitRating (event, item, index) {
      if (!this.isDisable) {
        this.currentSelectIndex = index
        event.currentTarget.classList.add('selected-item')
        Kai.Core.submitSelection(item.value)
        Kai.Core.addMessageContent('kai-core-components', item.label, this.textBubble, 'kai-right')
        this.isDisable = true
      }
    },
    submitRatingMultiple (event, item, index) {
      if (!this.isDisable) {
        this.currentSelectIndex = index
        Kai.Core.submitSelection(item.value)
        Kai.Core.addMessageContent('kai-core-components', item.label, this.textBubble, 'kai-right')
        this.isDisable = true
        this.ratingSet = true
      }
    }
  }
}

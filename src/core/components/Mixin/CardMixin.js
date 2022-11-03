module.exports = {
  data () {
    return {
      isExpanded: false,
      showExpandButton: false,
      isButtonLimited: false,
      forceUpdate: false,
      expandIconSrc: this.getImagePath('down-arrow.png'),
      collapseIconSrc: this.getImagePath('up-arrow.png'),
      // expandIconSrc: this.getImagePath('ic_plus.png'),
      // collapseIconSrc: this.getImagePath('ic_minus.png'),
      mainElementMaxHeight: '',
      itemWithFixedHeight: false
    }
  },
  mounted () {
    // calculate card height when view is first mounted
    this.$nextTick().then(() => {
      // Code that will run only after the
      // entire view has been re-rendered
      if (!this.forceUpdate) {
        this.calculateMainElementMaxHeight()
      }
    })
  },
  computed: {
    isAdaptiveItemMode () {
      var newItemModeIsAdaptive = true
      if (window.$store.getters.getCardSizeMode && window.$store.getters.getCardSizeMode.toLowerCase() === 'fixed') {
        newItemModeIsAdaptive = false
      } else if (window.$store.getters.getCardSizeMode && window.$store.getters.getCardSizeMode.toLowerCase() === 'adaptive') {
        newItemModeIsAdaptive = true
      }
      this.forceUpdate = false
      this.currentCardMode = window.$store.getters.getCardSizeMode.toLowerCase()
      return newItemModeIsAdaptive
    },
    displayFixed () {
      if (!this.isAdaptiveItemMode && !this.isExpanded) {
        return true
      } else if (this.isAdaptiveItemMode && (this.itemWithFixedHeight || this.itemWithLegend) && !this.isExpanded) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    itemButton (event, button) {
      Kai.Core.buttonPressed(button)
    },
    validButtons (buttons) {
      var _this = this
      if (buttons) {
        return buttons.filter(function (button, index) {
          if (_this.displayFixed && index < $store.getters.getMaximumButtonsPerCard && button.label) {
            // when display the card with fixed size, we limit the number of buttons that will be rendered for each card item,
            // this is to avoid displaying more buttons than a fixed size card is able to contain.
            return button.label
          } else if (_this.displayFixed && index >= $store.getters.getMaximumButtonsPerCard && button.label) {
            // if we limit the number of buttons, then the card should be expandable.
            _this.isButtonLimited = true
          } else if (!_this.displayFixed) {
            return button.label
          }
        })
      }
    },
    calculateMainElementMaxHeight () {
      // this method is used to calculate the height to apply to the card main text item that might need to be truncated.
      // The calculation is based on card height defined by customer and the height of the card's other container defined in cardElements (i.e.: medium, title and buttons)

      // get the fixed height defined by customer in the variable.less file
      var cardFixedHeight
      if (this.isTextBubble) {
        cardFixedHeight = parseInt(getComputedStyle(document.getElementById('webview-container')).getPropertyValue('--kai-bubble-text-fixed-height'), 10)
      } else if (this.isLargeCard) {
        cardFixedHeight = parseInt(getComputedStyle(document.getElementById('webview-container')).getPropertyValue('--kai-card-large-item-fixed-height'), 10)
      } else {
        cardFixedHeight = parseInt(getComputedStyle(document.getElementById('webview-container')).getPropertyValue('--kai-card-item-fixed-height'), 10)
      }

      if (this.$refs.cardItem && cardFixedHeight > 0) {
        this.forceUpdate = false

        this.mainElementMaxHeight = cardFixedHeight - 10 // -10 for extra padding

        var mainElements = this.$refs.cardItem.getElementsByClassName(this.cardMainElement)
        if (mainElements && mainElements.length > 0) {
          for (var i = 0; i < this.cardElements.length; i++) {
            var elements = this.$refs.cardItem.getElementsByClassName(this.cardElements[i].className)
            var elementHeight = 0
            if (elements && elements.length > 0) {
              elementHeight = elements[0].clientHeight
              if (this.cardElements[i].substract) {
                this.mainElementMaxHeight -= elementHeight
              } else {
                this.mainElementMaxHeight += elementHeight
              }
            }
          }
          this.hideExpandButton()
        }
      }
    },
    hideExpandButton () {
      if (this.$refs.cardItem) {
        var mainElements = this.$refs.cardItem.getElementsByClassName(this.cardMainElement)
        var mainElementCurrentHeight = 0
        var maxHeight = 0
        if (this.isButtonLimited) {
          this.showExpandButton = true
        } else if (mainElements && mainElements[0]) {
          mainElementCurrentHeight = mainElements[0].clientHeight
          maxHeight = this.mainElementMaxHeight
          mainElementCurrentHeight = parseInt(mainElementCurrentHeight, 10)
          maxHeight = parseInt(maxHeight, 10)
          if (mainElementCurrentHeight < maxHeight || maxHeight === 0) {
            this.showExpandButton = false
          } else {
            if (mainElementCurrentHeight > maxHeight) {
              this.itemWithFixedHeight = true
            }
            this.showExpandButton = true
          }
        } else {
          this.showExpandButton = false
        }
      }
    },
    clickExpandButton (event, item, index) {
      this.isExpanded = !this.isExpanded
    }
  }
}

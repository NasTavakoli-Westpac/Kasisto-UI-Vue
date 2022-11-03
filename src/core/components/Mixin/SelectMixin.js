module.exports = {
  computed: {
    cardItems () {
      return this.response.default.payload.options
    },
    validateSelection () {
      var isValid = true
      if (this.response.default.payload.min_select && this.response.default.payload.max_select) {
        if (this.response.default.payload.min_select > this.selectedItemsIndex.length) {
          this.validationMessage = $store.getters.getBotLanguages.translations.selectTemplate.insufficientItemsMessage

          isValid = false
        }
        if (this.response.default.payload.max_select < this.selectedItemsIndex.length) {
          this.validationMessage = $store.getters.getBotLanguages.translations.selectTemplate.tooManyItemsMessage

          isValid = false
        }
      }
      if (isValid) {
        this.showValidationMessage = false
      } else if (this.selectedItemsIndex.length > 0) {
        this.showValidationMessage = true
      }
      return isValid
    }
  },
  methods: {
    multiCardSubmitBtn () {
      if (this.validateSelection) {
        this.$parent.isDisable = true
        this.hideSelectChipPanel = true
        var checkedNamesMultiSelect = []
        // TODO: finalise the usage of question_display_text fields to be rendered as a user bubble when submitting the selection
        for (var i = 0; i < this.selectedItemsIndex.length; i++) {
          checkedNamesMultiSelect.push(this.response.default.payload.options[this.selectedItemsIndex[i]].value)
          if (this.response.default.payload.options[this.selectedItemsIndex[i]].question_display_text) {
            Kai.Core.addMessageContent('kai-core-components', this.response.default.payload.options[this.selectedItemsIndex[i]].question_display_text, this.textBubble, 'kai-right')
          }
        }
        Kai.Core.submitSelection(checkedNamesMultiSelect, function () {})
        window.$store.state.chipSelectedItem = []
      } else {
        this.showValidationMessage = true
      }
    },
    selectBtn (event, item, index) {
      // console.log('event', event, item, index)

      if (item === null) {
        // For select checklist
        if (this.$parent.$refs.SelectChecklistComp) {
          this.$parent.$refs.SelectChecklistComp.uncheckSelected(index)
        }

        // Remove chip item
        window.$store.state.chipSelectedItem.splice(index, 1)
        this.$parent.selectedItemsIndex.splice(index, 1)
        return false
      }

      if (!this.isDisable) {
        var searchedIndex = this.selectedItemsIndex.indexOf(index)
        if (searchedIndex > -1) {
          // Remove item
          window.$store.state.chipSelectedItem.splice(searchedIndex, 1)
          this.$parent.selectedItemsIndex.splice(searchedIndex, 1)
        } else {
          // Add chip item
          if (item.payload && item.payload.title) {
            window.$store.state.chipSelectedItem.push({ text: item.payload.title })
          } else {
            // For select checklist
            window.$store.state.chipSelectedItem.push({ text: item.question_display_text })
          }

          // Update parent selectItemIndex to keep track
          this.$parent.selectedItemsIndex.push(index)
        }
      }
      /// If select min & max = 1. Submit message to CAPI
      if (this.ishideSubmitContent) {
        this.multiCardSubmitBtn()
      }
    },
    validateOnscreenComponent () {
      // console.log('workinng..', this)
    },
    hideSubmitContent () {
      if (this.response.default.payload.min_select === 1 && this.response.default.payload.max_select === 1) {
        this.ishideSubmitContent = true
      }
    }
  }
}

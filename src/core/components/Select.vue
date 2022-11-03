<template>
<div>
  <div>
      <SelectCarousel v-if="this.response.default.payload.mode === 'CAROUSEL'" :isDisable="this.isDisable"  :response="this.response"></SelectCarousel>
      <SelectList v-if="this.response.default.payload.mode === 'LIST'" :isDisable="this.isDisable" :response="this.response"></SelectList>
      <SelectChecklist v-if="this.response.default.payload.mode === 'CHECKLIST' && !verifyContainExtraPayload()" :isDisable="this.isDisable" :response="this.response"></SelectChecklist>
      <SelectRating v-if="this.response.default.payload.mode === 'RATING'" :response="this.response"></SelectRating>
  </div>
  <ChipPanelQbar v-if="!this.isDisable" :response="this.response"></ChipPanelQbar>
</div>
</template>

<script>
import SelectChecklist from './SelectChecklist'
import SelectList from './SelectList'
import SelectCarousel from './SelectCarousel'
import SelectRating from './SelectRating'
import ChipPanelQbar from './ChipPanelQbar'

import {
  store
} from '../../store/index'

export default {
  name: 'Select',
  data () {
    return {
      response: this.$slots,
      selectedItemsIndex: [],
      isDisable: false
    }
  },
  created () {
    store.state.chipSelectedItem = []
  },
  mounted: function () {
    // Set max item select
    this.$root.$refs.SelectComp = this
    store.state.chipSelectedItemMax = this.response.default.payload.max_select // Refactor can use below selectResponseData

    // Init Check for pervious component on screen
    if (store.state.perviousCompValidation === undefined) {
      store.state.perviousCompValidation = this
    } else {
      // Disable perivous component and clear tags
      store.state.perviousCompValidation.isDisable = true
      // Update latest component
      store.state.perviousCompValidation = this
    }
  },
  methods: {
    verifyContainExtraPayload () {
      for (var i = 0; i < this.response.default.payload.options.length; i++) {
        if (this.response.default.payload.options[i].payload &&
                    Object.keys(this.response.default.payload.options[i].payload).length !== 0 &&
                    this.response.default.payload.options[i].payload.constructor === Object) {
          return true
        }
      }
      return false
    }
  },
  components: {
    SelectChecklist,
    SelectCarousel,
    SelectList,
    SelectRating,
    ChipPanelQbar
  }
}
</script>

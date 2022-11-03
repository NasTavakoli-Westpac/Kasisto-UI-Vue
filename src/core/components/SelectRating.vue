<template>
<section class="kai-select-rating" ref="listview">
   <RatingBinary v-if="this.response.default.payload.input_type === 'RATING_BINARY'" :response="this.response"></RatingBinary>
   <RatingMultiple v-if="this.response.default.payload.input_type === 'RATING_5' || this.response.default.payload.input_type === 'RATING_10'" :response="this.response"></RatingMultiple>
</section>
</template>

<script>

import RatingBinary from './RatingBinary'
import RatingMultiple from './RatingMultiple'
import KeyboardNavigationMixin from './Mixin/KeyboardNavigationMixin'

export default {
  name: 'SelectRating',
  props: ['response'],
  components: {
    RatingBinary,
    RatingMultiple
  },
  methods: {

  },
  mixins: [
    KeyboardNavigationMixin
  ]
}
</script>

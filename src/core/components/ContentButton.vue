<template>
<div class="kai-button-template kai-clear" tabindex="0">
   <div v-if="!this.response.default.length && this.response.default.payload && this.response.default.payload.label" v-on:click="itemButton(response.default.payload)" class="kai-content-button kai-card-button kai-button">
    {{this.response.default.payload.label}}
  </div>
</div>
</template>

<script>
import Kai from '../../kai'
import './styles/ContentButton.less'

export default {
  name: 'ContentButton',
  mounted: function () {},
  data () {
    return {
      response: this.$slots
    }
  },
  methods: {
    itemButton (payload) {
      // Submit POSTBACK
      // console.log('itemButton payload', payload)
      Kai.Core.buttonPressed(payload)
    }
  }
}
</script>

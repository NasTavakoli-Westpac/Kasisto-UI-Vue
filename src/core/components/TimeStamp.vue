<template>
<div class="kai-time-stamp">
    <div class="brand-profile-name">
        <span class="kai-quick-timestamp">{{this.processTimeStamp}}</span>
    </div>
</div>
</template>

<script>
import moment from 'moment'

export default {
  name: '',
  mounted: function () {},
  data () {
    return {
      timeStampOptionalValue: this.$slots,
      timeStampFormat: window.$store.getters.getTimeStampFormat
    }
  },
  computed: {
    processTimeStamp () {
      if (this.timeStampOptionalValue.default && this.timeStampOptionalValue.default.length > 0) {
        return moment(this.timeStampOptionalValue.default).locale($store.getters.getBotLanguages.localeTimeStamp).format(this.timeStampFormat)
      } else {
        return moment().locale($store.getters.getBotLanguages.localeTimeStamp).format(this.timeStampFormat)
      }
    }
  },
  methods: {
    moment
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
.kai-time-stamp {
    clear: both;
}

.kai-time-stamp .brand-profile-name {
    color: #BB0826;
    margin-left: 0px;
    margin-bottom: 5px;
    font-size: 12px;
    text-align: center;
}

.kai-time-stamp .kai-quick-timestamp {
    font-size: 10px;
    font-weight: 500px;
    color: #666666;
    text-transform: uppercase;
    padding: 0 5px;
}
</style>

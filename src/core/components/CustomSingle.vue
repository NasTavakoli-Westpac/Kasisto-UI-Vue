<template>
      <Custom v-if="this.response.default.type === 'CUSTOM'" :item="this.response.default.payload" :isSingle="true"></Custom>
</template>

<script>
import Custom from './Custom'

export default {
  name: 'CustomSingle',
  data () {
    return {
      response: this.$slots
    }
  },
  components: {
    Custom
  }
}
</script>

<template>
  <section>
  <!-- <div class="kai-debug-container" style="display: none;">
      <span>Debug mode on</span>
  </div> -->

<!-- Show Debug buttons -->
<div class="debug-content-container">
      <div class="debug-wrapper">

      <div class="debug-row" v-for="(item, index) in this.response.default.debugContent" :key="index">
         <div v-bind:class="item.active" class="debug-box" v-on:click="showDebugComponent(item.active, item.title)">
           <img aria-hidden="true" :src="getImagePath('icons/' + item.icon)">
           <h2>{{item.title}}</h2>
           <p>{{item.subtitle}}</p>
         </div>
      </div>
      </div>

    <div class="clear"></div>
    <div class="debug-end-line">
      See results below
    </div>
</div>

</section>
</template>

<script>
import Kai from '../../kai'
import ImageUtilityMixin from './Mixin/ImageUtilityMixin'
import './styles/DebugMode.less'

export default {
  name: 'DebugMode',
  mixins: [
    ImageUtilityMixin
  ],
  data () {
    return {
      response: this.$slots
    }
  },
  methods: {
    showDebugComponent: function (action, title) {
      Kai.Core.debugSubmitMessageHandler(action)
    }
  }
}
</script>

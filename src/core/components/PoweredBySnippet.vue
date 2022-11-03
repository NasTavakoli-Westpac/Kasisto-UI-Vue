<template>
<div class="powered_by_container">

  <div>
    <div class="powered_by_label">
      Powered by
    </div>
    <a href="https://kasisto.com" target="_blank"><img class="powered_by_logo" :src="logoUrl"></a>
  </div>

</div>
</template>

<script>
import ImageUtilityMixin from './Mixin/ImageUtilityMixin'

export default {
  name: 'PoweredBySnippet',
  mixins: [
    ImageUtilityMixin
  ],
  data () {
    return {
      logoUrl: this.getImagePath('svg/Logo_Kasisto.svg')
    }
  }
}
</script>

<style scoped>

.powered_by_container{
  position: fixed;
  width: 127.64px;
  height: 27px;

  background: #FFFFFF;
  border: 1px solid #DDDDDD;
  box-sizing: border-box;
  box-shadow: 3px 3px 10px 1px rgba(0, 0, 0, 0.15);
  border-radius: 0px 0px 15px 15px;
}
.powered_by_label{
  float: left;
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 11px;
  line-height: 13px;
  margin: 6px 0 7px 14px;
  color: #1C2029;
}

.powered_by_logo{
  top: 9.62%;
  margin: 5px 2.5px 7px 2.5px;
}

</style>

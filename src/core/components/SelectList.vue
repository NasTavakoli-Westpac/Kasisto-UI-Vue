<template>
<section class="kai-row">
    <div class="kai-card-large-template" navDir="horizontal" ref="listview">
        <CardLargeItem tabindex="0" navLvl="1" navDir="vertical" class="kai-card-large-container wrapper" v-for="(item, i) in this.response.default.payload.options" :key="i" :item="item" :index="i" :isSelect=true ref="item">
        </CardLargeItem>

    </div>
    <!--List view multi select template end-->
</section>
</template>

<script>
import TextBubble from './TextBubble'
import CardLargeItem from './CardLargeItem'
import SelectMixin from './Mixin/SelectMixin'
import KeyboardNavigationMixin from './Mixin/KeyboardNavigationMixin'
import './styles/SelectList.less'
export default {
  name: 'SelectList',
  props: ['response', 'isDisable'],
  components: {
    CardLargeItem
  },
  created: function () {
    this.hideSubmitContent() // Mixin
    this.$root.$refs.SelectListComp = this
  },
  data () {
    return {
      // isDisable: false,
      selectedItemsIndex: this.$parent.selectedItemsIndex,
      // selectedItemsIndex: [],
      validationMessage: '',
      textBubble: TextBubble,
      ishideSubmitContent: false
    }
  },
  mixins: [
    SelectMixin,
    KeyboardNavigationMixin
  ]
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>

</style>

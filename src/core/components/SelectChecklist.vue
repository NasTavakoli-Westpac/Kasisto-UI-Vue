<template>
<section>
    <div class="kai-row kai-multi-select-container" tabindex="0" navDir="horizontal">
        <div class="row">
            <div class="col-sm-12">
                <div class='multi-select-container'>
                    <div class="desktop-view">
                        <div tabindex="-1" navLvl="1" navDir="vertical" v-for="(item, i) in this.response.default.payload.options" :key="i">
                            <div class="select-bground col-sm-10">
                                <label>
                                    <input class="filled-in checkmark" :data-id="i" v-on:click="selectBtn($event, item, i)" type="checkbox" ref="cardInput" v-bind:value="item.value" :disabled="isDisable">
                                    <span v-if="item.label" class="checkbox-space " :class="{disabled: isDisable}">{{item.label}}</span>
                                    <span v-else class="checkbox-space " :class="{disabled: isDisable}">{{item.value}}</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
</template>

<script>
import TextBubble from './TextBubble'
import SelectMixin from './Mixin/SelectMixin'
import KeyboardNavigationMixin from './Mixin/KeyboardNavigationMixin'
import './styles/SelectChecklist.less'
export default {
  name: 'SelectChecklist',
  props: ['response', 'isDisable'],
  created: function () {
    this.hideSubmitContent() // Mixin
    this.$root.$refs.SelectChecklistComp = this
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
  methods: {
    uncheckSelected (index) {
      var getIndexValue = this.selectedItemsIndex[index]
      var inputs = document.querySelectorAll('.checkmark')

      // console.log('uncheckSelected => getIndexValue', getIndexValue)

      for (var i = 0; i < inputs.length; i++) {
        inputs[getIndexValue].checked = false
      }
    }
  },
  mixins: [
    SelectMixin,
    KeyboardNavigationMixin
  ]
}
</script>

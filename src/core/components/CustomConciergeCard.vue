<template>
<section>
    <div class="kai-row"></div>
    <div class="kai-card-large-container wrapper">
        <div class="header">
            <div class="checkmark-listview-select" v-html="item.data.title"></div>
            <div class="large-card-right">
                <div class="cust-concierge-highlight-label" v-html="item.data.highlight.label"></div>
                <div class="cust-concierge-highlight-container">
                    <div class="cust-concierge-highlight-value" v-html="item.data.highlight.value"></div>
                </div>
            </div>
        </div>
        <div class="item kai-card-large-template">
            <div class="item-wrapper kai-right cust-concierge-subtitle">
                <div class="item-text">
                    {{item.data.subtitle}}
                </div>
            </div>
            <div class="cust-concierge-table">
                <div class="cust-concierge-table-body">
                    <div class="cust-concierge-table-row" v-for="(row, index) in item.data.table_data.items" :key="index">
                        <div class="cust-concierge-table-cell" v-for="(cell, property) in row" :key="property">
                            <div class="cust-concierge-table-head" v-if="index==0" v-html="property"></div>
                            <div v-html="cell"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="button list-button kai-card-button" v-for="(button, buttonIndex) in item.data.buttons" :key="buttonIndex" v-on:click="itemButton(button)">{{button.label}}</div>

    </div>
</section>
</template>

<script>
import Kai from '../../kai'
import './styles/CustomConciergeCard.less'

export default {
  name: 'CustomConciergeCard',
  props: ['item'],
  computed: {
    tableItems () {
      var items = this.item.data.table_data.items
      for (var i = 0; i < items.length; i++) {
        var item = items[i]
        Object.entries(item).forEach(
          ([key, value]) => console.log(key, value)
        )
      }
      return items
    }
  },
  mixins: [],
  methods: {
    itemButton (button) {
      Kai.Core.buttonPressed(button)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
</style>

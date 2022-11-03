<template>
 <section v-if="this.showChipPanel" id="kai-chip-panel">
     <li v-for="item in this.getChipItem" :key="item">
    {{ item }}
     </li>
 </section>
</template>

<script>

import SelectMixin from './Mixin/SelectMixin'
export default {
  name: 'ChipPanel',
  mixins: [
    SelectMixin
  ],
  data () {
    return {
      showChipPanel: false,
      getChipItem: [],
      chipItem: 0
    }
  },
  methods: {
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>

#kai-chip-panel {
    position: absolute;
    bottom: 6px;
    width: calc(100% - 0px);
    z-index: 3;
    height: 55px;
    padding: 15px;

}

</style>

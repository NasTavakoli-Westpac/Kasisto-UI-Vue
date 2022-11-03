<template>
<section class="kai-rating-binary-container">
    <div class="kai-rating-binary-wrapper" tabindex="0" navDir="horizontal">
        <div class="kai-quick-reply-item" tabindex="-1" navLvl="1" navDir="horizontal" v-on:click="submitRating($event, item, i)" v-for="(item, i) in ratingItems" :key="i">
            <div v-if="isDisable" class="kai-card-disabled-overlay"></div>
            <div class="kai-quick-reply-label">
                 <div v-html="item.label" :data-value="item.value"   class="kai-quick-reply-label"></div>
            </div>
        </div>
    </div>
</section>
</template>

<script>
import SelectRatingMixin from './Mixin/SelectRatingMixin'

export default {
  name: 'RatingBinary',
  props: ['response'],
  components: {

  },
  computed: {
    ratingItems: function () {
      var items = this.response.default.payload.options
      for (var i in items) {
        if (Kai.API.getThumbsImage(items[i].label)) {
          items[i].label = Kai.API.getThumbsImage(items[i].label)
        }
      }
      return items
    }
  },
  data () {
    return {
      isDisable: false
    }
  },
  mixins: [
    SelectRatingMixin
  ]
}
</script>

<style>

 .kai-rating-binary-container {
     padding: 0px 0 0 50px;
 }

 .kai-rating-binary-wrapper {
    padding: 10px 0 20px 0;
    display: table;
    justify-content: flex-start;
    clear: both;
 }

 .selected-item {
     background-color:var(--highlight-color);
     border-radius: 50%;
 }

 .kai-rating-binary-wrapper:focus, .kai-quick-reply-item:focus {
    outline: none;
    box-shadow: 0 0 5px 3px var(--highlight-color);
}

</style>

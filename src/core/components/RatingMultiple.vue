<template>
  <section>
    <div class="kai-clear">
      <div class="kai-rating-five-container"  tabindex="0" navDir="horizontal">

        <span class="rate-title"> RATE THIS RESPONSE </span>
        <!-- CIRCLE RATING -->
        <div v-if="this.ratingIcon === 'circle'">
          <div class="rating-wrapper" tabindex="-1" navLvl="1" navDir="horizontal" v-on:click="submitRatingMultiple($event, item, i)" v-for="(item, i) in this.response.default.payload.options" :key="i">
            <svg @mouseover="ratingOn($event, item, i)" @mouseleave="ratingOff()" v-bind:style="fillSVG(i)" height="18" width="18" :id="'rate_'+ (i+1)" >
              <circle cx="12" cy="11" r="10" stroke="" stroke-width="2" fill="" />
            </svg>
            <div v-if="i < totalRatingAmount -1" class="circle-line"></div>
            <div class="kai-rating-block">
              <span v-if="useValue && (i == 0 || i == totalRatingAmount - 1)">{{item.value}}</span>
              <span v-if="!useValue">{{item.label}}</span>
            </div>
          </div>
          <div v-if="this.ratingIcon === 'circle' && isDisable"  class="svg-disabled-overlay">
            <div class="rating-wrapper" v-for="(item, j) in this.response.default.payload.options" :key="j">
              <svg height="18" width="18" >
                <circle cx="12" cy="11" r="10" stroke="" stroke-width="2" fill="" />
              </svg>
              <div v-if="j < totalRatingAmount -1" class="circle-line"></div>
            </div>
          </div>
        </div>

        <!-- STAR RATING -->
        <div v-if="this.ratingIcon === 'star'">
          <div class="rating-wrapper" tabindex="-1" navLvl="1" navDir="horizontal" v-on:click="submitRatingMultiple($event, item, i)" v-for="(item, i) in this.response.default.payload.options" :key="i" >
          <svg @mouseover="ratingOn($event, item, i)" @mouseleave="ratingOff()" v-bind:style="fillSVG(i)" width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="-40 -40 80 80">
            <path
                stroke-width="4"
                d="M 0.000 20.000 L 23.511 32.361 L 19.021 6.180 L 38.042 -12.361 L 11.756 -16.180 L 0.000 -40.000 L -11.756 -16.180 L -38.042 -12.361 L -19.021 6.180 L -23.511 32.361 L 0.000 20.000 "/>
          </svg>
          <div class="kai-rating-block">
            <span v-if="useValue && (i == 0 || i == totalRatingAmount - 1)">{{item.value}}</span>
            <span v-if="!useValue">{{item.label}}</span>
          </div>
          </div>
          <div v-if="this.ratingIcon === 'star' && isDisable" class="svg-disabled-overlay">
            <svg v-for="(item, j) in this.response.default.payload.options" :key="j" width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="-40 -40 80 80">
              <path
                  stroke-width="4"
                  d="M 0.000 20.000 L 23.511 32.361 L 19.021 6.180 L 38.042 -12.361 L 11.756 -16.180 L 0.000 -40.000 L -11.756 -16.180 L -38.042 -12.361 L -19.021 6.180 L -23.511 32.361 L 0.000 20.000 "/>
            </svg>
          </div>
        </div>
      </div>
    </div>

  </section>
</template>

<script>
import SelectRatingMixin from './Mixin/SelectRatingMixin'

export default {
  name: 'RatingMultiple',
  props: ['response'],
  components: {

  },
  computed: {
    useValue () {
      const previousLabel = this.response.default.payload.options[0].label
      let isAlwaysSameLabel = true
      for (var i = 0; i < this.response.default.payload.options.length; i++) {
        if (previousLabel !== this.response.default.payload.options[i].label) {
          isAlwaysSameLabel = false
        }
      }
      return (isAlwaysSameLabel || this.useStar)
    },
    useStar () {
      let allLabelsHaveStars = true
      for (var i = 0; i < this.response.default.payload.options.length; i++) {
        const hasOnlyStars = new RegExp('^[⭐⭐]+$').test(this.response.default.payload.options[i].label)
        if (!hasOnlyStars) {
          allLabelsHaveStars = false
        }
      }
      return allLabelsHaveStars
    },
    ratingIcon () {
      return this.useStar ? 'star' : $store.state.rating.type
    }

  },
  methods: {
    fillSVG (index) {
      if (index <= this.currentSelectIndex) {
        return { fill: 'var(--primary-action-color)' }
      }
    },
    ratingOn: function ($event, item, i) {
      this.currentSelectIndex = i
    },
    ratingOff: function () {
      if (this.ratingSet === false) {
        this.currentSelectIndex = -1
      }
    }
  },
  data () {
    return {
      totalRatingAmount: this.response.default.payload.options.length,
      currentSelectIndex: -1,
      isDisable: false,
      ratingSet: false
    }
  },
  mixins: [
    SelectRatingMixin
  ]
}
</script>

<style>

.kai-rating-five-container {
    position: relative;
    margin: 0px 0 0px 50px;
    display: flex;
    justify-content: flex-start;
    margin: 20px 0 30px 0;
}

.rating-wrapper {
  float: left;
  position: relative;
}

.kai-rating-five-container svg {
  margin: 5px;
  fill:transparent;
  stroke:var(--primary-action-color);
  cursor: pointer;
  cursor: hand;
}

.kai-rating-five-container svg:hover {
  fill:var(--primary-action-color);
}

.kai-rating-five-count {
    padding: 10px 0 20px 44px;
    display: flex;
    justify-content: flex-start;
    clear: both;

}

.kai-rating-five-count span{
    margin: 13px;
}

.kai-rating-icon-wrapper {
  padding: 0px 0 20px 48px;
    display: flex;
    justify-content: flex-start;
    clear: both;
}

.rating-icon {
  padding: 7px;
}

.kai-rating-block {
      position: absolute;
    text-align: center;
    /* margin-left: -10px; */
    top:26px;
    left: 0;
    right: 0;
    overflow: overlay;
    overflow-wrap: break-word;
    display: none;
}

.kai-rating-block:first-child {
  visibility:visible;
  margin-left: 4px;
}

/*
.kai-rating-block:nth-child(4n-7) {
    visibility:visible;
}
*/

.circle-line {
    height: 2px;
    width: 10px;
    /* padding: 5px; */
    margin: 0 10px 0 29px;
    top: 16px;
    position: absolute;
    background-color:var(--primary-action-color);

}

.kai-rating-five-container .svg-disabled-overlay {
  position: absolute;
  top: 0;
  /*left: 0;*/
  width: calc(100% + 2px);
  height: 100%;
  z-index: 10;
}

.kai-rating-five-container .svg-disabled-overlay svg {
  fill: rgba(255, 253, 253, 0.5);
  stroke: rgba(255, 253, 253, 0.5);
}

.svg-disabled-overlay .circle-line {
  background-color:  rgba(255, 253, 253, 0.5);
}
svg:focus {
  outline: none;
  box-shadow: none;
}

.rate-title {
    font-size: 11px;
    margin-top: 7px;
    margin-right: 10px;
    font-weight: bold;
    color: #999;
    margin-left: 20px;
}

.kai-rating-five-container:focus, .rating-wrapper:focus {
    outline: none;
    box-shadow: 0 0 5px 3px var(--primary-action-color);
}

</style>

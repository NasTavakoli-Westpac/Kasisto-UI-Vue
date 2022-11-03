module.exports = {
  mounted () {
    // we need to force update when view is just mounted to calculate itemsWidth, maxTranslateX based on the actual size of each quick reply item
    this.forceUpdate = true
    this.$forceUpdate()
    this.$nextTick().then(() => {
      this.$nextTick().then(() => {
        // need to wait for 2 nextTick in order for the Expand button to be rendered
        if (!this.forceUpdate) {
          this.updateItemsFocusability()
        }
      })
    })
  },
  computed: {
    transformCarousel: function () {
      return { '--carousel_translate': 'translateX' + '(' + this.currentOffset + 'px' + ')' }
    },
    itemsWidth () {
      // eslint-disable-next-line no-unused-vars
      const dummy = this.forceUpdate
      this.forceUpdate = false
      var array = []

      if (this.$refs && this.$refs.item && this.$refs.item.length) {
        for (var i = 0; i < this.cardItems.length; i++) {
          // Check for chip panel
          if (this.$refs.chipComponentRef) {
            if (this.$refs.item[i]) {
              array.push(this.$refs.item[i].scrollWidth)
            } else {
              array.push(this.$refs.item[i - 1].scrollWidth)
            }
          } else {
            if (this.$refs.item[i].$el) {
              array.push(this.$refs.item[i].$el.scrollWidth)
            } else {
              array.push(this.$refs.item[i].scrollWidth)
            }
          }
        }
      }

      // if carousel template is mounted before Webview Widget is opened each item in itemsWidth will be 0 
      // and we need to attempt the calculation again until the widget is opened and size is different from 0
      if (array.filter((item) => item!=0).length == 0 ) {
       setTimeout(() => {
          this.forceUpdate = true
          this.$forceUpdate()
        }, 500)
      }

      return array
    },
    marginBetweenCards () {
      // eslint-disable-next-line no-unused-vars
      const dummy = this.forceUpdate
      var totalItemsWidth = 0
      for (var i = 0; i < this.itemsWidth.length; i++) {
        totalItemsWidth += this.itemsWidth[i]
      }
      return (this.$refs.carousel.scrollWidth - totalItemsWidth) / this.cardItems.length
    },
    maxTranslateX () {
      // eslint-disable-next-line no-unused-vars
      const dummy = this.forceUpdate
      // if (!this.randomCardWith) {
      //     return -this.itemsWidth * (this.cardItems.length - 1)
      // } else {
      if (this.$refs.carousel) {
        return -1 * (this.$refs.carousel.scrollWidth - this.itemsWidth[this.cardItems.length - 1] - this.marginBetweenCards)
      }
      // }
    },
    minTranslateX () {
      return 0
    },
    atEndOfList () {
      return this.currentOffset <= this.maxTranslateX
    },

    atHeadOfList () {
      return this.currentOffset >= this.minTranslateX
    }
  },
  methods: {
    calculateAbsoluteOffset (index) {
      var tempOffset = 0
      for (var i = 0; i < index; i++) {
        tempOffset += this.itemsWidth[i] + this.marginBetweenCards
      }
      return tempOffset
    },
    moveCarouselToItem (index) {
      if (index >= 0 && index < this.cardItems.length) {
        this.currentOffset = -1 * this.calculateAbsoluteOffset(index)
        this.currentIndex = index
        // update referenceOffset value as it need to stay up to date for the next time user initiate a pan gesture
        this.referenceOffset = this.currentOffset
        this.updateItemsFocusability()
      }
    },
    updateItemsFocusability () {
      // make elements with attribute 'navLvl' of the currentIndex item focusable by adding the attribute tabindex for KeyboardNavigationMixin.js
      if (this.$refs === undefined || this.$refs.item === undefined) {
        return
      }
      if (this.$refs.item[this.currentIndex].$el) {
        if (this.$refs.item[this.currentIndex].$el.hasAttribute('navLvl') && this.$refs.item[this.currentIndex].$el.getAttribute('navLvl') > 0) {
          this.$refs.item[this.currentIndex].$el.setAttribute('tabindex', '0')
        }
        this.$refs.item[this.currentIndex].$el.querySelectorAll('[navLvl]').forEach(function (el) {
          if (el.getAttribute('navLvl') > 0) {
            el.setAttribute('tabindex', '0')
          }
        })
        // remove the tabindex attribute for other item elements with navLvl attribute
        for (var i = 0; i < this.cardItems.length; i++) {
          if (i !== this.currentIndex) {
            if (this.$refs.item[i].$el.hasAttribute('navLvl')) {
              this.$refs.item[i].$el.removeAttribute('tabindex')
            }
            this.$refs.item[i].$el.querySelectorAll('[navLvl]').forEach(function (el) {
              el.removeAttribute('tabindex')
            })
          }
        }
      } else {
        if (this.$refs.item[this.currentIndex].hasAttribute('navLvl') && this.$refs.item[this.currentIndex].getAttribute('navLvl') > 0) {
          this.$refs.item[this.currentIndex].setAttribute('tabindex', '0')
        }
        this.$refs.item[this.currentIndex].querySelectorAll('[navLvl]').forEach(function (el) {
          if (el.getAttribute('navLvl') > 0) {
            el.setAttribute('tabindex', '0')
          }
        })
        // remove the tabindex attribute for other item elements with navLvl attribute
        for (var j = 0; j < this.cardItems.length; j++) {
          if (j !== this.currentIndex) {
            if (this.$refs.item[j].hasAttribute('navLvl')) {
              this.$refs.item[j].removeAttribute('tabindex')
            }
            this.$refs.item[j].querySelectorAll('[navLvl]').forEach(function (el) {
              el.removeAttribute('tabindex')
            })
          }
        }
      }
    },
    activateScroll (e) {
      if (Math.sqrt(Math.pow((e.deltaX - this.previousDeltaX), 2)) < 2 * Math.sqrt(Math.pow((e.deltaY - this.previousDeltaY), 2))) {
        // if user scrolling intention is not clearly in an horizontal direction, then don't move the carousel.
        this.previousDeltaX = e.deltaX
        this.previousDeltaY = e.deltaY
        return
      }
      this.onPanStarted = true
      if (e.isFinal) {
        this.currentOffset = this.referenceOffset + e.deltaX + e.deltaX * window.$store.getters.getCarouselHorizontalScrollingAccelerationFactor * Math.abs(e.velocityX)
      } else {
        this.currentOffset = this.referenceOffset + e.deltaX
      }
      var closestItem = 0

      // console.log('checkpoint 1 - overallVelocityX', Math.abs(e.overallVelocityX))
      // console.log('checkpoint 2 - velocityX', Math.abs(e.velocityX))
      // console.log('checkpoint 3 - calculated 1 - this.currentOffset', this.currentOffset)
      for (var i = 0; i < this.cardItems.length - 1; i++) {
        var thisIndexOffset = -1 * this.calculateAbsoluteOffset(i)
        var nextIndexOffset = -1 * this.calculateAbsoluteOffset(i + 1)
        if (Math.sqrt(Math.pow((this.currentOffset - thisIndexOffset), 2)) <= Math.sqrt(Math.pow((this.currentOffset - nextIndexOffset), 2))) {
          closestItem = i
          break
        } else {
          closestItem = i + 1
        }
      }

      // console.log('checkpoint 4 - calculated 2 - this.currentOffset', this.currentOffset)

      if (this.atEndOfList) {
        // console.log('checkpoint 5 - atEndOfList !!')
        closestItem = this.cardItems.length - 1
        if (e.isFinal) {
          // scroll back to last item
          // console.log('checkpoint 6 - atEndOfList && e.isFinal')
          this.currentOffset = this.maxTranslateX
        }
      } else if (this.atHeadOfList) {
        // console.log('checkpoint 7 - atHeadOfList !!')
        closestItem = 0
        if (e.isFinal) {
          // scroll back to first item
          // console.log('checkpoint 8 - atHeadOfList && e.isFinal')
          this.currentOffset = this.minTranslateX
        }
      } else {
        if (e.isFinal) {
          // scroll to closest item
          // this.moveCarouselToItem(closestItem)
        }
      }

      // update the currentIndex continuously to update the carousel pager
      this.currentIndex = closestItem

      // console.log('checkpoint 9 - onPan - this.currentOffset = ' + this.currentOffset)
      // console.log('checkpoint 10 - onPan - closestItem = ', closestItem)

      if (e.isFinal) {
        // update the referenceOffset once user finish the pan gesture,
        // as it is used as reference when user start another pan gesture
        // console.log('checkpoint 11 - isFinal - e.overallVelocityX', e.overallVelocityX)
        // console.log('checkpoint 12 - isFinal - this.referenceOffset', this.referenceOffset)
        // console.log('checkpoint 13 - isFinal - this.currentOffset', this.currentOffset)

        this.referenceOffset = this.currentOffset

        // when the pan gesture is finished we can allow the carousel to use transition effect with CSS,
        // but we can't allow when the pan gesture is ongoing as it impacts the performance really badly especially on FF
        this.onPanStarted = false

        this.updateItemsFocusability()
      }

      this.previousDeltaX = e.deltaX
      this.previousDeltaY = e.deltaY
    },
    onPanEnd (e) {
      // On touch release check for animated scroll
      this.isScrollFreeEase = true
      this.activateScroll(e)
    },
    onPan (e) {
      // On touch down default scroll no animation
      this.isScrollFreeEase = false
      this.activateScroll(e)
    }
  }
}

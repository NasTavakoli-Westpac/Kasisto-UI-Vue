module.exports = {
  mounted () {
    var _this = this
    document.addEventListener('keydown', function (event) {
      const element = document.activeElement

      switch (event.key) {
        case 'Down':
        case 'ArrowDown':
          _this.next('vertical', element)
          break
        case 'Up':
        case 'ArrowUp':
          _this.previous('vertical', element)
          break
        case 'Left':
        case 'ArrowLeft':
          _this.previous('horizontal', element)
          break
        case 'Right':
        case 'ArrowRight':
          _this.next('horizontal', element)
          break
        case 'Enter':
          _this.performClick(element)
          break
        case 'Esc':
        case 'Escape':
          if ($store.state.useWidgetMode && $store.state.showWebviewWidget) {
            document.getElementsByClassName('minimize-webview')[0].focus()
          }
          break
        default:
      }
    })
  },
  methods: {

    next (keyDir, element) {
      if (this.isCustomContainer(element)) {
        if (element.hasAttribute('navDir') && (element.getAttribute('navDir') === keyDir || element.getAttribute('navDir') === 'both')) {
          this.moveToNextSibling(element, 1)
        } else {
          this.moveToFirstChild(element)
        }
      }
    },
    previous (keyDir, element) {
      if (this.isCustomContainer(element)) {
        if (element.hasAttribute('navDir') && (element.getAttribute('navDir') === keyDir || element.getAttribute('navDir') === 'both')) {
          this.moveToNextSibling(element, -1)
        } else {
          this.moveToFirstParent(element)
        }
      }
    },
    moveToNextSibling (element, increment) {
      // find parent having navLvl and navDir attribute
      var elementLevel = this.getLevel(element)
      var $elemParent = this.getNavParent(element, elementLevel)
      var refElement = this.$refs.carousel
      if (refElement === undefined) {
        refElement = this.$refs.listview
      }

      if ($elemParent.length > 0) {
        var $siblings = $elemParent.find('[navLvl="' + elementLevel + '"]')
        var siblingsIndex = this.getIndex(element, $siblings)
        if (siblingsIndex > -1) {
          var _this = this
          if (siblingsIndex + increment >= 0 && siblingsIndex + increment < $siblings.length) {
            if (this.$refs.carousel !== undefined && (refElement === $elemParent[0] || $elemParent[0].contains(refElement))) {
              this.moveCarouselToItem(siblingsIndex + increment)
            }
            setTimeout(function () {
              $siblings[siblingsIndex + increment].focus()
              if (elementLevel === '0') {
                _this.moveToFirstChild($siblings[siblingsIndex + increment])
              }
            }, 250)
          } else if (siblingsIndex + increment < 0) {
            if (this.$refs.carousel !== undefined && (refElement === $elemParent[0] || $elemParent[0].contains(refElement))) {
              this.moveCarouselToItem($siblings.length - 1)
            }
            setTimeout(function () {
              $siblings[$siblings.length - 1].focus()
              if (elementLevel === '0') {
                _this.moveToFirstChild($siblings[$siblings.length - 1])
              }
            }, 250)
          } else {
            if (this.$refs.carousel !== undefined && (refElement === $elemParent[0] || $elemParent[0].contains(refElement))) {
              this.moveCarouselToItem(0)
            }
            setTimeout(function () {
              $siblings[0].focus()
              if (elementLevel === '0') {
                _this.moveToFirstChild($siblings[0])
              }
            }, 250)
          }
        }
      }
    },
    moveToFirstChild (element) {
      if ($jq(element).find('[navLvl]').length > 0) {
        $jq(element).find('[navLvl]').first().focus()
      } else {
        var elementLevel = this.getLevel(element)
        var $elemParent = this.getNavParent(element, elementLevel)
        this.moveToNextSibling($elemParent[0], 1)
      }
    },
    moveToFirstParent (element) {
      var elementLevel = this.getLevel(element)
      var $elemParent = this.getNavParent(element, elementLevel)
      if ($elemParent.length > 0) {
        $elemParent.focus()
        if (this.getLevel($elemParent[0]) === '0') {
          this.moveToNextSibling($elemParent[0], -1)
        }
      }
    },
    performClick (element) {
      if (this.isCustomContainer(element)) {
        $jq(element).trigger('click')
      }
    },
    isCustomContainer (element) {
      var refElement
      if (this.$refs.carousel !== undefined) {
        refElement = this.$refs.carousel
        if (this.isInsideRefElement(element, refElement)) {
          return true
        }
      }
      if (this.$refs.listview !== undefined) {
        refElement = this.$refs.listview
        if (this.isInsideRefElement(element, refElement)) {
          return true
        }
      }
      if (this.$refs.keyboardWrapper !== undefined) {
        refElement = this.$refs.keyboardWrapper
        if (this.isInsideRefElement(element, refElement)) {
          return true
        }
      }
      if (this.$refs.navLeft !== undefined) {
        refElement = this.$refs.navLeft
        if (this.isInsideRefElement(element, refElement)) {
          return true
        }
      }
      if (this.$refs.navRight !== undefined) {
        refElement = this.$refs.navRight
        if (this.isInsideRefElement(element, refElement)) {
          return true
        }
      }
      return false
    },
    isInsideRefElement (element, ref) {
      if (ref !== undefined && element.hasAttribute('tabindex') && element.hasAttribute('navDir')) {
        if (element.contains(ref) || ref.contains(element)) {
          return true
        }
      }
      return false
    },
    getPathTo (element) {
      if (element.id !== '') { return 'id("' + element.id + '")' }
      if (element === document.body) { return element.tagName }

      var ix = 0
      var siblings = element.parentNode.childNodes
      for (var i = 0; i < siblings.length; i++) {
        var sibling = siblings[i]
        if (sibling === element) { return this.getPathTo(element.parentNode) + '/' + element.tagName + '[' + (ix + 1) + ']' }
        if (sibling.nodeType === 1 && sibling.tagName === element.tagName) { ix++ }
      }
    },
    getDepth (element, parentXPath) {
      var node = element
      var depth = 0
      while (this.getPathTo(node) !== parentXPath) {
        node = node.parentNode
        depth++
      }
      return depth
    },
    getLevel (element) {
      var elementLevel = -1
      if (element.hasAttribute('navLvl') && element.hasAttribute('navDir')) {
        elementLevel = element.getAttribute('navLvl')
      }
      return elementLevel
    },
    getNavParent (element, elementLevel) {
      var navParent = $jq(element).parent().closest('[navLvl="' + (elementLevel - 1).toString() + '"]')
      if (navParent.length === 0) {
        navParent = $jq(element).parent().closest('[navDir]')
      }
      return navParent
    },
    getIndex (element, $siblings) {
      for (var i = 0; i < $siblings.length; i++) {
        if ($jq(element)[0] === $siblings[i]) {
          return i
        }
      }
      return -1
    }
  }
}

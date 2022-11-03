<template>
<section v-if="$store.state.showShortCutMenu && this.shortcutJson" class="shortcut-container">
  <div class="shortcut-wrapper" navDir="horizontal" ref="keyboardWrapper">
    <div class="shortcut-handle" tabindex="0" navLvl="1" navDir="horizontal" v-on:click="toggleShortcutPanel()" :class="{anim:handleAnimating, shortcut_handle_open:shortcutPanelOpen}">
      <img v-if="shortcutPanelOpen" :src="this.rightArrowIcon" alt="" :style="this.extraStyle">
      <img v-else :src="this.leftArrowIcon" alt="" :style="this.extraStyle">
    </div>
    <div class="shortcut-content" :class="{shortcut_content_open:displayShortcutContent}" role="region" :aria-roledescription="screenReaderTranslations.shortcutMenu">
      <h1>
        <img aria-hidden="true" :src="this.heartIcon" alt=""> Shortcut Menu <i></i>
      </h1>
      <hr />
      <div class="" v-for="(shortcutItem, itemIndex) in  this.shortcutJson" :key="itemIndex">
        <div class="shortcut-header">{{shortcutItem.payload.title}}
          <span role="button" :aria-label="screenReaderTranslations.shortcutInfoButton" class="shortcut-info-btn mouse-pointer" v-on:click="shortcutInfoShow(shortcutItem.payload.title, shortcutItem.payload.subtitle)"><img :src="infoIcon" alt=""></span>
        </div>
        <div class="shortcut-item-wrapper">
          <div v-for="(shortcutList, itemIndex) in  shortcutItem.payload.buttons" :key="itemIndex">
            <div class="shortcut-item mouse-pointer" role="button" :aria-label="shortcutList.label" :tabindex="shortcutPanelOpen? '0': '-1'" navLvl="2" navDir="both" @click="sendShortcutItem(shortcutList)"> {{shortcutList.label}}</div>
          </div>
        </div>
        <div class="clear-it"></div>
      </div>

    </div>

  </div>
  <modal name="shortcut-modal" :adaptive="true" :maxWidth="400" :maxHeight="145">
    <div class="close-modal mouse-pointer" @click="closeModal()">X</div>
    <div class="shortcut-content-header">{{shortcutHeader}}</div>
    <div class="shortcut-content shortcut-content-inner">
      <p>{{shortcutInfo}}</p>
    </div>
  </modal>
</section>
</template>

<script>
import './styles/ShortcutPanel.less'
import KeyboardNavigationMixin from './Mixin/KeyboardNavigationMixin'
import ImageUtilityMixin from './Mixin/ImageUtilityMixin'
import Cookies from 'js-cookie'

export default {
  name: 'ShortcutPanel',
  props: [],
  data () {
    return {
      shortcutJson: false,
      shortcutInfo: '',
      shortcutHeader: '',
      shortcutPanelOpen: false,
      displayShortcutContent: false,
      rightArrowIcon: this.getImagePath('Hamburger.png'),
      leftArrowIcon: this.getImagePath('Hamburger.png'),
      heartIcon: this.getImagePath('svg/heart.svg'),
      infoIcon: this.getImagePath('svg/info_icon.svg'),
      extraStyle: 'width: 14.4px; top: calc(50% - 5.5px); left: 3px;',
      handleAnimating: false,
      animationTimerDone: false,
      animationTimerHolder: false,
      screenReaderTranslations: $store.getters.getBotLanguages.translations.screenReader
    }
  },
  mounted () {},
  computed: { // Listen to see if store state change
    updateShortcutMenu () {
      return this.$store.getters.getShortcutPayload
    },
    updateShortcutIcon () {
      return this.$store.getters.getShortcutIcon
    },
    isLiveChatStarted () {
      return this.$store.getters.isLiveChatStarted
    }
  },
  watch: {
    updateShortcutMenu () {
      this.shortcutJson = this.$store.getters.getShortcutPayload.message_contents
      this.triggerAnimationTimer(5000)
    },
    updateShortcutIcon () {
      var icon = this.$store.getters.getShortcutIcon.toUpperCase()
      this.stopArrowAnim()
      if (icon === 'ARROW') {
        this.rightArrowIcon = this.getImagePath('panel-right-arrow.png')
        this.leftArrowIcon = this.getImagePath('panel-left-arrow.png')
        this.extraStyle = ''
      }
      if (icon === 'ARROW_ANIMATE' || icon === 'HANDLE_ANIMATE') {
        this.rightArrowIcon = this.getImagePath('panel-right-arrow.png')
        this.leftArrowIcon = this.getImagePath('panel-left-arrow.png')
        this.extraStyle = ''
        this.animationTimerDone = false
        this.triggerAnimationTimer(5000)
      }
      if (icon === 'HEART') {
        this.rightArrowIcon = this.getImagePath('svg/heart.svg')
        this.leftArrowIcon = this.getImagePath('svg/heart.svg')
        this.extraStyle = 'width: 80%;left: 2px;top: calc(50% - 7.5px);'
      }
      if (icon === 'HEART_HAMBURGER') {
        this.rightArrowIcon = this.getImagePath('Heart.png')
        this.leftArrowIcon = this.getImagePath('Heart.png')
        this.extraStyle = 'width: 82%; left: 2.5px; top: calc(50% - 7.5px);'
      }
      if (icon === 'HEART_MENU') {
        this.rightArrowIcon = this.getImagePath('Heart_Menu.png')
        this.leftArrowIcon = this.getImagePath('Heart_Menu.png')
        this.extraStyle = 'width: 72%; top: calc(50% - 5.5px); left: 3px;'
      }
      if (icon === 'HAMBURGER') {
        this.rightArrowIcon = this.getImagePath('Hamburger.png')
        this.leftArrowIcon = this.getImagePath('Hamburger.png')
        this.extraStyle = 'width: 72%; top: calc(50% - 5.5px); left: 3px;'
      }
      if (icon === 'HAMBURGER_ANIMATE') {
        this.rightArrowIcon = this.getImagePath('Hamburger.png')
        this.leftArrowIcon = this.getImagePath('Hamburger.png')
        this.extraStyle = 'width: 14.4px; top: calc(50% - 5.5px); left: 3px;'
        this.animationTimerDone = false
        this.triggerAnimationTimer(5000)
      }
    },
    isLiveChatStarted() {
      if ($store.getters.isLiveChatStarted) {
        this.hideHandleAnim()
      } else {
        this.showHandleAnim()
        this.triggerAnimationTimer(5000)
      }
    }
  },
  methods: {

    toggleShortcutPanel: function () {
      // let btn = document.querySelector('button');
      this.stopArrowAnim()
      const slideinPanel = document.querySelector('.shortcut-wrapper')
      slideinPanel.classList.toggle('shortcut-open')
      // console.log('slideinPanel.classList', slideinPanel.classList)
      if (slideinPanel.classList.contains('shortcut-open')) {
        this.shortcutPanelOpen = true
        this.displayShortcutContent = true
        this.animationTimerDone = true
        Cookies.set('k_shortcut_panel_opened', true)
      } else {
        this.shortcutPanelOpen = false
        // wait 500ms before setting displayShortcutContent to false,
        // (it's the time for CSS transition defined in the class .shortcut-wrapper in ShortcutPanel.less to end)
        setTimeout(()=>{this.displayShortcutContent=false}, 500)
        this.startArrowAnim()
      }
    },
    closeShortcutPanel () {
      this.stopArrowAnim()
      const slideinPanel = document.querySelector('.shortcut-wrapper')
      slideinPanel.classList.remove('shortcut-open')
      this.shortcutPanelOpen = false
      this.startArrowAnim()
    },
    sendShortcutItem: function (shortcutItem) {
      Kai.Core.buttonPressed(shortcutItem)
      this.toggleShortcutPanel()
    },
    shortcutInfoShow (header, listinfo) {
      // Load content data
      this.shortcutHeader = header
      this.shortcutInfo = listinfo
      this.$modal.show('shortcut-modal')
    },
    shortcutInfohide (listinfo) {
      // Clear modal content
      this.shortcutHeader = ''
      this.shortcutInfo = ''
      this.$modal.hide('shortcut-modal')
    },
    closeModal () {
      this.$modal.hide('shortcut-modal')
    },
    startArrowAnim () {
      this.stopArrowAnim()
      if (!this.animationTimerDone) {
        if (this.$store.getters.getShortcutIcon.toUpperCase() === 'ARROW_ANIMATE') {
          const $arrow = document.querySelector('.shortcut-handle img')

          $arrow.animate([{
            left: '5px'
          },
          {
            left: '2.5px'
          },
          {
            left: '5px'
          },
          {
            left: '5px'
          },
          {
            left: '5px'
          },
          {
            left: '5px'
          },
          {
            left: '5px'
          }
          ], {
            duration: 2000,
            iterations: 2
          })
        }
        if (this.$store.getters.getShortcutIcon.toUpperCase() === 'HAMBURGER_ANIMATE' ||
          this.$store.getters.getShortcutIcon.toUpperCase() === 'HANDLE_ANIMATE') {
          this.handleAnimating = true
          const $handle = document.querySelector('.shortcut-handle')

          $handle.animate([{
            left: 'calc(0% - 20px)'
          },
          {
            left: 'calc(0% - 25px)'
          },
          {
            left: 'calc(0% - 20px)'
          },
          {
            left: 'calc(0% - 20px)'
          },
          {
            left: 'calc(0% - 20px)'
          },
          {
            left: 'calc(0% - 20px)'
          },
          {
            left: 'calc(0% - 20px)'
          },
          {
            left: 'calc(0% - 20px)'
          },
          {
            left: 'calc(0% - 20px)'
          },
          {
            left: 'calc(0% - 20px)'
          }
          ], {
            duration: 2000,
            iterations: 2
          })
        }
      }
    },
    stopArrowAnim () {
      this.handleAnimating = false
      var arrow = document.querySelector('.shortcut-handle')
      var animation = arrow.getAnimations()
      if (animation.length > 0) {
        animation[0].cancel()
      }
      arrow = document.querySelector('.shortcut-handle img')
      animation = arrow.getAnimations()
      if (animation.length > 0) {
        animation[0].cancel()
      }
    },
    triggerAnimationTimer (duration) {
      var panelOpened = Cookies.get('k_shortcut_panel_opened')
      if (!panelOpened && !this.animationTimerDone && this.shortcutJson) {
        var _this = this
        if (this.animationTimerHolder) {
          clearTimeout(this.animationTimerHolder)
        }
        this.animationTimerHolder = setTimeout(function () {
          if (!$store.getters.isLiveChatStarted) {
            _this.startArrowAnim()
            _this.triggerAnimationTimer(10000)
          }
        }, duration)
      }
    },
    hideHandleAnim () {
      this.closeShortcutPanel()
      this.stopArrowAnim()
      this.handleAnimating = true
      const $handle = document.querySelector('.shortcut-handle')

      $handle.animate([{
        left: 'calc(0% - 20px)'
      },
      {
        left: 'calc(0%)'
      }
      ], {
        duration: 1000,
        iterations: 1,
        fill: 'forwards'
      })
    },
    showHandleAnim () {
      this.stopArrowAnim()
      this.handleAnimating = true
      const $handle = document.querySelector('.shortcut-handle')

      $handle.animate([
      {
        left: 'calc(0%)'
      },
      {
        left: 'calc(0% - 20px)'
      }
      ], {
        duration: 1000,
        iterations: 1,
        fill: 'forwards'
      })
    }
  },
  mixins: [
    KeyboardNavigationMixin,
    ImageUtilityMixin
  ]
}
</script>

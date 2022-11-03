<template>
<div v-if="this.webviewIsReady">
    <div class="theme-app" :class="{show:showThemeChanger}">
        <div id="webview-container" class="webview-container" role="main" :aria-roledescription="screenReaderTranslations.virtualAssistantDesignation + ' ' + screenReaderTranslations.chatArea" :class="{webview_container_widget:useWidgetMode, align_left:alignWidgetLeft}" v-show="this.showWidget">
            <SplashScreen v-if="showSplashScreen && showWidget"></SplashScreen>
            <HeaderBar v-if="!showSplashScreen && useHeaderBar && useAvatar && showWidget"></HeaderBar>
            <HeaderBarSmall v-if="!showSplashScreen && !useAvatar"></HeaderBarSmall>
            <Container v-show="!showSplashScreen"></Container>
            <QuickRepliesBar></QuickRepliesBar>
            <BottomBar v-if="!showSplashScreen" id="bottombar"></BottomBar>
            <ShortcutPanel :class="{shortcut_widget:useWidgetMode}"></ShortcutPanel>
        </div>
      <PoweredBySnippet v-if="useWidgetMode && showWidget" class="powered_by_kasisto"></PoweredBySnippet>
        <div navDir="horizontal">
          <div class="webview_widget_launcher" role="button" :aria-label="screenReaderTranslations.open + ' ' + screenReaderTranslations.virtualAssistantDesignation" tabindex="0" navLvl="1" navDir="horizontal" ref="keyboardWrapper" v-show="!this.showWidget" v-on:click="this.toggleWidgetDisplay">
              <img aria-hidden="true" class="webview_widget_icon" ondragstart="return false;">
          </div>
        </div>
    </div>
    <transition name="theme-editor-slide-fade" v-on:enter="moveWidget" v-on:after-leave="moveWidget">
        <div v-if="showThemeChanger" class="theme-editor" :class="{show:showThemeChanger}">
            <ThemeChanger></ThemeChanger>
        </div>
    </transition>
</div>
</template>

<script>
import Container from './core/components/Container'
import BottomBar from './core/components/BottomBar'
import ThemeChanger from './core/components/ThemeChanger'
import HeaderBar from './core/components/HeaderBar'
import HeaderBarSmall from './core/components/HeaderBarSmall'
import ShortcutPanel from './core/components/ShortcutPanel'
import QuickRepliesBar from './core/components/QuickRepliesBar'
import SplashScreen from './core/components/SplashScreen'
import PoweredBySnippet from './core/components/PoweredBySnippet'
import KeyboardNavigationMixin from './core/components/Mixin/KeyboardNavigationMixin'
import Cookies from 'js-cookie'

export default {
  name: 'App',
  components: {
    Container,
    BottomBar,
    ThemeChanger,
    HeaderBar,
    HeaderBarSmall,
    ShortcutPanel,
    QuickRepliesBar,
    SplashScreen,
    PoweredBySnippet
  },
  data () {
    return {
      showSplashScreen: false,
      alignWidgetLeft: false,
      screenReaderTranslations: $store.getters.getBotLanguages.translations.screenReader
    }
  },
  computed: {
    webviewIsReady () {
      return $store.state.webviewReady
    },
    widgetIconSrc () {
      if ($store.getters.isInlineImagesEnabled) {
        try {
          return require('@/assets/img/' + $store.getters.getBotWidgetIconInlineUrl)
        } catch (error) {
          return $store.getters.getBotWidgetIconInlineUrl
        }
      } else {
        return $store.state.botWidgetIconUrl
      }
    },
    useWidgetMode () {
      return $store.state.useWidgetMode
    },
    useHeaderBar () {
      return $store.state.useHeaderBar
    },
    useAvatar: function () {
      return $store.state.useAvatar
    },
    showThemeChanger () {
      return $store.state.showThemeChanger
    },
    showWidget () {
      return $store.state.showWebviewWidget || !this.useWidgetMode
    },
    isSplashScreenEnabled () {
      return $store.getters.isSplashScreenEnabled
    }
  },
  watch: {
    showWidget () {
      this.checkSplashScreenCookie()
    },
    isSplashScreenEnabled () {
      this.showSplashScreen = $store.getters.isSplashScreenEnabled
    }
  },
  mounted () {
    this.checkSplashScreenCookie()
    setTimeout(() => {
      const widgetLauncherIcon = document.getElementsByClassName('webview_widget_icon')[0]
      if (!$store.getters.isInlineImagesEnabled) {
        widgetLauncherIcon.addEventListener('error', () => this.onImageLoadError(this, widgetLauncherIcon))
      }
      widgetLauncherIcon.setAttribute('src', this.widgetIconSrc)
    }, 500)
  },
  methods: {
    toggleWidgetDisplay: function () {
      $store.state.showWebviewWidget = !$store.state.showWebviewWidget
    },
    moveWidget () {
      this.alignWidgetLeft = this.showThemeChanger
    },
    onImageLoadError (context, element) {
      // if an issue happened just try one more time to run the animation with backup logo
      element.removeEventListener('error', () => context.onImageLoadError(context, element))
      element.setAttribute('src', $store.getters.getBotWidgetIconBackupUrl)
    },
    checkSplashScreenCookie () {
      if ($store.getters.isSplashScreenEnabled) {
        const skipSplashScreen = Cookies.get('k_splashscreen_opened')

        if (!skipSplashScreen) {
          this.showSplashScreen = true
        } else {
          $store.state.useSplashScreen = false
          this.showSplashScreen = false
        }
      } else {
        $store.state.useSplashScreen = false
        this.showSplashScreen = false
      }
    }
  },
  mixins: [
    KeyboardNavigationMixin
  ]
}
</script>

<style>

@font-face {
font-family: 'Lato';
src: local("Lato"), url('~@/assets/fonts/Lato/Lato-Regular.ttf') format('truetype');
}

body {
    margin: 0;
}

#webview-container, .webview--app .dateCalendar-module {
    font-family: 'Lato', 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    box-shadow: 2px 2px 20px 0px rgb(0 0 0 / 15%);
}

.webview_container_widget{
  position: fixed;
  right: 30px;
  bottom: 30px;
  z-index: 100001;
  background: #fff;
  border-radius: 20px;
  height: calc(100% - var(--bottom-bar-height));
  width: 385px;
  overflow: hidden;
}
.webview_container_widget.align_left{
  left:30px;
}

.webview-container{
  height:  calc(100% - var(--bottom-bar-height));
}

@media only screen and (min-height: 750px) and (min-width: 435px) {
  .webview_container_widget {
    height: 680px;
  }

}

@media screen and (max-width: 435px) {
    .webview_container_widget {
        right: 0;
        bottom: 0;
        left: 0;
        display: block;
        border-radius: 0;
        height: 100%;
        width: 100%;
    }
    .webview_container_widget.align_left{
      left:0px;
    }
}

.webview_widget_launcher {
    position: absolute;
    right: 40px;
    bottom: 40px;
    cursor: pointer;
}

.webview_widget_launcher:focus{
  outline: none;
  box-shadow: 0 0 5px 3px var(--highlight-color);
  border-radius: 40px;
}

.webview_widget_launcher .webview_widget_icon {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    float: left;
    box-shadow: var(--shadow);
}

.theme-app {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #F4F4F4;

    transition: all .5s ease;
}

.theme-app.show {
    right: 300px;
    transition: all .5s ease;
}

@media screen and (max-width: 480px) {
  .__themeChanger {
   display: none;
  }

  .debug-box img {
    width: 30%;
 }
}

.theme-editor {
    position: absolute;
    top: 0;
    width: 0;
    right: 0;
    bottom: 0;
}

.theme-editor.show {
    width: 300px;
}

.theme-editor-slide-fade-enter-active {
    transition: all .5s ease;
}

.theme-editor-slide-fade-leave-active {
    transition: all .5s ease;
}

.theme-editor-slide-fade-enter,
.theme-editor-slide-fade-leave-to {
    transform: translateX(300px);
}

.powered_by_kasisto{
    position: fixed;
    right: 155.5px;
    bottom: 3px;
    z-index: 100001;
}
</style>

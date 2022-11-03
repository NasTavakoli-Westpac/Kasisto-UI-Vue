<template>
 <div class="kai-screen-intro">
    <div class="kai-circle"></div>
    <h1 class="introScreenTitle" placeholder="placeholder">{{this.translations.introScreen.introTitle}}</h1>
    <p class="introScreenMsg"  placeholder="placeholder">{{this.translations.introScreen.introMessage}}</p>
</div>
</template>

<script>
import { store } from '../../store/index'
import './styles/IntroScreen.less'

export default {
  name: 'IntroScreen',
  data () {
    return {
      translations: store.getters.getBotLanguages.translations,
      placeholder: store.getters.getBotLanguages.translations.introScreen.introMessage
    }
  },
  methods: {
  }
}
</script>

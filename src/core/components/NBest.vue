<template>
<div id="nbest-container-float">
  <div class="nbest-inner-float" :style="componentWidth" tabindex="0">
    <div class="nbest-inner-title">
      {{ response.default.length }} {{ translations.relatedQuestionsTitle }}:
      <div class="nbest-title-btn-wrapper">
        <button class="nbest-title-btn" :class="showRelatedQuestionsArrow"
          @click="showRelatedQuestions = !showRelatedQuestions"
          @tap="showRelatedQuestions = !showRelatedQuestions" >
          <i></i>
        </button>
      </div>
    </div>
    <div class="nbest-inner-item" v-for="(question, index) in this.response.default" :key="index" v-show="showRelatedQuestions">
     <div class="nbest-inner-question">
      {{question.display_sentence}}
      </div>
      <div class="nbest-btn-wrapper" v-on:click="relatedQuestion(question)">
          <button :aria-label="translations.questionSelectButtonText" type="button" class="nbest-inner-btn"> {{ translations.questionSelectButtonText }} </button>
      </div>

     </div>
  </div>
</div>
</template>

<script>
import Kai from '../../kai'
import ImageUtilityMixin from './Mixin/ImageUtilityMixin'
import './styles/NBest.less'

export default {
  name: 'NBest',
  mixins: [
    ImageUtilityMixin
  ],
  data () {
    return {
      response: this.$slots,
      showRelatedQuestions: true,
      arrowIcon: this.getImagePath('svg/Arrow_carousel.svg'),
      translations: {
        relatedQuestionsTitle: window.$store.getters.getBotLanguages.translations.nBest.relatedQuestionsTitle,
        questionSelectButtonText: window.$store.getters.getBotLanguages.translations.nBest.questionSelectButtonText
      }
    }
  },
  computed: {
    showRelatedQuestionsArrow () {
      if (this.showRelatedQuestions) {
        return 'up-arrow'
      } else {
        return 'down-arrow'
      }
    },
    componentWidth () {
      if (this.response.default.length === 0) {
        return { width: 'auto' }
      } else {
        return { width: '100%' }
      }
    }
  },
  methods: {
    relatedQuestion: function (question) {
      var message = {}
      if (Kai.API.isApiVersionAtLeast(3.2) && question.payload) {
        message.payload = question.payload
      }
      if (question.question) {
        message.label = question.question
      } else if (question.display_sentence) {
        message.label = question.display_sentence
      }

      // var paylaod
      // if (question.question_id) {
      //   payload = question.question_id
      // } else if (question.intent_name) {
      //   payload = question.intent_name
      // }

      // post back
      Kai.Core.postBackMessage(message, false)
    }
  }
}
</script>

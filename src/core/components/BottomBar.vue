<template>
<div class="kai-bottom-bar">
  <transition name="recording-fade">
    <div v-if="!speechRecognitionStarted" class="kai-textarea" :class="{widget:useWidgetMode}">
      <textarea class="kai-input-prompt" tabindex="0" v-on:keyup="inputMessageChange" v-on:keydown.enter="sendMessage" v-model="userRequest.message" :placeholder="inputPlaceHolder" :aria-label="inputPlaceHolder"></textarea>
    </div>
  </transition>

  <transition name="recording-translate">
      <div v-if="speechRecognitionStarted" class="speech-recording">
        <img :src="this.micIconRed" alt="">
      </div>
  </transition>

  <span v-if="speechRecognitionStarted" class="recording-timer">
    {{timer}}
  </span>

  <div v-if="!useSpeechRecognition || speechRecognitionUrl === undefined || userRequest.message !== '' || chipItemLength > 0" class="kai-send-wrapper" :class="{widget:useWidgetMode}">
    <!-- v-on:click="sendMessage" -->
    <button v-on:click="sendMessage" class="kai-send-button" :aria-label="translations.sendMessageButton" tabindex="0">
      <img :src="this.sendIcon" alt="">
    </button>
  </div>
  <div v-else class="kai-send-wrapper" :class="{widget:useWidgetMode, speech:speechRecognitionStarted}">
    <button v-longpress="startSpeechRecognition" v-longpressup="stopRecording" v-tap="showSpeechHint" v-panend="stopRecording" class="kai-send-button" :aria-label="translations.screenReader.speechRecognitionButton" tabindex="0">
      <img :src="this.micIcon" alt="">
    </button>
  </div>
</div>
</template>

<script>
import Vue from 'vue'
import {
  isMobile
} from 'mobile-device-detect'
import Kai from '../../kai'
import './styles/BottomBar.less'
import KeyboardNavigationMixin from './Mixin/KeyboardNavigationMixin'
import ImageUtilityMixin from './Mixin/ImageUtilityMixin'
import {
  store
} from '../../store/index'
import Bloodhound from 'typeahead.js'

import TextBubble from './TextBubble'
import avatarVoice1StartJsonData from '../../debug/avatar_hd_voice1start.json'
import avatarVoice2LoopJsonData from '../../debug/avatar_hd_voice2loop.json'
import avatarVoice3EndJsonData from '../../debug/avatar_hd_voice3end.json'

Vue.directive('longpress', {
  bind: function (el, binding) {
    if (typeof binding.value === 'function') {
      var manager = new Hammer.Manager(el)

      // Create a recognizer
      var Press = new Hammer.Press({
        time: $store.state.longPressButtonTime
      })

      // Add the recognizer to the manager
      manager.add(Press)
      manager.on('press', binding.value)
    }
  }
})

Vue.directive('longpressup', {
  bind: function (el, binding) {
    if (typeof binding.value === 'function') {
      var mc = new Hammer(el)
      mc.on('pressup', binding.value)
    }
  }
})

Vue.directive('panend', {
  bind: function (el, binding) {
    if (typeof binding.value === 'function') {
      var mc = new Hammer(el)
      mc.on('panend', binding.value)
    }
  }
})

Vue.directive('tap', {
  bind: function (el, binding) {
    if (typeof binding.value === 'function') {
      const mc = new Hammer(el)
      mc.on('tap', binding.value)
    }
  }
})

export default {
  name: 'BottomBar',
  templateOverride: '#bottombar-override',
  mounted () {
    var _this = this
    let start, stop
    if ($store.state.useAutocomplete && $store.state.autocompleteSettings.url) {
      var autocompleteResults = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.whitespace,
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        prefetch: $store.state.autocompleteSettings.prefetchedData === undefined
          ? undefined
          : {
            // url points to a (local) json file that contains an array of most common sentences, see
            // https://github.com/twitter/typeahead.js/blob/gh-pages/data/countries.json
            url: $store.state.autocompleteSettings.prefetchedData,
            cache: $store.state.autocompleteSettings.useLocalCache,
            transform: function (response) {
              return [...new Set([...response.display_sentences, ...response.seeds])]
            }
          },
        remote: {
          url: $store.state.autocompleteSettings.url,
          rateLimitBy: $store.state.autocompleteSettings.serverLimitType, // 'debounce' or 'throttle'
          rateLimitWait: $store.state.autocompleteSettings.serverLimitDelay, // ms
          prepare: function (query, settings) {
            if (!$store.getters.isLiveChatStarted) {
              start = window.performance.now()
              return Kai.API.autoCompleteRequest(settings, query)
            }
          },
          transform: function (response) {
            if (!$store.getters.isLiveChatStarted) {
              stop = window.performance.now()
              if ($store.state.debug) {
                console.log(`call length: ${stop - start} ms`)
              }
              return response.suggestions
            }
          }
        }
      })
      $jq('.kai-input-prompt').typeahead({
        minLength: $store.state.autocompleteSettings.characterCountBeforeStart,
        highlight: $store.state.autocompleteSettings.highlightTyped
      }, {
        async: true,
        limit: $store.state.autocompleteSettings.suggestionCount,
        name: 'autocompleteResults',
        source: autocompleteResults
      }).bind('typeahead:autocompleted', function (obj, datum, name) {
        // tab key
        _this.userRequest.message = datum
      }).bind('typeahead:select', function (obj, datum, name) {
        // user click
        _this.userRequest.message = datum
        _this.sendMessage(obj)
      }).bind('typeahead:cursorchange', function (obj, datum, name) {
        // up & down arrow keys
        if (datum !== undefined) {
          _this.userRequest.message = datum
        }
      })
    }
  },
  data () {
    return {
      selectedItemsIndex: store.state.selectedItemsIndex,
      translations: store.getters.getBotLanguages.translations, // Import language json
      userRequest: {
        message: ''
      },
      useSpeechRecognition: store.state.useSpeechRecognition,
      speechRecognitionUrl: ENV.SERVER_CONFIG.SPEECH_RECOGNITION_SERVER,
      speechRecognitionStarted: false,
      sendIcon: this.getImagePath('svg/Send_arrow.svg'),
      micIcon: this.getImagePath('svg/mic_white.svg'),
      micIconRed: this.getImagePath('svg/mic_red.svg'),
      timer: '00:00',
      timeBegan: null,
      timeStopped: null,
      stoppedDuration: 0,
      timerStarted: null,
      timerRunning: false,
      inputPlaceHolder: store.getters.getBotLanguages.translations.inputPlaceHolderMsg
    }
  },
  computed: {
    useWidgetMode () {
      return $store.state.useWidgetMode
    },
    chipItemLength: function () {
      return store.state.chipSelectedItem.length
    }
  },
  mixins: [
    KeyboardNavigationMixin,
    ImageUtilityMixin
  ],
  methods: {
    inputMessageChange: function () {
      this.updateUserTypingStatus()
    },
    updateUserTypingStatus: function () {
      if (this.userRequest.message && this.userRequest.message.length > 0) {
        if (!store.getters.isUserTyping) {
          store.dispatch('actionUserTyping', true)
          if (store.getters.isLiveChatStarted) {
            Kai.API.sendUserTypingStateToLiveChat()
          }
          Kai.API.passToNativeMethod('userTypingStart')
        }
      } else {
        if (store.getters.isUserTyping) {
          store.dispatch('actionUserTyping', false)
          if (store.getters.isLiveChatStarted) {
            Kai.API.sendUserTypingStateToLiveChat()
          }
          Kai.API.passToNativeMethod('userTypingEnd')
        }
      }
    },
    sendMessage: function (event) {
      event.preventDefault()
      var vm = this

      if (this.chipItemLength > 0) {
        store.dispatch('actionSendSelection', !$store.state.sendSelection)
        return false
      }

      // Remove script tag
      let cleanInputMessage = this.userRequest.message.replace(/<script[^>]*>(?:(?!<\/script>)[^])*<\/script>/g, '').replace(/<style[^>]*>(?:(?!<\/style>)[^])*<\/style>/g, '').replace(/alert\(['|"](.*)['|"]\);/gmi, '')
      // cleanInputMessage = cleanInputMessage.trim().toLowerCase().replace("\n","");
      cleanInputMessage = cleanInputMessage.trim().replace('\n', '')

      // If input field is empty
      if (cleanInputMessage === '') {
        return false
      }

      switch (cleanInputMessage) {
        case '__debug=true': {
          Kai.Core.debugMode(true)
          break
        }
        case '__debug=false': {
          Kai.Core.debugMode(false)
          break
        }
        case '__version': {
          Kai.Core.getVersion()
          vm.userRequest.message = ''
          break
        }
        case '__session_id': {
          Kai.Core.getSessionId()
          vm.userRequest.message = ''
          break
        }
        default: {
          Kai.Core.submitMessage(cleanInputMessage, function () {})
          break
        }
      }

      vm.userRequest.message = ''

      if ($store.state.useAutocomplete) {
        $jq('.kai-input-prompt').typeahead('val', '')
      }
      this.updateUserTypingStatus()
      if (isMobile) {
        // Only blur (hide keyboard) if detected as mobile device
        document.activeElement.blur()
        $jq('input').blur()
      }
    },
    startRecording: function (stream) {
      const _this = this
      const options = {
        mimeType: 'audio/webm'
      }
      const recordedChunks = []
      this.mediaRecorder = new MediaRecorder(stream, options)

      this.mediaRecorder.addEventListener('dataavailable', function (e) {
        if (e.data.size > 0) recordedChunks.push(e.data)
      })

      this.mediaRecorder.addEventListener('stop', function () {
        _this.speechRecognitionStarted = false
        const blob = new Blob(recordedChunks)
        const data = new FormData()
        data.append('content', blob)
        data.append('languageCode', _this.translations.speechToText.languageCode)
        data.append('enableAutomaticPunctuation', $store.state.speechRecognitionSettings.enableAutomaticPunctuation)
        data.append('enableWordConfidence', $store.state.speechRecognitionSettings.enableWordConfidence)
        fetch(_this.speechRecognitionUrl, {
          method: 'POST',
          body: data
        })
          .then(response => response.json())
          .then(result => {
            // console.log('Success:', result.recognizedSpeech);
            if (result.recognizedSpeech && result.recognizedSpeech !== '' && result.recognizedSpeech.transcription !== '') {
              const metaFields = []
              // TODO: consider removing this metaFields block once platform type VOICE is fully supported.
              metaFields.push({ key: 'voice', value: 'true' })
              if (result.recognizedSpeech.confidence) {
                metaFields.push({ key: 'voice confidence', value: result.recognizedSpeech.confidence })
              }
              if (result.recognizedSpeech.words) {
                metaFields.push({ key: 'voice words confidence', value: result.recognizedSpeech.words })
              }

              Kai.Core.submitMessage(result.recognizedSpeech.transcription, null, null, 'VOICE', metaFields)
              // TODO: pass result.recognizedSpeech.confidence in CAPI context.user.meta_fields
              // same for result.recognizedSpeech.words
            }
          })
          .catch(error => {
            console.error('Error: recognizeWebview', error)
          })
      })

      this.mediaRecorder.start()
      this.startTimer()
      $store.dispatch('actionAvatarUpdate', JSON.parse(JSON.stringify(avatarVoice1StartJsonData.message_contents[0].payload)))
      setTimeout(function () {
        // place the "voice loop" animation in the queue so it can be played as soon as the "voice start" animation is done.
        $store.dispatch('actionAvatarUpdate', JSON.parse(JSON.stringify(avatarVoice2LoopJsonData.message_contents[0].payload)))
      }, 500)
    },
    stopRecording: function () {
      if (this.speechRecognitionStarted && this.mediaRecorder.state !== 'inactive') {
        this.mediaRecorder.stop()

        if (!this.stream) return
        this.stream.getAudioTracks().forEach(function (track) {
          track.stop()
        })
        this.stream = false
      }
      this.stopTimer()
      this.resetTimer()
      $store.dispatch('actionAvatarUpdate', JSON.parse(JSON.stringify(avatarVoice3EndJsonData.message_contents[0].payload)))
    },
    accessMicrophone: function () {
      var _this = this
      if (navigator.mediaDevices !== undefined) {
        navigator.mediaDevices.getUserMedia({ audio: true, video: false })
          .then((stream) => {
            this.speechRecognitionStarted = true
            this.stream = stream
            this.startRecording(this.stream)
          }).catch(() => {
            Kai.Core.addMessageContent('kai-core-components', _this.translations.speechToText.microphoneAccessDeniedMsg, TextBubble, 'kai-left', true)
          })
      } else {
        Kai.Core.addMessageContent('kai-core-components', _this.translations.speechToText.microphoneUnavailableMsg, TextBubble, 'kai-left', true)
      }
    },
    startSpeechRecognition: function () {
      if (this.speechRecognitionUrl !== undefined && !this.speechRecognitionStarted) {
        // check if microphone permission has not been granted and display dialog message accordingly
        var _this = this
        if (navigator.permissions !== undefined) {
          navigator.permissions.query({ name: 'microphone' }).then(function (result) {
            if (result.state === 'granted' || result.state === 'prompt') {
              _this.accessMicrophone()
            // Consider adding here a modal dialog to explain why microphone permission is needed
            // } else if (result.state === 'prompt') {
            } else if (result.state === 'denied') {
              // TODO: modal dialog explaining micriphone permission has been denited.
              Kai.Core.addMessageContent('kai-core-components', _this.translations.speechToText.microphoneAccessDeniedMsg, TextBubble, 'kai-left', true)
            }
            result.onchange = function () {

            }
          })
        } else {
          // some browser like Safari doesn't support 'navigator.permissions' method
          // so we just proceed and try to access the Microphone anyway and see if an error is raised
          this.accessMicrophone()
        }
      }
    },
    showSpeechHint () {
      this.inputPlaceHolder = this.translations.speechToText.inputPlaceHolderHint
      setTimeout(() => {
        this.inputPlaceHolder = this.translations.inputPlaceHolderMsg
      }, 1500)
    },
    startTimer () {
      if (this.timerRunning) return

      if (this.timeBegan === null) {
        this.resetTimer()
        this.timeBegan = new Date()
      }

      if (this.timeStopped !== null) {
        this.stoppedDuration += (new Date() - this.timeStopped)
      }

      this.timerStarted = setInterval(this.clockRunning, 300)
      this.timerRunning = true
    },
    stopTimer () {
      this.timerRunning = false
      this.timeStopped = new Date()
      clearInterval(this.timerStarted)
    },
    resetTimer () {
      this.timerRunning = false
      clearInterval(this.timerStarted)
      this.stoppedDuration = 0
      this.timeBegan = null
      this.timeStopped = null
      this.timer = '00:00'
    },
    clockRunning () {
      var currentTime = new Date()
      var timeElapsed = new Date(currentTime - this.timeBegan - this.stoppedDuration)
      var min = timeElapsed.getUTCHours() * 60 + timeElapsed.getUTCMinutes()
      var sec = timeElapsed.getUTCSeconds()

      this.timer = this.zeroPrefix(min, 2) + ':' +
        this.zeroPrefix(sec, 2)
    },
    zeroPrefix (num, digit) {
      var zero = ''
      for (var i = 0; i < digit; i++) {
        zero += '0'
      }
      return (zero + num).slice(-digit)
    }
  }
}
</script>

<template>
<div class="row data-picker">
  <div class="col-sm-12 form-group">
    <div class="col-sm-12">
      <div class="form-group datepicker-container">
        <!--<span id="datepicker_target"></span> &nbsp;&nbsp;-->
        <input id="datepicker-input" type="text" value="" style='position:absolute;visibility:hidden;'>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Kai from '../../kai'
import ImageUtilityMixin from './Mixin/ImageUtilityMixin'
import {
  store
} from '../../store/index'
import './styles/DatePicker.less'

export default {
  name: 'DatePicker',
  mixins: [
    ImageUtilityMixin
  ],
  mounted: function () {
    var _this = this
    this.$nextTick(function () {
      $jq('#datepicker-input').datePickerTemp({
        additionalTarget: '#datepicker_target',
        fakeInput: false,
        format: store.getters.getDateInputFormat,
        datepicker: {
          defaultDateSelected: new Date()
        }
      })
      _this.triggerDatePicker()
      document.getElementsByClassName('dateCalendar-close')[0].addEventListener('click', function () {
        var dateSelected = $jq('#datepicker-input').val()
        Kai.Core.postBackMessage(dateSelected, false, 'DATE')
      })
    })
  },
  data: function () {
    return {
      translations: store.getters.getBotLanguages.translations, // Import language json
      calendarIcon: this.getImagePath('calendar-icon.png')
    }
  },
  methods: {
    triggerDatePicker: function () {
      $jq('#datepicker-input').trigger('click')
    }
  }
}
</script>

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { store } from './store/index'
import Kai from './kai.js'
import kserver from './kserver/kai.coreapi.js'
import jQuery from 'jquery'
import * as moment from 'moment'
import Hammer from './js/vendors/hammer.min.js'
import VModal from 'vue-js-modal'
Vue.use(VModal)

store.state.scriptSrc = document.currentScript ? document.currentScript.src : null

// window.ENV = APP_CONFIG;

window.Kai = Kai
window.kserver = kserver
window.$store = store
window.$jq = jQuery.noConflict(true);
window.moment = moment
window.Hammer = Hammer

// Require global style
require('./styles/defaultTheme.less')
// Location Picker for google maps
// require('./js/vendors/locationpicker.jquery.js')

// Datepicker
require('./core/components/plugin/components/TouchSwipe/jquery.touchSwipe.min.js')
require('./core/components/plugin/components/bootstrap-datepicker/js/bootstrap-datepicker.js')
require('./core/components/plugin/components/bootstrap-datepicker/css/bootstrap-datepicker3.min.css')
require('./core/components/plugin/components/datepicker-calendar/datepicker-calendar.css')
require('./core/components/plugin/components/datepicker-calendar/datepicker-calendar.js')

<template>
<div class="container">
    <!-- Modal -->
    <!-- Location picker Modal -->
    <div id="locationPickerModal" class="modal fade" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">{{this.translations.locationPicker.headerTitle}}</h4>
                    <button type="button" class="close" v-on:click="closeModal()">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="form-horizontal" style='width:100%;'>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">{{this.translations.locationPicker.inputLabel}}:</label>

                            <div class="col-sm-12">
                                <input type="text" class="form-control" id="us3-address" />
                            </div>
                        </div>
                        <div id="mapLocationPicker" style="width: 100%; height: 400px;"></div>
                        <input type="text" class="form-control" style="display:none;" id="us3-lat" />
                        <input type="text" class="form-control" style="display:none;" id="us3-lon" />
                        <div class="clearfix">&nbsp;</div>
                        <div class="clearfix"></div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button id="validatePosition" v-on:click="selectPosition()" type="button" class="btn btn-outline-secondary">{{this.translations.locationPicker.sendButton}}</button>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Kai from '../../kai'
import {
  store
} from '../../store/index'

export default {
  name: 'LocationMap',
  mounted: function () {
    require('../../js/vendors/locationpicker.jquery.js')
    var _this = this
    $jq(document).ready(function () {
      $jq('#locationPickerModal').addClass('show')
      $jq('#locationPickerModal').css('display', 'block')
      $jq('.webview--app').addClass('modal-open')
      $jq('#mapLocationPicker').locationpicker({
        enableAutocomplete: true,
        enableAutocompleteBlur: true,
        location: {
          latitude: _this.myDefaultLocation.coords.latitude,
          longitude: _this.myDefaultLocation.coords.longitude
        },
        radius: 1,
        zoom: _this.myDefaultLocation.zoom,
        inputBinding: {
          latitudeInput: $jq('#us3-lat'),
          longitudeInput: $jq('#us3-lon'),
          locationNameInput: $jq('#us3-address')
        },
        onchanged: function (currentLocation, radius, isMarkerDropped) {
          _this.selectLocation.coords.latitude = currentLocation.latitude
          _this.selectLocation.coords.longitude = currentLocation.longitude
        }
      })
    })
  },
  data () {
    return {
      translations: store.getters.getBotLanguages.translations, // Import language json
      myDefaultLocation: store.getters.getDefaultMapLocation,
      selectLocation: {
        coords: {
          latitude: null,
          longitude: null
        }
      }
    }
  },
  methods: {
    selectPosition: function () {
      if (this.selectLocation.coords.latitude) {
        Kai.Core.sendLocation(this.selectLocation)
      } else {
        Kai.Core.sendLocation(this.myDefaultLocation)
      }
      this.closeModal()
    },
    closeModal: () => {
      $jq('#locationPickerModal').removeClass('show')
      $jq('#locationPickerModal').css('display', 'none')
      $jq('.webview--app').removeClass('modal-open')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>

</style>

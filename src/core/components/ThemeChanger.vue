<template>
<div class="themeContainer">
    <div class="themeHeader">
        <div class="closeThemeToolbar" v-on:click="closeThemeToolbar()"><img :src="closeIcon"></div>

        <div class="webviewStyle"> </div>

        <div class="styleInput">
            <input id="updateVariableId" v-on:keyup="updateVariable" placeholder="">
            <!-- <input type="color" id="themeColorPicker" name="body" value="#f6b73c"> -->
            <p class="styleInfo">Enter #hexcode, color or RGB values to change styling</p>
        </div>
    </div>
    <div class="availableStylesContainer">
        <div v-show="this.showExport" id="exportLess" class="exportLessContainer">
            <h2 class="exportTitle">Export for Variables.less</h2>
            <textarea readonly="textarea" id="exportLessCode" class="exportLessCode"></textarea>
        </div>
        <ul class="styleNavContainer">
            <li class="styleList" v-for="(itemGroup, itemIndex) in  this.themeChangerJson.themeChanger" :key="itemIndex">
               <div class="themeListHeader">
                  {{itemGroup.section.header}}
                </div>
                  <ul>
                    <li v-for="(itemList, itemId) in itemGroup" :key="itemId" >
                       <div class="themeItemList" v-for="(title, titleId) in itemList.title" :key="titleId" v-on:click="selectItem(title)">
                           <div class="themeName">
                             {{title.name}}
                           </div>
                          <!-- If color code -->
                          <div class="themeColorBox" v-if="title.size === false" v-bind:style="{ 'background-color': 'var('+title.cssVariable+')' }">
                          </div>

                          <!-- If size code -->
                          <div class="themeSizeBox" v-if="title.size === true" :class="title.cssVariable"> {{getCssProperty(title.cssVariable)}} </div>
                          <div class="clear"></div>

                       </div>
                    </li>
                  </ul>
            </li>
        </ul>
    </div>
    <div class="exportContainer">
        <button class="btnRevert" v-on:click="reloadLess()">Revert</button>
        <button class="btnGenerate" v-on:click="exportLess()">Generate<div class="btnGenerateSmallCopy">.less file</div></button>
    </div>
</div>
</template>
<script>
import './styles/ThemeChanger.less'
import themeChangerJson from './../../json/theme.changer.json'
import ImageUtilityMixin from './Mixin/ImageUtilityMixin'
export default {
  mixins: [
    ImageUtilityMixin
  ],
  data: function () {
    // console.log("data was changed");
    return {
      themeQuerySelector: document.querySelector('.webview--app'),
      themeChangerJson: themeChangerJson,
      selectedThemeItem: {},
      resetThemeProperties: ['--main-background-color'],
      showExport: false,
      closeIcon: this.getImagePath('close-gray.png')
    }
  },
  mounted () {
    this.loadInitialLessVariables()
  },
  methods: {
    loadInitialLessVariables: function () {
      document.querySelector('.webviewStyle').innerHTML = this.themeChangerJson.themeChanger[3].section.title[0].name
      document.getElementById('updateVariableId').value = getComputedStyle(this.themeQuerySelector).getPropertyValue(this.themeChangerJson.themeChanger[3].section.title[0].cssVariable)
    },
    reset: function () {
      for (let i = 0; i < this.resetThemeProperties.length; i++) {
        // Reset properties css values
        document.getElementsByClassName('webview--app')[0].style.setProperty(this.resetThemeProperties[i], '')

        // Reset properties size html
        if (document.getElementsByClassName(this.resetThemeProperties[i])[0] !== undefined) {
          document.getElementsByClassName(this.resetThemeProperties[i])[0].innerHTML = getComputedStyle(this.themeQuerySelector).getPropertyValue(this.resetThemeProperties[i])
        }

        // Clear input value
        document.getElementById('updateVariableId').value = ''
      }
    },

    selectItem: function (obj) {
      this.selectedThemeItem = obj
      document.querySelector('.webviewStyle').innerHTML = this.selectedThemeItem.name
      document.getElementById('updateVariableId').value = getComputedStyle(this.themeQuerySelector).getPropertyValue(this.selectedThemeItem.cssVariable)
      this.resetThemeProperties.push(this.selectedThemeItem.cssVariable)
    },
    reloadLess: function () {
      this.reset()
      this.showExport = false
    },
    closeThemeToolbar: function () {
      $store.state.showThemeChanger = false
    },
    exportLess: function () {
      this.showExport = true
      this.outputLessConfig()
    },
    updateVariable () {
      if (this.selectedThemeItem.cssVariable === undefined) {
        document.getElementsByClassName('webview--app')[0].style.setProperty('--main-background-color', document.getElementById('updateVariableId').value)
      } else {
        // Update style properties
        document.getElementsByClassName('webview--app')[0].style.setProperty(this.selectedThemeItem.cssVariable, document.getElementById('updateVariableId').value)
        // Update HTML size value
        if (document.getElementsByClassName(this.selectedThemeItem.cssVariable)[0] !== undefined) {
          document.getElementsByClassName(this.selectedThemeItem.cssVariable)[0].innerHTML = document.getElementById('updateVariableId').value
        }
      }
    },
    getCssProperty (cssVar) {
      return getComputedStyle(this.themeQuerySelector).getPropertyValue(cssVar)
    },
    processCssProperty (cssVar) {
      const cssName = getComputedStyle(this.themeQuerySelector).getPropertyValue(cssVar)
      return cssName
    },
    outputLessConfig () {
      var output = ''
      for (var i = 0; i < this.themeChangerJson.themeChanger.length; i++) {
        // Css section header
        output += '//' + this.themeChangerJson.themeChanger[i].section.header + ';\r\n'
        // Build Css section titles
        for (var t = 0, getTitles = this.themeChangerJson.themeChanger[i].section.title.length; t < getTitles; t++) {
          output += '@' + this.themeChangerJson.themeChanger[i].section.title[t].cssVariable.replace(/--/g, '') + ':' + this.processCssProperty(this.themeChangerJson.themeChanger[i].section.title[t].cssVariable) + ';\r\n'
        }
      }
      document.getElementById('exportLessCode').value = output
    }
  },
  name: 'Theme'
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->

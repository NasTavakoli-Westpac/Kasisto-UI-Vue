<template>
<div>
  <div class="virtual-announcement-container" role="none">
    <div id="virtual-assistant-content"><div aria-live="polite" tabindex="-1"></div></div>
  </div>
  <button class="left-ada-handle" v-on:click="leftHandle()"></button>
  <button class="right-ada-handle" v-on:click="rightHandle()"></button>
</div>
</template>

<script>
export default {
  name: 'ScreenReader',
  data () {
    return {

    }
  },
  methods: {
    leftHandle () {
      $jq('.bx-prev').trigger('click')
    },
    rightHandle () {
      $jq('.bx-next').trigger('click')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
.virtual-announcement-container {
  position: absolute;
  z-index: -1;
  top: 0;
  opacity: 0;
  width: 0;
  height: 0;
  font-size: 0px;
}

.left-ada-handle {
  position: fixed;
  width: 10%;
  height: 100%;
  background-color: red;
  opacity: 0;
  left: 0;
  z-index: 11;
  display: none;

}

.right-ada-handle {
  position: fixed;
  width: 10%;
  height: 100%;
  background-color: red;
  opacity: 0;
  right: 0;
  z-index: 11;
  display: none;
}
</style>

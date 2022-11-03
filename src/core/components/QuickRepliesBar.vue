<template>
    <div id="kai-qr-bottom-bar" tabindex="0" navDir="horizontal" v-if="isActiveQRBar">
      <!-- Quick Replies Dynamic load -->
    </div>
</template>
<script>

export default {
  name: 'QuickRepliesBar',
  data () {
    return {
      isActiveQRBar: false
    }
  },
  mounted () {
    this.isActiveQRBar = true
  },
  methods: {

  }
}
</script>

<style>

#kai-qr-bottom-bar {
    position: absolute;
    bottom: 70px;
    background-color: #fff;
    width: 100%;
    z-index: 12;
    -webkit-box-shadow:  0px -5px 9px 0px rgba(0,0,0,0.075);
    box-shadow: 0px -5px 9px 0px rgba(0,0,0,0.075);
    display: none;
}

#kai-qr-bottom-bar:focus{
  outline: none;
  box-shadow: 0 0 5px 3px var(--highlight-color);
}

.active {
    transition: max-height 0.25s ease-in;
}

#kai-qr-bottom-bar .kai-card-carousel-wrapper {
        margin: 10px 0 10px 0;
}

#kai-qr-bottom-bar .kai-card-wraper {
      margin-left: 40px;
}

.webview_container_widget #kai-chip-panel {
    bottom: 31px;
    width: calc(403px - 0px);
}

@media screen and (max-width: 435px) {
  .webview_container_widget #kai-chip-panel {
    bottom: 0px;
  }
}

@media screen and (min-width: 435px) {
  .webview_container_widget .notif-chip {
      bottom: 101px;
      width: 403px;
  }
}
</style>

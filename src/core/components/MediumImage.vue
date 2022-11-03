<template>
<div class="kai-card-img" v-if="medium.medium_url !== ''">
    <img v-if="this.isImage" class="backup_picture" :class="{large:medium.type!='SMALL_IMAGE'}" v-on:load="imageLoaded('image')" ondragstart="return false;" :src="this.source" alt=""/>
    <div v-if="this.isYoutubeVideo" id='carousel-video' class='kai-video'><iframe title="Youtube embedded video" tabindex="-1" id='carouselVideo' width='100%' height='100%' v-on:load="imageLoaded('youtube')" :src="this.source" frameborder='0' allow='autoplay; encrypted-media' webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div>
    <div v-if="this.isVimeoVideo" id='carousel-video'  class='kai-video' playsinline webkit-playsinline><iframe tabindex="-1" id='carouselVideo' width='100%' v-on:load="imageLoaded('vimeo')" :src="this.source" frameborder='0' webkit-playsinline playsinline></iframe></div>
    <div v-if="this.isMP4Video" id='carousel-video-mp4' class='kai-video'>
        <video tabindex="-1"  playsinline id='carouselVideo' width='100%' height='auto' controls>
            <!-- comment :loadeddata for now as it creates an infinite loop exception when calculating card height for expand button -->
            <!-- <source :loadeddata="imageLoaded('mp4')" :src="this.source" type='video/mp4'>Your browser does not support the video tag. -->
            <source :src="this.source" type='video/mp4'>Your browser does not support the video tag.
        </video>
    </div>
</div>
</template>

<script>
import MediumMixin from './Mixin/MediumMixin'
import './styles/Medium.less'

export default {
  name: 'MediumImage',
  props: ['medium'],
  mixins: [
    MediumMixin
  ],
  data () {
    return {
      isImage: false,
      isYoutubeVideo: false,
      isVimeoVideo: false,
      isMP4Video: false,
      source: ''
    }
  },
  mounted () {
    if (this.medium.medium_url) {
      this.mediumContent(this.medium.medium_url, this.medium.type)
    } else if (this.medium.payload.medium_url) {
      this.mediumContent(this.medium.payload.medium_url, this.medium.payload.type)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>

</style>

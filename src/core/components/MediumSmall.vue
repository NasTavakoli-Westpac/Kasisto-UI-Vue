<template>
  <section>
      <div class="medium-small-wrapper">
        <img v-if="medium" class="backup_picture" ondragstart="return false;" :src="medium.medium_url" alt="" />
      </div>
  </section>
</template>

<script>

export default {
  name: 'MediumSmall',
  props: ['medium'],
  data () {
    return {
    }
  },
  mixins: [
  ],
  components: {

  },
  methods: {

  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
  .medium-small-wrapper {
    /* height: 58px; */
    width: 58px;
    float: right;
    shape-outside: content-box;
    margin: 10px;
    margin-top: 15px;
  }
  .kai-card-item img {
    width: 100%;
    min-height: 0;
}

</style>

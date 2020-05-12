<template>
  <div>
    <h1>Daily Dilbert</h1>

    <v-img v-if="imageid != ''" :src="fullUrl" alt="" />

  </div>
</template>

<script>

export default {
  name: 'daily',
  props: [ 'imageid'],
  data() {
    return {
      url: ''
    }
  },
  computed: {
    fullUrl() {
      return 'http://192.168.1.66:8080/image/' + this.imageid
    }
  }
}
</script>


<style>

</style>
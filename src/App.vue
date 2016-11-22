<template>
  <div id="app">

   <div class="">
      <router-link to="/">Home</router-link>
      <router-link to="/maps">Map</router-link>
      <router-link to="/resources">Resources</router-link>
      <router-link to="/gallery">gallery</router-link>
    </div>

    <router-view class="layout-view"></router-view>

  </div>
</template>

<script>
export default {
  name: 'app',
  components: {
  }
}
</script>

<style lang="less">
  @import './less/theme-base.less';
  @import './less/theme-astaria.less';
</style>

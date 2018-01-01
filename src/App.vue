<template>
  <div id="app">

    <navigation></navigation>
    <router-view class="layout-view"></router-view>

  </div>
</template>

<script>
import Navigation from './components/navigation.vue'

export default {
  name: 'app',
  components: {
    navigation: Navigation
  }
}
</script>
<style lang="less">
  @import './less/theme-base.less';
  @import './less/theme-astaria.less';
</style>

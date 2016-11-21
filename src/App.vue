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

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

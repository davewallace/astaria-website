<template>
  <div id="app">

    <router-link to="/">
      <img alt="Astaria" src="./assets/logo-astaria-black.png">
    </router-link>

    <Unicorn msg="this is a unicorn"/>

    <ul class="nav">
      <li class="nav__item">
        <router-link to="/about">About</router-link>
      </li>
      <li class="nav__item">
        <router-link to="/play">Play</router-link>
      </li>
      <li class="nav__item">
        <router-link to="/resources">Resources</router-link>
      </li>
    </ul>
    <router-view/>
  </div>
</template>

<script>
// @ is an alias to /src
import Unicorn from '@/components/Unicorn.vue'

export default {
  name: 'home',
  components: {
    Unicorn
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>

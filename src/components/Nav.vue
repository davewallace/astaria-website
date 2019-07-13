<template>
  <ul class="nav">
    <li class="nav__item">
      <router-link to="/about" class="nav__link">About</router-link>
    </li>
    <li class="nav__item">
      <router-link to="/play" class="nav__link">Play</router-link>
    </li>
    <li class="nav__item">
      <router-link to="/maps" class="nav__link">Maps</router-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'Nav'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/**
 * Nav layout
 **/
.nav {
  display: flex;
  margin: 0;
  padding: 0;
}
.nav__item {
  flex-grow: 1;
  margin: 0;
  padding: 0;
  text-align: center;
}

/**
 * Nav style
 **/
.nav__item {
  list-style-type: none;
}
.nav__link {
  color: #EAEAB9;
}

/**
 * Nav link states. Note the classNames assigned to these elements come from the
 * router-link plugin.
 **/
.router-link-exact-active {
  font-weight: bold;
  color: #BD4040;
}
</style>

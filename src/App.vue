<template>
  <div id="app" class="grid" :class="'theme--' + theme">

    <div class="header">
      <div class="header__strapline">
        Spawning dragons since 1994.
      </div>
      <router-link to="/" class="header__title">
        <img class="header__img" alt="Astaria" src="./assets/logo-astaria-black.png">
      </router-link>
    </div>

    <div class="nav">
      <Nav />
    </div>
    <div class="view">
      <router-view/>
    </div>

    <div class="unicorn">
      <Unicorn msg="this is a unicorn"/>
    </div>

    <div class="footer">(c) 2019</div>

  </div>
</template>

<script>
// @ is an alias to /src
import Nav from '@/components/Nav.vue'
import Unicorn from '@/components/Unicorn.vue'

export default {
  name: 'home',
  components: {
    Nav,
    Unicorn
  },
  created () {

    // check if there's a previously stored theme value, then use it or set a
    // default if no theme is stored
    let theme = localStorage.getItem('astariamud.com?theme')
    if (!theme) {
      theme = 'dark'
      localStorage.setItem('astariamud.com?theme', theme)
    }
    this.theme = theme

  },
  data: function () {
    return {
      theme: this.theme
    }
  }
}
</script>

<style>
/**
 * Default page and main container
 **/
body {
  margin: 0;
  padding: 2rem 0 0 0;
  border: 0;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background: #060310;
  color: #C9D9EA;
}
#app {
  width: 80vw;
  max-width: 1024px;
  margin: 20px auto;
  text-align: left;
}

/**
 * CSS reset
 **/
p {
  margin: 0 0 0.7rem;
  padding: 0;
}

/**
 * Layout - main containing regions
 **/
.grid {
  display: grid;
  grid-gap: 1em;

  grid-template-columns: 55% 45%;
  grid-template-rows: auto auto 1fr;

  grid-template-areas:
    "header  header"
    "nav     unicorn"
    "view    unicorn"
    "footer  footer";
}
.header {
  grid-area: header;
}
.nav {
  grid-area: nav;
}
.view {
  grid-area: view;
}
.unicorn {
  grid-area: unicorn;
}
.footer {
  grid-area: footer;
}

/**
 * Layout - media query adjustments
 **/
/* switch to a simplified block layout on a narrow viewport */
@media (max-width: 769px) {
  .grid {
    grid-template-columns: 55% 45%;
    grid-template-areas:
      "header  header"
      "nav     nav"
      "view    view"
      "unicorn unicorn"
      "footer  footer";
  }
}

/**
 * Header styles
 **/
.header {
  margin-bottom: 0.9rem;
}
.header__strapline {
  margin-bottom: 0.7rem;
  margin-left: 5px;
  font-size: 0.85rem;
  font-style: italic;
  color: #7F8A96;
}
.header__img {
  width: 100%;
  max-width: 100%;
}

/**
 * Footer styles
 **/
.footer {
  padding: 2rem;
  font-size: 0.6rem;
  font-style: italic;
  text-align: center;
  color: #444;
}

/**
 * Global styles
 **/
h2 {
  margin-bottom: 1.2rem;
  line-height: 1.7rem;
}
.link {
  color: #EAEAB9;
}
</style>

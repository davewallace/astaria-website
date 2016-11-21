import Vue from 'vue'
import App from './App'
import router from './router'

// Make sure to inject the router with the router option to make the
// whole app router-aware.

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router
})

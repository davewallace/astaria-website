<template>
   <div :class="componentclasses">
      <router-link to="/">Home</router-link>
      <router-link to="/maps">Map</router-link>
      <router-link to="/resources">Resources</router-link>
      <router-link to="/gallery">Gallery</router-link>
      <router-link to="/client">Client</router-link>
    </div>
</template>
<script>
export default {
  name: 'navigation',

  methods: {
  },

  props: {
    'componentclasses': String
  },

  computed: {
    model: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('html', value)
      }
    }
  }
}
</script>

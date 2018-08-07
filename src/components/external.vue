<template>
  <!-- TODO: how to move 'refs' into instance rather than abstract component -->
  <iframe class="external-media external-media--fullscreen {ui_classes}" :src="ui_src" ref="wm_client" :width="frameWidth" :height="frameHeight"></iframe>
</template>

<script>
export default {
  name: 'external',

  // data vs props: 'Both data and props are reactive, but data is more like
  // "my own state" and props is "I expect to get this from my parent".'
  data () {
    return {
      calculatedResize: false,
      frameWidth: document.documentElement.clientWidth,
      frameHeight: document.documentElement.clientHeight
    }
  },

  props: {
    'ui_src': String
  },

  methods: {
    handleResize (event) {
      console.log('height: ' + document.documentElement.clientHeight)
      this.frameHeight = document.documentElement.clientHeight
    }
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
  },

  mounted () {
    if (this.calculatedResize) {
      window.addEventListener('resize', this.handleResize)
    }
  },
  beforeDestroy () {
    if (this.calculatedResize) {
      window.removeEventListener('resize', this.handleResize)
    }
  }
}
</script>

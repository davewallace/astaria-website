<template>
  <div
    class="scroll-panel"
    v-html="data"></div>
</template>

<script>
export default {
	props: [
    'data'
  ],

  watch: {
    data: function () {
      this.scrollUpdate()
    }
  },

  methods: {
    scrollUpdate () {
      let elem = this.$el
      elem.scrollTop = elem.scrollHeight
      this.$emit('scrollPanelUpdate')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .scroll-panel {
    height: 100%;
    max-height: 100%;
    overflow-y: auto;
    padding: 20px;
    font-family: monospace;
  }
</style>

<style>
  /**
   * These classNames correspond to classNames supplied by the PHUD server
   **/
  .tnc_yellow { color: yellow; }
  .tnc_white { color: white; }
  .tnc_blue { color: #415bec; }
  .tnc_cyan { color: cyan; }
  .tnc_red { color: red; }
  .tnc_green { color: lime; }
  .tnc_orange { color: orange; }
</style>

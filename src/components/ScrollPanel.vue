<template>
  <div
    class="scroll-panel"
  />
</template>

<script>
export default {
	props: {
    scrollToBottom: false
  },

  data: function () {
    return {
    }
  },

  methods: {
  },

  update () {
        //var elem = this.$el
    //elem.scrollTop = elem.clientHeight;
    console.log('updated')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .scroll-panel {
    overflow-y: auto;
    padding: 20px;
    font-family: monospace;
  }
</style>

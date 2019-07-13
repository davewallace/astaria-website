<template>
  <div class="component">
    <a href="#" class="button-close" @click.prevent="handleClose">x</a>

    <div>the content will go in here</div>

    <div v-if="connected">
      connected
    </div>
    <div v-else>
      disconnected
    </div>

    <!--
    <iframe importance="high"
            referrerpolicy="same-origin"
            height="100%"
            width="100%"
            frameborder="0"
            marginheight="0"
            marginwidth="0"
            src="http://localhost:3000/" />
    -->
  </div>
</template>

<script>
import PlayerAPI from '@/api/Player.js'

export default {
  name: 'Player',
  data: function () {
    return {
      connected: false
    }
  },
  methods: {
    handleClose() {
      this.$emit('playerClose')
    }
  },
  created () {
    PlayerAPI.connect()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .component {
    position: fixed;
    top: 20px;
    left: 20px;
    width: calc(100vw - 40px);
    height: calc(100vh - 40px);

    border: 1px dashed #444;
    background: black;
    padding: 1rem;
  }

  .button-close {
    position: absolute;
    top: 0;
    right: 0;
    display: block;
    width: 16px;
    height: 16px;
    border: 1px dashed red;
  }
</style>

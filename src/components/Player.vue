<template>
  <div class="component">
    <a href="#" class="button-close" @click.prevent="handleClose">x</a>
    <iframe importance="high"
            referrerpolicy="same-origin"
            height="100%"
            width="100%"
            frameborder="0"
            marginheight="0"
            marginwidth="0"
            src="" />
  </div>
</template>

<script>
export default {
  name: 'Player',
  methods: {
    handleClose(event) {
      this.$emit('playerClose')
    }
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

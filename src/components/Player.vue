<template>
  <div class="component">
    <a href="#" class="button-close" @click.prevent="handleClose">x</a>
    [player here]
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
    top: 10px;
    right: 10px;
    border: 1px dashed red;
  }
</style>

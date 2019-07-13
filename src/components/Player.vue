<template>
  <div class="component"
       :class="(open)? 'open' : 'closed' ">
    [player here]
  </div>
</template>

<script>
export default {
  name: 'Player',
  props: {
    open: false
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .component {
    max-width: 100%;
    height: calc(100% - 2rem);
    min-height: 50vh;

    border: 1px dashed #444;
    padding: 1rem;
  }
</style>

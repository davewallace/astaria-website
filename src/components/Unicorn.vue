<template>
  <div class="component">
    {{ msg }}
  </div>
</template>

<script>
export default {
  name: 'Unicorn',
  props: {
    msg: String
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
    font-size: 0.8rem;
    font-style: italic;
    color: #444;
    text-align: center;
  }
</style>

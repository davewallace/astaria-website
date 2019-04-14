<template>
  <div class="component">
    <p>{{ msg }}</p>
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
    border: 1px dashed red;
  }
</style>

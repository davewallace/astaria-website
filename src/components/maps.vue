<template>
  <div>

    <h1>Maps</h1>

  </div>
</template>

<script>
import Palette from './palette'

// TODO: replace with API data
let colorData = {
  brand: {
    primary: '#FFF',
    secondary: '#000'
  }
}

export default {
  name: 'maps',
  components: {
    palette: Palette
  },
  data () {
    return {
      colorData: colorData
    }
  },
  methods: {
    method () {
    }
  },
  mounted () {
  },
  beforeDestroy () {
  }
}
</script>


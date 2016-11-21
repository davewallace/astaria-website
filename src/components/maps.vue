<template>
  <div>

    <h1>Maps</h1>

    <h1>The Astarian Cartographic Society</h1>

    <p>Mala, co-founder of Astaria's Cartographic Society has comissioned the gathering of as many maps as possible. After much debate, many broken pencils and resulting re-exploration parties - the wizened (and strangely blind) old man has released a series of maps which may be considered as 'Official';</p>

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


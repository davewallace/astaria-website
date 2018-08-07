<!--
Editor's note
`````````````
Values used in descriptive text are defined as variables at the bottom of this
file, their values are interpolated at build time. Update the values, the text
equivalents will then be replaced at build time.
-->
<template>
  <div class="content-wrap">

    <h1>Astaria Client</h1>
    
    <panel ui_classes="panel-client">
      <external ui_classes="client-display" ui.src="http://localhost/codefinger-projects/astaria/webclient/wm_client/webclient.php"></external>
    </panel>

  </div>
</template>

<style lang="less">

// TODO: what's with having to declare this stuff?
@import '../less/variables.less';
@import '../less/mixins.less';

.panel-client {
  border: 1px solid blue;
}
  .client-display {
    border: 1px solid blue;
  }
  .client-display {
    // TODO: check how this compiles, are we cleanly overriding here without too
    // much bloat?
    .fullscreen(100vh - @grid-pad/2, 100vh - @grid-pad/2);
  }

</style>
<script>
import Panel from './panel.vue'
import External from './external.vue'

export default {
  name: 'client',
  components: {
    panel: Panel,
    external: External
  },
  data () {
    return {
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

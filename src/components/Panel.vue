<template>
  <div class="panel" :class="ui_classes">
    <div class="panel-content">
      <slot></slot>
    </div>
  </div>
</template>
<style lang="less">
@import '../less/variables.less';
.panel {
  margin-bottom: @grid-pad * 2;

  .panel-content {
    .panel-section {
      margin-bottom: @grid-pad;
    }
  }

  &:last-child {
    margin-bottom: 0px;
  }
}
</style>
<script>
export default {
  name: 'panel',

  methods: {
  },

  props: {
    'ui_classes': String
  },

  computed: {
    model: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('html', value)
      }
    }
  }
}
</script>
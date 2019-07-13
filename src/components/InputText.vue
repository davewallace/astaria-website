<template>
  <input
  	type="text"
  	class="input"
  	ref="{{dynamicRef}}"
    v-model="value"
    @keyup.enter="handleEnter"
  />
</template>

<script>
export default {
	props: {
    clearOnSubmit: false
  },
  data: function () {
    return {
      value: ''
    }
  },
  methods: {
    focusInput() {
      this.$refs[dynamicRef].focus()
    },
    handleEnter() {
    	this.$emit('handleEnter', {
    		value: this.value
    	})

    	if (this.clearOnSubmit) {
    		this.value = ''
    	}
    }
  }
}
</script>

<style>
.input {
	padding: 8px;
	font-size: 1.1rem;
}
</style>

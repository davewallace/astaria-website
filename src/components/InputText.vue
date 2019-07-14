<template>
  <input
		class="input"
		:type="inputType"
		:autocomplete="autocompleteType"
    v-model="value"
    @keyup.enter="handleEnter"
		ref="input"
  />
</template>

<script>
export default {
	props: [
    'clearOnSubmit',
    'inputType',
    'autocompleteType'
  ],
  data: function () {
    return {
      value: ''
    }
  },
  methods: {
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

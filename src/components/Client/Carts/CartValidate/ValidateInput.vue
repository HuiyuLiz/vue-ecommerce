<template>
  <ValidationProvider
    v-slot="{ classes , errors }"
    :name="name"
    :rules="rules">
    <label
      :for="name"
      :class="{'d-none':!showLabel}"
      class="text-secondary">{{ text }}</label>
    <input
      :id="name"
      v-model="observeValue"
      :type="type"
      class="form-control rounded-0 mb-2"
      :class="classes"
      :name="name"
      :placeholder="'請輸入'+text">
    <span class="text-danger">{{ errors[0] }}</span>
  </ValidationProvider>
</template>

<script>
export default {
  name: 'ValidateInput',
  props: {
    type: {
      type: String,
      default: 'text'
    },
    value: {
      type: [String, Number],
      required: true
    },
    name: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    showLabel: {
      type: Boolean,
      default: false
    },
    rules: {
      type: String,
      required: true
    }
  },
  computed: {
    observeValue: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  }

}
</script>

<style>
</style>

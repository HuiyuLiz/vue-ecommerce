<template>
  <button
    class="btn btn-block py-3 mt-0 font-weight-bold rounded-0"
    :class="customClass">
    {{ text }}
  </button>
</template>

<script>
export default {
  name: 'CustomButton',
  props: {
    text: {
      type: String,
      required: true
    },
    customClass: {
      type: String,
      required: true
    }
  }

}
</script>

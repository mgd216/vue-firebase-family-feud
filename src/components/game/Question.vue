<template>
  <div class="d-flex align-center justify-center text-h1">
    {{ question }}
  </div>
</template>

<script>
export default {
  name: 'Question',
  props: {
    question: {
      type: String,
      default: '',
    },
  },
}
</script>

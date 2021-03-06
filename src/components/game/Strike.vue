<template>
  <div v-show="show" class="my-4 d-flex align-center justify-center">
    <fa-icon icon="times-circle" class="error--text" size="6x" />
  </div>
</template>

<script>
export default {
  name: 'Strike',
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

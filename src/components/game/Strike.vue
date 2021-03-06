<template>
  <div class="my-4 d-flex align-center justify-center">
    <fa-icon v-if="show" icon="times-circle" class="error--text" size="6x" />
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

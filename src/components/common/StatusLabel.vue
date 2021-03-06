<template>
  <v-chip small class="white--text" :class="statusClass">{{ status }}</v-chip>
</template>

<script>
export default {
  name: 'StatusLabel',
  props: {
    terminateDate: {
      type: Number,
      default: null,
    },
  },
  computed: {
    status() {
      return this.terminateDate === null ? 'Active' : 'Terminated'
    },
    statusClass() {
      return this.terminateDate === null ? 'success darken-2' : 'error darken2'
    },
  },
}
</script>

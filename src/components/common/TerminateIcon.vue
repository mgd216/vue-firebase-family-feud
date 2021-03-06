<template>
  <v-tooltip v-if="terminateDate !== null" bottom>
    <template v-slot:activator="{ on }">
      <fa-icon
        icon="times-circle"
        class="ml-1 error--text pointer"
        size="2x"
        v-on="on"
      />
    </template>
    <span>Terminated on {{ terminateDate | date }}</span>
  </v-tooltip>
</template>

<script>
export default {
  name: 'TerminateIcon',
  props: {
    terminateDate: {
      type: Number,
      default: null,
    },
  },
}
</script>

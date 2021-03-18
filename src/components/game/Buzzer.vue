<template>
  <div v-show="game.showBuzzer">
    <div
      v-if="game.teamA.buzzer === null && game.teamB.buzzer === null"
      class="d-flex justify-center align-center buzzer-inactive text-h1"
    >
      BUZZER
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Buzzer',
  computed: {
    ...mapGetters(['game']),
  },
}
</script>

<style lang="scss" scoped>
.buzzer-inactive {
  border: 3px solid #ccc;
}
</style>

<template>
  <v-container fluid>
    <div>
      <img src="@/assets/ffstrike3.jpg" />
    </div>
    <div class="mt-4">
      <v-alert type="error">{{ errorMsg }}</v-alert>
    </div>
    <div class="mt-4">
      <v-btn @click="goHome()">Go Back Home</v-btn>
    </div>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Error',
  computed: {
    ...mapGetters(['errorMsg']),
  },
  methods: {
    goHome() {
      this.$router.push({ name: 'Home' })
    },
  },
}
</script>

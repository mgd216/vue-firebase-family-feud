<template>
  <v-layout
    v-show="userShowNotification"
    :class="notificationClass"
    class="pa-2"
    row
  >
    <v-flex xs11 class="pl-2">
      <!-- eslint-disable vue/no-v-html -->
      <span v-html="userNotification.notification"></span>
    </v-flex>
    <v-spacer></v-spacer>
    <v-flex xs1>
      <v-btn
        class="mt-1"
        aria-label="Dismiss Notification"
        @click="dismissUserNotification()"
        >Dismiss</v-btn
      >
    </v-flex>
  </v-layout>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'UserNotificationBanner',
  computed: {
    ...mapGetters(['userShowNotification', 'userNotification']),
    notificationClass() {
      return `${this.userNotification.level} darken-2`
    },
  },
  methods: {
    ...mapActions(['dismissUserNotification']),
  },
}
</script>

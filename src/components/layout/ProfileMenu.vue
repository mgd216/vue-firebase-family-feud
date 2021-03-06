<template>
  <v-menu bottom left>
    <template #activator="{ on }">
      <span v-on="on">
        <UserAvatar
          v-show="isLoggedIn"
          :user-id="currentUserProfile.id"
          class="pointer"
        />
      </span>
    </template>
    <v-list>
      <v-list-item @click="gotoUserProfile()">
        <v-list-item-avatar><fa-icon icon="user" /></v-list-item-avatar>
        <v-list-item-title>Profile</v-list-item-title>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item @click="logout()">
        <v-list-item-avatar><fa-icon icon="sign-out-alt" /></v-list-item-avatar>
        <v-list-item-title>Logout</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import UserAvatar from '@/components/user/UserAvatar.vue'

export default {
  name: 'ProfileMenu',
  components: {
    UserAvatar,
  },
  computed: {
    ...mapGetters(['isLoggedIn', 'currentUserProfile']),
  },
  methods: {
    ...mapActions(['logout']),
    gotoUserProfile() {
      this.$router.push({
        name: 'UserProfileEntry',
        params: { id: this.currentUserProfile.id },
      })
    },
  },
}
</script>

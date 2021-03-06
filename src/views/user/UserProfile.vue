<template>
  <div>
    <BaseToolbar title="User Profile" :show-back-btn="true" />
    <v-layout column align-center>
      <v-alert v-if="error" type="error">{{ error }}</v-alert>
      <UserProfileCard v-else :user="user" />
    </v-layout>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import BaseToolbar from '@/components/layout/BaseToolbar.vue'
import UserProfileCard from '@/components/user/UserProfileCard.vue'

export default {
  name: 'UserProfile',
  components: {
    BaseToolbar,
    UserProfileCard,
  },
  data() {
    return {
      error: null,
      user: null,
    }
  },
  computed: {
    ...mapGetters(['userById', 'users']),
  },
  created() {
    this.initialize()
  },
  methods: {
    ...mapActions(['getUsers']),
    initialize: async function () {
      this.error = null
      if (this.$route.params.uid) {
        if (this.users.length === 0) {
          await this.getUsers()
        }
        const user = this.userById(this.$route.params.uid)
        if (user) {
          this.user = user
        } else {
          this.error = `User not found for ID: ${this.$route.params.uid}`
        }
      } else {
        this.error = `User ID is required`
      }
    },
  },
}
</script>

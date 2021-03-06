<template>
  <BaseCard :menu-permissions="isAdmin">
    <template #title>User Information</template>
    <template #menuItems>
      <v-list-item @click="gotoUpdateUser()">
        <v-list-item-title>Update User</v-list-item-title>
      </v-list-item>
    </template>
    <template #body>
      <v-row>
        <v-col>
          <UserAvatar :user-id="user.id" :size="100" />
        </v-col>
        <v-col>
          <div class="title">
            {{ userFullName }}
            <TerminateIcon :terminate-date="user.terminateDate" />
          </div>
          <v-simple-table dense>
            <tbody class="no-simple-table-hover">
              <tr>
                <td><b>Email: </b></td>
                <td>{{ user.email }}</td>
              </tr>
              <tr>
                <td><b>Phone: </b></td>
                <td>{{ user.phone }}</td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-col>
      </v-row>
    </template>
  </BaseCard>
</template>

<script>
import { mapGetters } from 'vuex'
import BaseCard from '@/components/layout/BaseCard.vue'
import UserAvatar from '@/components/user/UserAvatar.vue'
import TerminateIcon from '@/components/common/TerminateIcon.vue'

export default {
  name: 'UserProfileCard',
  components: {
    BaseCard,
    UserAvatar,
    TerminateIcon,
  },
  props: {
    user: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  computed: {
    ...mapGetters(['isAdmin']),
    userFullName() {
      return this.user ? `${this.user.firstName} ${this.user.lastName}` : ''
    },
  },
  methods: {
    gotoUpdateUser() {
      this.$router.push({
        name: 'UserProfileEntry',
        params: { id: this.user.id },
      })
    },
  },
}
</script>

<template>
  <div>
    <BaseToolbar title="User List">
      <template #items>
        <v-switch
          v-model="showActiveOnly"
          label="Active"
          color="white"
          class="mt-2 mr-2"
          hide-details
          @change="filterUsers()"
        ></v-switch>
        <v-text-field
          v-model="search"
          class="mt-1 mr-2"
          append-icon="mdi-magnify"
          label="Search"
          clearable
          single-line
          hide-details
          @input="filterUsers()"
        ></v-text-field>
        <v-tooltip v-if="isAdmin" bottom>
          <template v-slot:activator="{ on }">
            <fa-icon
              icon="plus-circle"
              class="mt-1 orange--text darken-2 pointer"
              size="2x"
              v-on="on"
              @click="$router.push({ name: 'UserProfileEntry' })"
            />
          </template>
          <span>Create New User</span>
        </v-tooltip>
      </template>
    </BaseToolbar>
    <v-container fluid>
      <v-list dense two-line avatar>
        <v-list-item
          v-for="u in filteredUsers"
          :key="u.id"
          :to="`user-profile/${u.id}`"
        >
          <v-list-item-avatar>
            <UserAvatar :user-id="u.id" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>
              <span class="title">{{ u.firstName }} {{ u.lastName }}</span>
              <TerminateIcon :terminate-date="u.terminateDate" />
            </v-list-item-title>
            <v-list-item-subtitle>
              <v-row wrap>
                <v-col>
                  <b>Email:</b>
                  {{ u.email }}
                </v-col>
                <v-col>
                  <b>Phone:</b>
                  {{ u.phone }}
                </v-col>
              </v-row>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import BaseToolbar from '@/components/layout/BaseToolbar.vue'
import UserAvatar from '@/components/user/UserAvatar.vue'
import TerminateIcon from '@/components/common/TerminateIcon.vue'

export default {
  name: 'UserList',
  components: {
    BaseToolbar,
    UserAvatar,
    TerminateIcon,
  },
  data() {
    return {
      search: null,
      showActiveOnly: true,
      filteredUsers: [],
    }
  },
  computed: {
    ...mapGetters(['isAdmin', 'users']),
  },
  watch: {
    users: {
      handler: 'filterUsers',
      immediate: true,
    },
  },
  created() {
    if (this.users.length === 0) {
      this.getUsers()
    }
  },
  methods: {
    ...mapActions(['getUsers']),
    filterUsers() {
      if (this.search) {
        this.filteredUsers = this.users.filter((u) => {
          let regExp = new RegExp(this.search, 'i')
          if (regExp.test(u.firstName)) return true
          if (regExp.test(u.lastName)) return true
          if (regExp.test(u.email)) return true
          return false
        })
      } else {
        this.filteredUsers = this.users
      }
      if (this.showActiveOnly) {
        this.filteredUsers = this.filteredUsers.filter(
          (u) => u.terminateDate === null,
        )
      }
    },
  },
}
</script>

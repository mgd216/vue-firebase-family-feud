<template>
  <div>
    <v-tabs v-model="activeTab" class="pa-0 ma-0">
      <v-tab
        v-for="t in ADMIN_TABS"
        :key="t.id"
        ripple
        @click="addTabToNavigationHistory(t)"
      >
        {{ t.tabTitle }}
      </v-tab>
    </v-tabs>
    <div class="scroller-toolbar">
      <keep-alive>
        <component
          :is="ADMIN_TABS[activeTab].component"
          v-if="activeTab !== null"
        />
      </keep-alive>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

const AdminSystemVars = () =>
  import(
    /* webpackChunkName: 'admin-system-vars' */ '@/views/admin/AdminSystemVars.vue'
  )
const AdminUserNotification = () =>
  import(
    /* webpackChunkName: 'admin-user-notification' */ '@/views/admin/AdminUserNotification.vue'
  )
const UserList = () =>
  import(/* webpackChunkName: 'admin-user-list' */ '@/views/user/UserList.vue')

const ADMIN_TABS = [
  {
    id: 'user-notification',
    tabTitle: 'User Notification',
    component: 'AdminUserNotification',
  },
  { id: 'system-vars', tabTitle: 'System Vars', component: 'AdminSystemVars' },
  { id: 'user-list', tabTitle: 'User List', component: 'UserList' },
]

export default {
  name: 'Admin',
  components: {
    AdminSystemVars,
    AdminUserNotification,
    UserList,
  },
  data() {
    return {
      activeTab: null,
      ADMIN_TABS,
    }
  },
  created() {
    if (this.$route.params.tab) {
      const tabIndex = this.ADMIN_TABS.findIndex(
        (e) => e.id === this.$route.params.tab,
      )
      this.activeTab = tabIndex === -1 ? 0 : tabIndex
    } else {
      this.activeTab = 0
    }
  },
  methods: {
    ...mapActions(['updateUserNavigation']),
    addTabToNavigationHistory(tab) {
      const route = {
        name: 'Admin',
        params: { tab: tab.id },
      }
      this.updateUserNavigation({
        display: `ADMIN: ${tab.tabTitle}`,
        route: route,
      })
    },
  },
}
</script>

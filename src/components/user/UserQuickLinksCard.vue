<template>
  <BaseCard>
    <template #title>
      Quick Links
    </template>
    <template #menuItems>
      <v-list-item @click="showQuickLinkDialog()">
        <v-list-item-title>Manage Quick Links</v-list-item-title>
      </v-list-item>
    </template>
    <template #body>
      <div v-if="userQuickLinks.length > 0" class="scroller-300">
        <v-simple-table>
          <tbody class="no-simple-table-hover">
            <tr
              v-for="q in userQuickLinks"
              :key="q.id"
              class="pointer"
              ripple
              @click="navigate(q)"
            >
              <td>
                {{ q.display }}
                <fa-icon class="ml-2" icon="share-square" />
              </td>
            </tr>
          </tbody>
        </v-simple-table>
      </div>
      <div v-else class="title text-center">
        <p>
          You have not saved any quick links Look for the
          <fa-icon class="ml-3 mr-3" icon="thumbtack" /> in the upper right
          corner of views and reports to save a quick link
        </p>
      </div>
      <UserQuickLinksDialog ref="user_quick_link_dialog" />
    </template>
  </BaseCard>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import BaseCard from '@/components/layout/BaseCard.vue'
import UserQuickLinksDialog from '@/components/user/UserQuickLinksDialog.vue'

export default {
  name: 'UserQuickLinksCard',
  components: {
    BaseCard,
    UserQuickLinksDialog,
  },
  computed: {
    ...mapGetters(['userQuickLinks']),
  },
  methods: {
    ...mapActions(['navigateToQuickLink']),
    showQuickLinkDialog() {
      this.$refs.user_quick_link_dialog.showDialog()
    },
    navigate(quickLink) {
      this.$router.push(quickLink.route)
    },
  },
}
</script>

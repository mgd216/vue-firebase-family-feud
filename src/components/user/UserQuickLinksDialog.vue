<template>
  <BaseDialog
    v-model="show"
    :max-width="400"
    title="Manage Quick Links"
    cancel-btn-text="Close"
  >
    <template #body>
      <div v-if="quickLinks.length > 0" class="scroller-400">
        <draggable v-model="quickLinks" @end="dragEnded()">
          <div v-for="q in quickLinks" :key="q.id" class="pa-2">
            <v-row>
              <v-col cols="1">
                <v-tooltip bottom>
                  <template #activator="{on}">
                    <fa-icon class="pointer" icon="grip-vertical" v-on="on" />
                  </template>
                  <span class="headline"
                    >Change Quick Link Order (drag up or down)</span
                  >
                </v-tooltip>
              </v-col>
              <v-col cols="10">
                <span>{{ q.display }}</span>
              </v-col>
              <v-col cols="1">
                <v-tooltip bottom>
                  <template #activator="{on}">
                    <fa-icon
                      class="pointer"
                      icon="trash"
                      v-on="on"
                      @click="removeQuickLink(q)"
                    />
                  </template>
                  <span class="headline">Delete Quick Link</span>
                </v-tooltip>
              </v-col>
            </v-row>
          </div>
        </draggable>
      </div>
      <div v-else class="title text-center">
        <p>
          You have not saved any quick links Look for the
          <fa-icon class="ml-3 mr-3" icon="thumbtack" /> in the upper right
          corner of views and reports to save a quick link
        </p>
      </div>
    </template>
  </BaseDialog>
</template>

<script>
import { cloneDeep } from 'lodash'
import { mapActions, mapGetters } from 'vuex'
import BaseDialog from '@/components/layout/BaseDialog.vue'
import draggable from 'vuedraggable'

export default {
  name: 'UserQuickLinksDialog',
  components: {
    BaseDialog,
    draggable,
  },
  data() {
    return {
      quickLinks: [],
      show: false,
    }
  },
  computed: {
    ...mapGetters(['userQuickLinks']),
  },
  methods: {
    ...mapActions(['updateUserQuickLinks']),
    dragEnded() {
      this.updateUserQuickLinks(this.quickLinks)
    },
    removeQuickLink(link) {
      let links = cloneDeep(this.quickLinks)
      links = links.filter((l) => l.display !== link.display)
      this.updateUserQuickLinks(links).then(() => {
        this.quickLinks = cloneDeep(this.userQuickLinks)
      })
    },
    showDialog() {
      this.show = true
      this.quickLinks = cloneDeep(this.userQuickLinks)
    },
  },
}
</script>

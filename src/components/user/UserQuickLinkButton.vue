<template>
  <span class="mt-2">
    <v-tooltip v-if="linkAlreadySaved" bottom>
      <template #activator="{on}">
        <fa-icon
          class="title pointer mt-1 mr-2 warning--text darker-1"
          icon="thumbtack"
          @click="removeQuickLink()"
          v-on="on"
        />
      </template>
      <span class="headline">Remove {{ display }} Quick Link.</span>
    </v-tooltip>
    <v-tooltip v-else bottom>
      <template #activator="{on}">
        <fa-icon
          class="title pointer mt-1 mr-2"
          icon="thumbtack"
          @click="addQuickLink()"
          v-on="on"
        />
      </template>
      <span class="headline">Save {{ display }} as a Quick Link.</span>
    </v-tooltip>
  </span>
</template>

<script>
import { cloneDeep } from 'lodash'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'UserQuickLinkButton',
  props: {
    display: {
      type: String,
      required: true,
    },
    route: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters(['userQuickLinks']),
    linkAlreadySaved() {
      const link = this.userQuickLinks.find((l) => l.display === this.display)
      return !!link
    },
  },
  methods: {
    ...mapActions(['updateUserQuickLinks']),
    addQuickLink() {
      let link = {
        display: this.display,
        route: {
          name: this.route.name,
          params: this.route.params,
        },
      }
      const links = cloneDeep(this.userQuickLinks)
      links.push(link)
      this.updateUserQuickLinks(links)
    },
    removeQuickLink() {
      let links = cloneDeep(this.userQuickLinks)
      links = links.filter((l) => l.display !== this.display)
      this.updateUserQuickLinks(links)
    },
  },
}
</script>

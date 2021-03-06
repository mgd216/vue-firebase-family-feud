<template>
  <v-menu open-on-hover bottom nudge-right="10">
    <template #activator="{on}">
      <fa-icon
        class="pointer mr-2"
        icon="step-backward"
        aria-label="Show History"
        @click="$router.go(-1)"
        v-on="on"
      />
    </template>
    <v-list v-if="userNavigation.length > 0">
      <v-list-item
        v-for="n in userNavigation"
        :key="n._id"
        ripple
        @click="navigate(n)"
      >
        <v-list-item-content>
          <v-list-item-title>{{ n.display }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-list v-else>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Go Back</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'BackButton',
  computed: {
    ...mapGetters(['userNavigation']),
  },
  methods: {
    ...mapActions(['updateUserNavigation']),
    navigate(n) {
      this.updateUserNavigation(n)
      this.$router.push(n.route)
    },
  },
}
</script>

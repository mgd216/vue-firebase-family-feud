<template>
  <v-navigation-drawer
    v-if="isLoggedIn"
    v-model="show"
    persistent
    :mini-variant="miniVariant"
    :clipped="clipped"
    enable-resize-watcher
    fixed
    app
  >
    <v-list nav>
      <v-list-item to="/home">
        <v-list-item-action>
          <fa-icon icon="home" />
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item to="/game">
        <v-list-item-action>
          <fa-icon icon="building" />
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Game</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item to="/admin">
        <v-list-item-action>
          <fa-icon icon="cog" />
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Admin</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AppNav',
  data() {
    return {
      show: false,
    }
  },
  computed: {
    ...mapGetters([
      'clipped',
      'navigation',
      'isAdmin',
      'isLoggedIn',
      'miniVariant',
    ]),
  },
  watch: {
    navigation() {
      this.show = true
    },
  },
}
</script>

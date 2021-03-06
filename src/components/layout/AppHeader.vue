<template>
  <v-app-bar app dark clipped-left>
    <v-app-bar-nav-icon
      v-if="isLoggedIn"
      @click.stop="showNavigation()"
    ></v-app-bar-nav-icon>
    <v-btn v-if="isLoggedIn" icon @click.stop="toggleMiniVariant()">
      <fa-icon v-if="miniVariant" icon="chevron-right" />
      <fa-icon v-else icon="chevron-left" />
    </v-btn>
    <img src="@/assets/family_feud_small.png" height="40px" alt />
    <span class="title ml-2">{{ appTitle }}</span>
    <v-spacer></v-spacer>
    <ProfileMenu />
  </v-app-bar>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ProfileMenu from '@/components/layout/ProfileMenu.vue'

export default {
  name: 'AppHeader',
  components: {
    ProfileMenu,
  },
  computed: {
    ...mapGetters([
      'appTitle',
      'clipped',
      'navigation',
      'isLoggedIn',
      'miniVariant',
    ]),
  },
  methods: {
    ...mapActions(['showNavigation', 'toggleMiniVariant']),
  },
}
</script>

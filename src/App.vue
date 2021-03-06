<template>
  <v-app dark>
    <AppNav />
    <AppHeader />
    <v-main>
      <router-view />
      <InstallApp />
    </v-main>
  </v-app>
</template>

<script>
import AppHeader from '@/components/layout/AppHeader.vue'
import AppNav from '@/components/layout/AppNav.vue'
import InstallApp from '@/components/layout/InstallApp.vue'

export default {
  name: 'App',
  components: {
    AppHeader,
    AppNav,
    InstallApp,
  },
}
</script>

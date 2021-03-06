import Vue from 'vue'
import { VTextField } from 'vuetify/lib'
import VuetifyGoogleAutocomplete from 'vuetify-google-autocomplete'

Vue.component('VTextField', VTextField)
Vue.use(VuetifyGoogleAutocomplete, {
  apiKey: process.env.VUE_APP_GOOGLE_API_KEY,
})

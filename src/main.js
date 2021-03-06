import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import './plugins'
import './filters'
import './firebaseActions'

import fb from './firebaseConfig.js'
import './registerServiceWorker'

import vuetify from './plugins/vuetify'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

Vue.config.productionTip = false

let app
fb.auth.onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      el: '#app',
      router,
      store,
      vuetify,
      render: (h) => h(App),
    })
  }
})

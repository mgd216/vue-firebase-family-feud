import fb from '@/firebaseConfig.js'
import store from '@/store'

fb.auth.onAuthStateChanged((user) => {
  if (user) {
    store.commit('SET_CURRENT_USER', user)
    store.dispatch('getCurrentUserProfile')
    store.dispatch('getCurrentUserSettings')

    store.dispatch('getQuestions')
    store.dispatch('getSystemVars')
    store.dispatch('getUserRoles')
    store.dispatch('getUsers')
  }
})

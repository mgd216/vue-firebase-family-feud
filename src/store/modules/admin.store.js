import fb from '@/firebaseConfig.js'
import toast from '@/services/toast.service'

const state = {
  userNotification: {},
}

const getters = {
  userNotification: (state) => state.userNotification,
}

const actions = {
  getSystemVars({ commit }) {
    fb.systemVarsRef.onSnapshot((querySnapshot) => {
      let sysVars = []
      querySnapshot.forEach((doc) => {
        let sysVar = doc.data()
        sysVar.id = doc.id
        sysVars.push(sysVar)
      })
      commit('SET_SYSTEM_VARS', sysVars)
    })
  },

  updateUserNotification(_, notification) {
    const updateUserNotificationFunction = fb.functions.httpsCallable(
      'updateUserNotification',
    )
    updateUserNotificationFunction(notification)
      .then(() => {
        toast.success(`User Notification was updated.`)
      })
      .catch((err) => {
        toast.error(err)
      })
  },

  updateUserNotifications(_, status) {
    const updateUserNotificationsFunction = fb.functions.httpsCallable(
      'updateUserNotifications',
    )
    updateUserNotificationsFunction(status)
      .then(() => {
        toast.success(`User Notifications were updated.`)
      })
      .catch((err) => {
        toast.error(err)
      })
  },
}

const mutations = {
  SET_SYSTEM_VARS(state, sysVars) {
    const userNotification = sysVars.find((v) => v.id === 'USER_NOTIFICATION')
    state.userNotification = userNotification || {}
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}

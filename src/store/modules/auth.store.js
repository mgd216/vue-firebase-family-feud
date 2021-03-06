import { cloneDeep } from 'lodash'
import fb from '@/firebaseConfig.js'
import router from '@/router'
import toast from '@/services/toast.service'

const state = {
  currentUser: null,
  currentUserProfile: {},
  isAdmin: false,
  userNavigation: [],
  userQuickLinks: [],
  userShowNotification: false,
}

const getters = {
  currentUser: (state) => state.currentUser,
  currentUserProfile: (state) => state.currentUserProfile,
  isAdmin: (state) => state.isAdmin,
  isLoggedIn: (state) => !!state.currentUser,
  userShowNotification: (state) => state.userShowNotification,
  userNavigation: (state) => state.userNavigation,
  userQuickLinks: (state) => state.userQuickLinks,
}

const actions = {
  async dismissUserNotification({ commit }) {
    try {
      await fb.userSettingsRef
        .doc(state.currentUser.uid)
        .update({ showNotifications: false })
      commit('SET_USER_SHOW_NOTIFICATION', false)
    } catch (error) {
      toast.error(error)
    }
  },

  async getUserRoles({ commit }) {
    if (!fb.auth.currentUser) {
      commit('SET_ADMIN', false)
    } else {
      const token = await fb.auth.currentUser.getIdTokenResult()
      if (token.claims.ADMIN) {
        commit('SET_ADMIN', true)
      }
    }
  },

  async getCurrentUserSettings({ commit }) {
    try {
      const userSettingsRef = await fb.userSettingsRef
        .doc(state.currentUser.uid)
        .get()
      const userSettings = userSettingsRef.data()
      commit('SET_USER_SHOW_NOTIFICATION', userSettings.showNotifications)
      commit('SET_USER_NAVIGATION', userSettings.navigation)
      commit('SET_USER_QUICK_LINKS', userSettings.quickLinks)
    } catch (error) {
      toast.error(error)
    }
  },

  login({ commit, dispatch }, opts) {
    fb.auth
      .signInWithEmailAndPassword(opts.email, opts.password)
      .then(async (response) => {
        commit('SET_CURRENT_USER', response.user)
        await dispatch('getCurrentUserProfile')
        await dispatch('getCurrentUserSettings')
        dispatch('showNavigation')
        router.push({ name: 'Home' })
      })
      .catch((err) => {
        toast.error(err)
      })
  },

  logout({ commit }) {
    fb.auth
      .signOut()
      .then(function () {
        localStorage.clear()
        commit('SET_CURRENT_USER', null)
        commit('SET_CURRENT_USER_PROFILE', {})
        router.push({
          name: 'Login',
        })
      })
      .catch(function (err) {
        toast.error(err)
      })
  },

  getCurrentUserProfile({ commit, state }) {
    fb.usersRef
      .where('email', '==', state.currentUser.email)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.docs.length === 0) {
          toast.error('Error loading user profile')
        } else {
          let user = querySnapshot.docs[0].data()
          user.id = querySnapshot.docs[0].id
          commit('SET_CURRENT_USER_PROFILE', user)
        }
      })
      .catch((err) => {
        toast.error(err)
      })
  },

  async updateUserNavigation({ commit, state }, nav) {
    try {
      let userNav = cloneDeep(state.userNavigation)
      userNav = userNav.filter((n) => n.display !== nav.display)
      userNav.unshift({
        display: nav.display,
        route: nav.route,
      })
      if (userNav.length > 15) {
        userNav.pop()
      }
      await fb.userSettingsRef
        .doc(state.currentUser.uid)
        .update({ navigation: userNav })
      commit('SET_USER_NAVIGATION', userNav)
    } catch (error) {
      toast.error(error)
    }
  },

  async updateUserQuickLinks({ commit, state }, links) {
    try {
      await fb.userSettingsRef
        .doc(state.currentUser.uid)
        .update({ quickLinks: links })
      commit('SET_USER_QUICK_LINKS', links)
      toast.success('Quick links updated.')
    } catch (error) {
      toast.error(error)
    }
  },
}

const mutations = {
  SET_ADMIN(state, val) {
    state.isAdmin = val
  },
  SET_CURRENT_USER(state, val) {
    state.currentUser = val
  },
  SET_CURRENT_USER_PROFILE(state, val) {
    state.currentUserProfile = val
  },
  SET_CURRENT_USER_PROFILE_IMG(state, url) {
    if (state.currentUserProfile) {
      state.currentUserProfile.profileImgUrl = url
    }
  },
  SET_USER_SHOW_NOTIFICATION(state, val) {
    state.userShowNotification = val
  },
  SET_USER_NAVIGATION(state, nav) {
    state.userNavigation = nav
  },
  SET_USER_QUICK_LINKS(state, links) {
    state.userQuickLinks = links
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}

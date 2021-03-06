import Vue from 'vue'
import router from '@/router'

const QUILL_EDITOR_OPTIONS = {
  modules: {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ indent: '-1' }, { indent: '+1' }],
      ['blockquote', 'code-block'],
      [{ script: 'sub' }, { script: 'super' }],
      [{ direction: 'rtl' }],
      [{ size: ['small', false, 'large', 'huge'] }],
      [{ font: [] }],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ['link', 'image', 'video'],
      ['clean'],
    ],
  },
}

const state = {
  appTitle: '',
  clipped: true,
  errorMsg: null,
  navigation: false,
  miniVariant: false,
  quillEditorOptions: QUILL_EDITOR_OPTIONS,
}

const getters = {
  appTitle: (state) => state.appTitle,
  clipped: (state) => state.clipped,
  errorMsg: (state) => state.errorMsg,
  navigation: (state) => state.navigation,
  miniVariant: (state) => state.miniVariant,
  quillEditorOptions: (state) => state.quillEditorOptions,
}

const actions = {
  toggleMiniVariant({ commit, state }) {
    commit('SET_MINI_VARIANT', !state.miniVariant)
  },
  setAppTitle({ commit }, val) {
    commit('SET_APP_TITLE', val)
  },
  setErrorMsg({ commit }, msg) {
    commit('SET_ERROR_MSG', msg)
    router.push({ name: 'Error' })
  },
  showNavigation({ commit }) {
    commit('SET_NAVIGATION', true)
    Vue.nextTick().then(() => {
      //set navigation back to false because v-navigation-drawer can close on its own
      commit('SET_NAVIGATION', false)
    })
  },
}

const mutations = {
  SET_APP_TITLE(state, val) {
    state.appTitle = val
  },
  SET_ERROR_MSG(state, val) {
    state.errorMsg = val
  },
  SET_MINI_VARIANT(state, val) {
    state.miniVariant = val
  },
  SET_NAVIGATION(state, val) {
    state.navigation = val
  },
}

export default { state, getters, actions, mutations }

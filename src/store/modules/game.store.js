import fb from '@/firebaseConfig.js'

const BLANK_GAME = {
  teamA: {
    name: 'Team A',
    buzzer: null,
    score: 0,
    strike1: false,
    strike2: false,
    strike3: false,
  },
  teamB: {
    name: 'Team B',
    buzzer: null,
    score: 0,
    strike1: false,
    strike2: false,
    strike3: false,
  },
  question: null,
  answers: [],
  questionScore: 0,
}

const state = {
  game: null,
  questionsLoaded: [],
}

const getters = {
  game: (state) => state.game,
  questionsLoaded: (state) => state.questionsLoaded,
}

const actions = {
  async getGameByUser({ commit }, userId) {
    fb.gamesRef
      .doc(userId)
      .get()
      .then(async (doc) => {
        if (doc.exists) {
          commit('SET_NEW_GAME', doc.data())
        } else {
          fb.gamesRef.doc(userId).set(BLANK_GAME)
          fb.gamesRef
            .doc(userId)
            .get()
            .then((doc) => {
              if (doc.exists) {
                commit('SET_NEW_GAME', doc.data())
              }
            })
        }
      })
  },
  updateGame({ rootGetters }) {
    fb.gamesRef.doc(rootGetters.currentUserProfile.id).set(rootGetters.game)
  },
}

const mutations = {
  SET_NEW_GAME(state, data) {
    state.game = data
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}

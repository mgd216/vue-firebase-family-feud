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
  questionScore: 0,
}

const state = {
  game: null,
}

const getters = {
  game: (state) => state.game,
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

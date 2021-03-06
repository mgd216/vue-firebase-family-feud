import fb from '@/firebaseConfig.js'

const state = {
  questions: [],
}

const getters = {
  questions: (state) => state.questions,
}

const actions = {
  getQuestions({ commit }) {
    return new Promise((resolve) => {
      fb.questionsRef.onSnapshot((querySnapshot) => {
        let questionArray = []
        querySnapshot.forEach((doc) => {
          let question = doc.data()
          question.id = doc.id
          questionArray.push(question)
        })
        commit('SET_QUESTIONS', questionArray)
        resolve()
      })
    })
  },
}

const mutations = {
  SET_QUESTIONS(state, data) {
    state.questions = data
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}

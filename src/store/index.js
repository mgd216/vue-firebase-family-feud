import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

const requireModule = require.context('./modules', false, /\.store\.js$/)
const modules = {}

requireModule.keys().forEach((filename) => {
  const moduleName = filename
    .replace(/(\.\/|\.store\.js)/g, '')
    .replace(/^\w/, (c) => c.toUpperCase())
  modules[moduleName] =
    requireModule(filename).default || requireModule(filename)
})

Vue.use(Vuex)
const DEBUG = false

export default new Vuex.Store({
  modules,
  string: DEBUG,
  plugins: DEBUG ? [createLogger()] : [],
})

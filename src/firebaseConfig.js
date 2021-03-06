import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/functions'
import 'firebase/storage'

// firebase init goes here
const config = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING,
}
firebase.initializeApp(config)

// firebase utils
const db = firebase.firestore()
const auth = firebase.auth()
const functions = firebase.functions()
if (process.env.NODE_ENV === 'development') {
  functions.emulatorOrigin = 'http://localhost:5001'
}
const currentUser = auth.currentUser

// date issue fix according to firebase
const settings = {}
db.settings(settings)
db.enablePersistence().catch(function (err) {
  console.log(err)
})

// firestore collections
const gamesRef = db.collection('games')
const questionsRef = db.collection('questions')
const systemVarsRef = db.collection('system_vars')
const usersRef = db.collection('users')
const userSettingsRef = db.collection('user_settings')

// storage
const storage = firebase.storage()

export default {
  auth,
  currentUser,
  db,
  functions,
  gamesRef,
  questionsRef,
  storage,
  systemVarsRef,
  usersRef,
  userSettingsRef,
}

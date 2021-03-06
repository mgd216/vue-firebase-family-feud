/* eslint-disable no-console */

const admin = require('firebase-admin')
const config = require('../config')
const serviceAccount = require('../../serviceAccountKey.json')
const { companyInfo, wineBottleSizes, wineTypes } = require('./system-vars')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: config.DB_URL,
})
const db = admin.firestore()

async function main() {
  console.log('<---------- Importing System Vars ---------->')

  const companyInfoDoc = db.collection('system_vars').doc('COMPANY_INFO')

  companyInfoDoc
    .set(companyInfo)
    .then(() => {
      console.log(`COMPANY INFO added to firestore!`)
    })
    .catch((error) => {
      console.log(error)
    })

  const userNotification = {
    active: true,
    level: 'info',
    notification:
      '<h1>Greetings and welcome to the DMS Wines Management Console!</h1>',
    updateDate: 1592845583354,
  }
  const userNotificationDoc = db
    .collection('system_vars')
    .doc('USER_NOTIFICATION')

  userNotificationDoc
    .set(userNotification)
    .then(() => {
      console.log(`USER NOTIFICATION added to firestore!`)
    })
    .catch((error) => {
      console.log(error)
    })

  const wineBottleDoc = db.collection('system_vars').doc('WINE_BOTTLE_SIZES')

  wineBottleDoc
    .set({
      sizes: wineBottleSizes,
    })
    .then(() => {
      console.log(`Wine Bottle Sizes added to firestore!`)
    })
    .catch((error) => {
      console.log(error)
    })

  const wineTypesDoc = db.collection('system_vars').doc('WINE_TYPES')

  wineTypesDoc
    .set({
      types: wineTypes,
    })
    .then(() => {
      console.log(`Wine Types added to firestore!`)
    })
    .catch((error) => {
      console.log(error)
    })
}

main()

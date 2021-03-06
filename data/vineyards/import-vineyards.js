/* eslint-disable no-console */

const _ = require('lodash')
const admin = require('firebase-admin')
const csv = require('csvtojson')
const faker = require('faker')
const path = require('path')
const config = require('../config')
const serviceAccount = require('../../serviceAccountKey.json')
const { getLatLng } = require('../utils/location-utils.service')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: config.DB_URL,
})
const db = admin.firestore()

async function main() {
  console.log('<---------- Importing Vineyards ---------->')

  let dataArray = await csv().fromFile(path.resolve(__dirname, 'vineyards.csv'))
  console.log('Records loaded: ', dataArray.length)
  let useFakeData = false

  if (dataArray.length === 0) {
    useFakeData = true
    console.log('No Vineyard data, generating fake data...')
    _.times(config.numberOf.vineyards, () => {
      dataArray.push({
        vineyardName: faker.company.companyName(),
        website: faker.internet.url(),
        email: faker.internet.email(),
        phone: faker.phone.phoneNumber(),
        street: faker.address.streetAddress(),
        city: faker.address.city(),
        state: faker.address.stateAbbr(),
        zipCode: faker.address.zipCode(),
        lat: faker.address.latitude(),
        lng: faker.address.longitude(),
      })
    })
  }
  console.log('Loading Data: ', dataArray)

  for (let data of dataArray) {
    let obj = {
      vineyardName: data.vineyardName,
      street: data.street,
      city: data.city,
      state: data.state,
      zipCode: data.zipCode,
      lat: data.lat || null,
      lng: data.lng || null,
      createDate: new Date().valueOf(),
      terminateDate: null,
    }

    if (!useFakeData) {
      let geo = await getLatLng(obj)
      obj.lat = geo.lat
      obj.lng = geo.lng
    }

    let doc = db.collection('vineyards').doc()

    doc
      .set(obj)
      .then(() => {
        console.log(`${obj.vineyardName} is successed adding to firestore!`)
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

main()

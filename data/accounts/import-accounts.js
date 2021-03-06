/* eslint-disable no-console */

const _ = require('lodash')
const admin = require('firebase-admin')
const csv = require('csvtojson')
const faker = require('faker')
const path = require('path')
const config = require('../config')
const LocationUtils = require('../utils/location-utils.service')
const serviceAccount = require('../../serviceAccountKey.json')
const UserUtils = require('../utils/user-utils.service')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: config.DB_URL,
})
const db = admin.firestore()

async function main() {
  console.log('<---------- Importing Accounts ---------->')

  let dataArray = await csv().fromFile(path.resolve(__dirname, 'accounts.csv'))
  console.log('Records loaded: ', dataArray.length)

  if (dataArray.length === 0) {
    console.log('No Account data, generating fake data...')

    const addresses = await LocationUtils.getRandomAddresses()
    _.times(config.numberOf.accounts, () => {
      const addressObj = {
        accountName: faker.company.companyName(),
        email: faker.internet.email(),
        phone: faker.phone.phoneNumber(),
        website: faker.internet.url(),
        locations: [],
      }
      const numLocations = faker.random.number({ min: 1, max: 4 })
      _.times(numLocations, () => {
        const address = faker.random.arrayElement(addresses)
        let locObj = {
          street: address.address1,
          street2: address.address2,
          city: address.city,
          state: address.state,
          zipCode: address.postalCode,
          country: 'USA',
          lat: address.coordinates.lat,
          lng: address.coordinates.lng,
        }
        locObj.formattedAddress = `${locObj.street}, ${locObj.city}, ${locObj.state} ${locObj.zipCode}, ${locObj.country}`
        addressObj.locations.push(locObj)
      })
      dataArray.push(addressObj)
    })
  }
  console.log('Loading Data: ', dataArray)

  let users = await UserUtils.loadUsers(db)

  for (let data of dataArray) {
    const user = faker.random.arrayElement(users)

    let obj = {
      accountName: data.accountName,
      email: data.email,
      phone: data.phone,
      website: data.website,
      repId: user.id,
      repName: user ? `${user.firstName} ${user.lastName}` : null,
      createDate: new Date().valueOf(),
      terminateDate: null,
    }

    let doc = db.collection('accounts')

    doc
      .add(obj)
      .then((docRef) => {
        console.log(`${obj.accountName} is successed adding to firestore!`)
        for (const loc of data.locations) {
          const locObj = {
            accountId: docRef.id,
            accountName: data.accountName,
            street: loc.street,
            street2: loc.street2,
            city: loc.city || null,
            state: loc.state,
            zipCode: loc.zipCode,
            country: loc.country,
            formattedAddress: loc.formattedAddress,
            lat: loc.lat || null,
            lng: loc.lng || null,
            createDate: new Date().valueOf(),
            terminateDate: null,
          }
          let locDoc = db.collection('account_locations').doc()
          locDoc
            .set(locObj)
            .then(() => {
              console.log(
                `${locObj.formattedAddress} created for account ${docRef.id}.`,
              )
            })
            .catch((error) => {
              console.log(error)
            })
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

main()

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
  console.log('<---------- Importing Leads ---------->')

  let dataArray = await csv().fromFile(path.resolve(__dirname, 'leads.csv'))
  console.log('Records loaded: ', dataArray.length)

  if (dataArray.length === 0) {
    console.log('No Lead data, generating fake data...')

    const addresses = await LocationUtils.getRandomAddresses()

    _.times(config.numberOf.leads, () => {
      const address = faker.random.arrayElement(addresses)
      const leadObj = {
        leadName: faker.company.companyName(),
        poc: `${faker.name.firstName()} ${faker.name.lastName()}`,
        email: faker.internet.email(),
        phone: faker.phone.phoneNumber(),
        website: faker.internet.url(),
        street: address.address1,
        street2: address.address2,
        city: address.city,
        state: address.state,
        zipCode: address.postalCode,
        country: 'USA',
        lat: address.coordinates.lat,
        lng: address.coordinates.lng,
      }
      leadObj.formattedAddress = `${leadObj.street}, ${leadObj.city}, ${leadObj.state} ${leadObj.zipCode}, ${leadObj.country}`
      dataArray.push(leadObj)
    })
  }
  console.log('Loading Data: ', dataArray)

  let users = await UserUtils.loadUsers(db)

  for (let data of dataArray) {
    const user = faker.random.arrayElement(users)

    let obj = {
      leadName: data.leadName,
      poc: data.poc,
      email: data.email,
      phone: data.phone,
      website: data.website,
      street: data.street,
      street2: data.street2,
      city: data.city || null,
      state: data.state,
      zipCode: data.zipCode,
      country: 'USA',
      formattedAddress: data.formattedAddress,
      lat: data.lat,
      lng: data.lng,
      rep: {
        id: user.id,
        fullName: user ? `${user.firstName} ${user.lastName}` : null,
      },
      createDate: new Date().valueOf(),
      terminateDate: null,
    }

    let doc = db.collection('leads')

    doc
      .add(obj)
      .then(() => {
        console.log(`${obj.leadName} is success adding to firestore!`)
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

main()

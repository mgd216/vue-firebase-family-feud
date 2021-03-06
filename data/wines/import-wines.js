/* eslint-disable no-console */

const _ = require('lodash')
const admin = require('firebase-admin')
const csv = require('csvtojson')
const faker = require('faker')
const path = require('path')
const config = require('../config')
const serviceAccount = require('../../serviceAccountKey.json')
const { wineBottleSizes, wineTypes } = require('../system-vars/system-vars')
const { getVineyards } = require('../vineyards/vineyard-utils.service')
const { getWines } = require('./wine-utils.service')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: config.DB_URL,
})
const db = admin.firestore()

async function main() {
  console.log('<---------- Importing Wines ---------->')

  let dataArray = await csv().fromFile(path.resolve(__dirname, 'wines.csv'))
  console.log('Records loaded: ', dataArray.length)

  // generate fake data if no wines loaded from CSV file
  if (dataArray.length === 0) {
    console.log('No Wine data, generating fake data...')

    let vineyards = await getVineyards(db)

    _.times(config.numberOf.wines, () => {
      const vineyard = faker.random.arrayElement(vineyards)
      dataArray.push({
        wineName: `${faker.hacker.verb()} ${faker.hacker.noun()}`,
        wineType: faker.random.arrayElement(wineTypes),
        shortDesc: faker.lorem.sentence(),
        fullDesc: faker.lorem.paragraphs(),
        wineImgUrl: faker.image.food(),
        vineyardId: vineyard.id,
        vineyardName: vineyard.vineyardName,
      })
    })
  }

  //create wines
  for (let data of dataArray) {
    let obj = {
      wineName: data.wineName,
      wineType: data.wineType,
      shortDesc: data.shortDesc,
      fullDesc: data.fullDesc,
      wineImgUrl: data.wineImgUrl,
      vineyardId: data.vineyardId,
      vineyardName: data.vineyardName,
      createDate: new Date().valueOf(),
      terminateDate: null,
    }

    let doc = db.collection('wines').doc()

    doc
      .set(obj)
      .then(() => {
        console.log(`${obj.wineName} added to firestore!`)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  //create vintages for wines
  const wines = await getWines(db)
  const vintageArray = []

  for (const w of wines) {
    const numVintages = faker.random.number({ min: 1, max: 5 })
    _.times(numVintages, () => {
      const wineBottleSize = faker.random.arrayElement(wineBottleSizes)

      vintageArray.push({
        year: faker.random.number({ min: 2000, max: 2016 }),
        wineId: w.id,
        wineName: w.wineName,
        vineyardId: w.vineyardId,
        vineyardName: w.vineyardName,
        bottleSize: wineBottleSize.id,
        bottlesPerCase: wineBottleSize.bottlesPerCase,
        casesPerLayer: faker.random.number({ min: 8, max: 14 }),
        casesPerPallet: faker.random.number({ min: 45, max: 65 }),
        pricePerCase: faker.random.number({ min: 80, max: 200 }),
        latestPress: faker.lorem.sentence(),
        casesInStock: faker.random.number({ min: 5, max: 200 }),
        casesOnOrder: faker.random.number({ min: 5, max: 200 }),
        createDate: new Date().valueOf(),
        terminateDate: null,
      })
    })
  }

  for (let v of vintageArray) {
    let doc = db.collection('vintages').doc()

    doc
      .set(v)
      .then(() => {
        console.log(`${v.wineName} ${v.year} added to firestore!`)
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

main()

/* eslint-disable no-console */

const _ = require('lodash')
const admin = require('firebase-admin')
const csv = require('csvtojson')
const faker = require('faker')
const path = require('path')
const config = require('../config')
const serviceAccount = require('../../serviceAccountKey.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: config.DB_URL,
})
const db = admin.firestore()

async function main() {
  console.log('<---------- Importing Questions ---------->')

  let dataArray = await csv().fromFile(path.resolve(__dirname, 'questions.csv'))
  console.log('Records loaded: ', dataArray.length)

  if (dataArray.length === 0) {
    console.log('No Question data, generating fake data...')

    _.times(config.numberOf.questions, () => {
      const questionObj = {
        question: faker.lorem.sentence(),
        answerOne: faker.lorem.words(),
        answerOneVal: faker.random.number({ min: 5, max: 60 }),
        answerTwo: faker.lorem.words(),
        answerTwoVal: faker.random.number({ min: 5, max: 60 }),
        answerThree: faker.lorem.words(),
        answerThreeVal: faker.random.number({ min: 5, max: 60 }),
        answerFour: faker.lorem.words(),
        answerFourVal: faker.random.number({ min: 5, max: 60 }),
        answerFive: faker.lorem.words(),
        answerFiveVal: faker.random.number({ min: 5, max: 60 }),
      }
      dataArray.push(questionObj)
    })
  }
  console.log('Loading Data: ', dataArray)

  for (let data of dataArray) {
    let obj = {
      question: data.question,
      answers: [
        { answer: data.answerOne, value: parseInt(data.answerOneVal) },
        { answer: data.answerTwo, value: parseInt(data.answerTwoVal) },
        { answer: data.answerThree, value: parseInt(data.answerThreeVal) },
        { answer: data.answerFour, value: parseInt(data.answerFourVal) },
        { answer: data.answerFive, value: parseInt(data.answerFiveVal) },
      ],
    }

    let doc = db.collection('questions')

    doc
      .add(obj)
      .then((docRef) => {
        console.log(
          `${obj.question} is successed adding to firestore ${docRef}!`,
        )
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

main()

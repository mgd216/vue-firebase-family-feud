const functions = require('firebase-functions')
const admin = require('firebase-admin')
const { v4: uuidv4 } = require('uuid')
const USER_ROLES = require('./user-roles.constant')

if (process.env.NODE_ENV === 'development') {
  console.log('<---- FUNCTIONS RUNNING IN DEVELOPMENT (EMULATOR) ----->')
  const serviceAccount = require('../serviceAccountKey.json')
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://vue-firebase-family-feud.firebaseio.com',
  })
} else {
  console.log('<---- FUNCTIONS RUNNING IN PRODUCTION ----->')
  admin.initializeApp()
}

const db = admin.firestore()

exports.createUser = functions.https.onCall(async (data, context) => {
  if (!context.auth.token.ADMIN) {
    throw new functions.https.HttpsError(
      'NOT AUTHORIZED',
      'Not authorized to create user.',
    )
  }

  if (!Object.values(USER_ROLES).includes(data.role)) {
    throw new functions.https.HttpsError(
      'INVALIDE ROLE',
      `${data.role} is an invalid role.`,
    )
  }

  try {
    //create new user in Firebase Authentication
    const newUser = {
      email: data.email,
      emailVerified: false,
      password: uuidv4(),
      displayName: `${data.firstName} ${data.lastName}`,
      disabled: false,
    }

    const userRecord = await admin.auth().createUser(newUser)
    const userId = userRecord.uid

    //create user role (called claims in Firebase)
    const claims = {}
    claims[data.role] = true

    await admin.auth().setCustomUserClaims(userId, claims)
    await db
      .collection('roles')
      .doc(userId)
      .update({
        role: { [data.role]: true },
      })

    //create user settings
    const userSettings = {
      navigation: [],
      quickLinks: [],
      showNotifications: false,
    }
    await admin
      .firestore()
      .collection('user_settings')
      .doc(userId)
      .set(userSettings)

    //create user profile
    const userProfile = {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone || null,
      profileImgUrl: null,
      role: data.role,
      createDate: new Date().valueOf(),
      terminateDate: null,
    }

    await admin.firestore().collection('users').doc(userId).set(userProfile)

    return { success: true }
  } catch (error) {
    throw new functions.https.HttpsError('INTERNAL ERROR', error.message)
  }
})

exports.setUserRole = functions.https.onCall(async (data, context) => {
  if (!context.auth.token.ADMIN) {
    throw new functions.https.HttpsError(
      'NOT AUTHORIZED',
      'Not authorized to update user role.',
    )
  }

  try {
    let claims = {}
    for (const role of Object.values(USER_ROLES)) {
      claims[role] = role === data.role
    }

    await admin.auth().setCustomUserClaims(data.uid, claims)

    await db
      .collection('roles')
      .doc(data.uid)
      .update({
        role: { [data.role]: true },
      })

    return db.collection('users').doc(data.uid).update({ role: data.role })
  } catch (error) {
    throw new functions.https.HttpsError('INTERNAL ERROR', error.message)
  }
})

exports.terminateUser = functions.https.onCall(async (userId, context) => {
  if (!context.auth.token.ADMIN) {
    throw new functions.https.HttpsError(
      'NOT AUTHORIZED',
      'Not authorized to terminate a user.',
    )
  }

  try {
    await admin.auth().updateUser(userId, {
      disabled: true,
    })

    return db
      .collection('users')
      .doc(userId)
      .update({ terminateDate: new Date().valueOf() })
  } catch (error) {
    throw new functions.https.HttpsError('INTERNAL ERROR', error.message)
  }
})

exports.activateUser = functions.https.onCall(async (userId, context) => {
  if (!context.auth.token.ADMIN) {
    throw new functions.https.HttpsError(
      'NOT AUTHORIZED',
      'Not authorized to activate a user.',
    )
  }

  try {
    await admin.auth().updateUser(userId, {
      disabled: false,
    })

    return db.collection('users').doc(userId).update({ terminateDate: null })
  } catch (error) {
    throw new functions.https.HttpsError('INTERNAL ERROR', error.message)
  }
})

exports.updateCompanyInfo = functions.https.onCall(async (info, context) => {
  if (!context.auth.token.ADMIN) {
    throw new functions.https.HttpsError(
      'NOT AUTHORIZED',
      'Not authorized to update company information.',
    )
  }

  try {
    return db.collection('system_vars').doc('COMPANY_INFO').update(info)
  } catch (error) {
    throw new functions.https.HttpsError('INTERNAL ERROR', error.message)
  }
})

exports.updateUserNotification = functions.https.onCall(
  async (notification, context) => {
    if (!context.auth.token.ADMIN) {
      throw new functions.https.HttpsError(
        'NOT AUTHORIZED',
        'Not authorized to update user notification.',
      )
    }

    try {
      return db
        .collection('system_vars')
        .doc('USER_NOTIFICATION')
        .update(notification)
    } catch (error) {
      throw new functions.https.HttpsError('INTERNAL ERROR', error.message)
    }
  },
)

exports.updateUserNotifications = functions.https.onCall(
  async (status, context) => {
    if (!context.auth.token.ADMIN) {
      throw new functions.https.HttpsError(
        'NOT AUTHORIZED',
        'Not authorized to update user notifications.',
      )
    }
    console.log('STARTING NOTIFICATION UPDATE: ', status)

    try {
      await db
        .collection('system_vars')
        .doc('USER_NOTIFICATION')
        .update({ active: status })

      const collection = db.collection('user_settings')
      collection.get().then(async (response) => {
        let batch = db.batch()
        response.docs.forEach((doc) => {
          const docRef = db.collection('user_settings').doc(doc.id)
          batch.update(docRef, { showNotifications: status })
        })
        await batch.commit()
      })

      return { success: true }
    } catch (error) {
      throw new functions.https.HttpsError('INTERNAL ERROR', error.message)
    }
  },
)

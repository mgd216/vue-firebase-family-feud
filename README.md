# Vue Firebase Family Feud Game

Demonstration application of:

- Vue
- Vuetify
- Firebase

## Project setup

```
npm install
```

Set your local environment variables from [Firebase Console](https://console.firebase.google.com/) Settings / General / Web Config in .env.local:

```
VUE_APP_FIREBASE_API_KEY=
VUE_APP_FIREBASE_API_ID=
VUE_APP_FIREBASE_AUTH_DOMAIN=
VUE_APP_FIREBASE_DATABASE_URL=
VUE_APP_FIREBASE_PROJECT_ID=
VUE_APP_FIREBASE_STORAGE_BUCKET=
VUE_APP_FIREBASE_MESSAGING=
VUE_APP_GOOGLE_API_KEY=
```

Set the service key for testing Firebase Functions in ./functions/serivceAccountKey.json, key is generated from [Firebase Console](https://console.firebase.google.com/) Settings / Service Accounts:

```
{
  "type": "service_account",
  "project_id": "",
  "private_key_id": "",
  "private_key": "-----BEGIN PRIVATE KEY-----\n-----END PRIVATE KEY-----\n",
  "client_email": "",
  "client_id": "",
  "auth_uri": "",
  "token_uri": "",
  "auth_provider_x509_cert_url": "",
  "client_x509_cert_url": ""
}
```

### Test Functions Locally

To test Firebase functions locally, makes sure the serivceAccountKey.json is set above. goto ./functions and then **npm run serve**. You can attached a debugger using the VSCode Attach to Node process.

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## Resources

Role based authentication:

- https://softauthor.com/vue-js-firebase-role-based-authentication/
- https://www.toptal.com/firebase/role-based-firebase-authentication

Securing Firestore Rules:

- https://softauthor.com/firestore-security-rules/

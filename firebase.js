import 'dotenv/config'
import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'
import admin from 'firebase-admin'
import serviceAccount from './serviceAccountKey.json' with { type: "json" }

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    databaseURL: process.env.DATABASE_URL,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getDatabase(app)
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

export { db, admin }

import express from 'express'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { child, ref, get } from 'firebase/database'
import { db } from '../firebase.js'
import { admin, validateUserCreation, validateUserRetrieval, verifyToken } from '../middleware/index.js' 

const router = express.Router()
const auth = getAuth()

router.post('/signup', validateUserCreation, (req, res) => {
    const email = req.body.email
    const password = req.body.password

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            res.status(200).json(user)
        })
        .catch((error) => {
            res.status(400).json(error)
        })
})

router.post('/login', validateUserRetrieval, (req, res) => {
    const email = req.body.email
    const password = req.body.password

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user
            res.status(200).json(user)
        })
        .catch((error) => {
            res.status(400).json(error)
        })
})

router.post('/make-admin', async (req, res) => {
  const { uid } = req.body;
  if (!uid) return res.status(400).send('UID is required')

  try {
    await admin.auth().setCustomUserClaims(uid, { admin: true });
    res.send(`User ${uid} is now an admin.`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Failed to set admin claim.');
  }
});

router.get('/user/:userId', verifyToken, (req, res) => {
    const userId = req.params.userId
    const dbRef = ref(db)

    get(child(dbRef, `users/${userId}`)).then((snapshot) => {
        if (snapshot.val()) {
            res.status(200).json(snapshot.val())
        }
        res.status(404).json("USER NOT FOUND")
    }).catch((error) => {
        res.status(400).json(error)
    })
})

export default router

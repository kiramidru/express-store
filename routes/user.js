import express from 'express'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { child, ref, get, set } from 'firebase/database'
import db from '../firebase.js'
import { admin, authenticateFirebaseToken } from '../middleware/index.js' 
import validateUserCreation from '../middleware/validateUser.js'

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
            const errorMessage = error.message
            res.status(400).json(error)
        })
})

router.post('/login', (req, res) => {
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

router.get('/user/:userId', async (req, res) => {
    const userId = req.params.userId
    const dbRef = ref(db)

    const snapshot = get(child(dbRef, `users/${userId}`)).then((snapshot) => {
        if (snapshot.val()) {
            res.status(200).json(snapshot.val())
        } else {
            res.status(404)
        }
    }).catch((error) => {
        res.status(400).json(error)
    })
})

router.post('/createUser', (req, res) => {
    const body = req.body
    const email = body.email
    const password = body.password
    try {
        admin.auth().createUser({
            email,
            password
        })
        res.status(200).json(body)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})


router.get('/secure-data', authenticateFirebaseToken, (req, res) => {
  res.json({
    message: 'Access granted',
    uid: req.user.uid,
    email: req.user.email,
  });
})

export default router

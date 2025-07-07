import express from 'express'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { child, ref, get, set } from 'firebase/database'
import db from '../database.js'
import authenticateFirebaseToken from '../middleware/index.js' 
import validateUserCreation from '../middleware/validateUserCreation.js'

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
        res.status(200).json(snapshot.val())
    }).catch((error) => {
        res.status(400).json(error)
    })
})

router.post('/createUser', (req, res) => {
    const body = req.body

    set(ref(db, 'users/' + body.userId), {
        username: body.username,
        email: body.email,
    })
    res.status(200).json(body)
})


router.get('/secure-data', authenticateFirebaseToken, (req, res) => {
  res.json({
    message: 'Access granted',
    uid: req.user.uid,
    email: req.user.email,
  });
})

export default router

import 'dotenv/config'
import express from 'express'
import db from './database.js'
import { child, ref, get, set } from "firebase/database";

const app = express()
app.use(express.json())
const PORT = process.env.PORT || 8000

app.get('/user/:userId', (req, res) => {
    const userId = req.params.userId
    const dbRef = ref(db)
    const snapshot = get(child(dbRef, `users/${userId}`)).then((snapshot) => {
        res.json(snapshot.val())
    }).catch((error) => {
        res.json(error)
    });
})

app.post('/createUser', (req, res) => {
    set(ref(db, 'users/' + req.body.userId), {
        username: req.body.username,
        email: req.body.email,
    });
    res.json(req.body)
})
app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
})

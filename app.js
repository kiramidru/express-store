import 'dotenv/config'
import express from 'express'
import db from './database.js'
import { ref, set } from "firebase/database";

const app = express()
app.use(express.json())
const PORT = process.env.PORT || 8000

app.get('/user', (req, res) => {
    res.json("HELLO")
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

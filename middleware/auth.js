// middleware/auth.js
import { admin } from '../firebase.js'

const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized: No token provided" })
    }

    const idToken = authHeader.split("Bearer ")[1]
    admin.auth().verifyIdToken(idToken).then((claims) => {
        if (claims.admin) {
            req.user = decodedToken
            next()
        } else {
            res.status(400).json({ error: "Unauthorized"})
        }
    }).catch((error) => {
        console.error("Error verifying token: ", error)
        res.status(400).json({ error: "Unauthorized: Invalid token" })
    })

}

export { verifyToken }

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const verifyToken = (req, res, next) => {
    const JWT_SECRET = process.env.JWT_SECRET

    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized: No token provided" })
    }

    const accessToken = authHeader.split("Bearer ")[1]

    jwt.verify(accessToken, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "invalid or expired token" })
        }
        req.user = user
        next()
    })
}


async function hashData(password) {
    const saltRounds = 12
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds)
        return hashedPassword
    } catch (err) {
        console.error("error:", err)
        throw err
    }
}

async function verifyPassword(password, hashedPassword) {
    try {
        const match = await bcrypt.compare(password, hashedPassword)
        return match
    } catch (err) {
        console.error("error:", err)
        throw err
    }
}

export { verifyToken, hashData, verifyPassword }

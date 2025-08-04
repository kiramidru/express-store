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

const isAdmin = (req, res, next) => {
    if (req.user?.role === 'ADMIN') {
        next()
    } else {
        return res.status(403).json({ message: 'Access Denied: Admin Only' })
    }
}

const isSeller = (req, res, next) => {
    console.log(req.user.role)
    if (req.user?.role === 'SELLER') {
        next()
    } else {
        return res.status(403).json({ message: 'Acces Denied: Sellers Only' })
    }
}

const isCustomer = (req, res, next) => {
    if (req.user?.role === 'CUSTOMER') {
        next()
    } else {
        return res.status(403).json({ message: 'Access Denied: Customers Only' })
    }
}

const isVerified = (req, res, next) => {
    if (req.user?.verified) {
        next()
    } else {
        return res.status(403).json({ message: 'Access Denied: Account not verified' })
    }
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

export { verifyToken, isAdmin, isSeller, isCustomer, isVerified, hashData, verifyPassword }

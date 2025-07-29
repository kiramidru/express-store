import { validateUserCreation, validateUserRetrieval } from '../middleware/index.js'
import prisma from '../prisma.js'
import express from 'express'
import jwt from 'jsonwebtoken'
import { hashData, verifyPassword } from '../middleware/auth.js'

const router = express.Router()


router.post('/signup', validateUserCreation, async (req, res) => {
    const { email, firstName, lastName, password, role } = req.body
    const hashedPassword = await hashData(password)
    try {
        const user = await prisma.user.create({
            data: {
                email,
                firstName,
                lastName,
                password: hashedPassword,
                role,
                verified: false,
            }
        })
        res.status(201).json(user)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

router.post('/login', validateUserRetrieval, async (req, res) => {
    const JWT_SECRET = process.env.JWT_SECRET
    const REFRESH_SECRET = process.env.REFRESH_SECRET
    const accessTokenExpiresIn = '15m'
    const accessTokenExpiresAt = Math.floor(Date.now() / 1000) + 1 * 60 * 60
    const refreshTokenExpiresIn = '7d'
    const refreshTokenExpiresAt = Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60

    const { email, password } = req.body

    const user = await prisma.user.findUnique({
        where: { email: email }
    })

    if (!user) {
        res.status(400).json("user not found")
    }

    const match = await verifyPassword(password, user.password)

    if (user.email == email && match) {
        const accessToken = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
            expiresIn: accessTokenExpiresIn,
        })
        const refreshToken = jwt.sign({ userId: user.id }, REFRESH_SECRET, {
            expiresIn: refreshTokenExpiresIn,
        })

        const hashedToken = await hashData(refreshToken)

        await prisma.refreshToken.create({
            data: {
                userId: user.id,
                tokenHash: hashedToken,
                expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            }
        })

        res.status(200).json({
            accessToken: accessToken,
            accessTokenExpiration: accessTokenExpiresAt,
            refreshToken: refreshToken,
            refreshTokenExpiration: refreshTokenExpiresAt
        })
    } else {
        res.status(400).json("incorrect email or password")
    }
})

export default router

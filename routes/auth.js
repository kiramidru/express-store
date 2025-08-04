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


    const { email, password } = req.body
    const accessTokenExpiresIn = '15m'
    const accessTokenExpiresAt = Math.floor(Date.now() / 1000) + 1 * 60 * 60
    const refreshTokenExpiresIn = '7d'
    const refreshTokenExpiresAt = Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60

    await prisma.refreshToken.deleteMany({
        where: {
            userId: user.id,
            isRevoked: false,
            gt: new Date(),
        },
    })

    const user = await prisma.user.findUnique({
        where: { email }
    })

    if (!user) {
        res.status(400).json("user not found")
    }

    const match = await verifyPassword(password, user.password)

    if (user.email == email && match) {
        const accessToken = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
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

router.post('/refresh', async (req, res) => {
    const refreshToken = req.body.refreshToken
    const accessTokenExpiresIn = '15m'
    const accessTokenExpiresAt = Math.floor(Date.now() / 1000) + 1 * 60 * 60
    const refreshTokenExpiresIn = '7d'
    const refreshTokenExpiresAt = Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60

    await prisma.refreshToken.deleteMany({
        where: {
            userId: user.id,
            isRevoked: false,
            gt: new Date(),
        },
    })
    const hashedToken = await hashData(refreshToken)

    const storedToken = await prisma.refreshToken.findUnique({
        where: { token: hashedToken },
        include: { user: true },
    })

    if (!storedToken) {
        return res.status(403).json({ error: 'Invalid or expired token' });
    }

    const userId = storedToken.userId;

    await prisma.refreshToken.update({
        where: { token: hashedToken }
    })

    const newRefreshToken = jwt.sign({ userId: userId }, REFRESH_SECRET, {
        expiresIn: refreshTokenExpiresIn,
    })

    const newAccessToken = jwt.sign({ userId: userId, role: user.role }, JWT_SECRET, {
        expiresIn: accessTokenExpiresIn,
    })

    res.status(200).json({
        accessToken: newAccessToken,
        accessTokenExpiresAt,
        refreshToken: newRefreshToken,
        refreshTokenExpiresAt
    })
})

export default router

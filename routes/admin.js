import express from 'express'
import { isAdmin, verifyToken } from '../middleware/auth.js'

const router = express.Router()

router.use(verifyToken)
router.use(isAdmin)

router.post('/category', async (req, res) => {
    const name = req?.user.id

    try {
        const category = await prisma.category.create({
            data: { name }
        })
        res.status(200).json(category)
    } catch (err) {
        res.status(400).json(err.message)
    }
})

router.post('/subCategory', async (req, res) => {
    const { name, parent } = req?.user.id

    try {
        const subCategory = await prisma.category.create({
            data: { name, parent }
        })
        res.status(200).json(subCategory)
    } catch (err) {
        res.status(400).json(err.message)
    }
})

router.post('/verifyUser', async (req, res) => {
    const userId = req?.user.id

    try {
        const user = await prisma.user.update({
            where: { id: userId },
            data: {
                verified: true
            }
        })
        res.status(200).json(user)
    } catch (err) {
        res.status(400).json(err.message)
    }
})

export default router

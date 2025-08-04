import express from 'express'
import prisma from '../prisma.js'
import { isSeller, isVerified, verifyToken } from '../middleware/auth.js'

const router = express.Router()
router.use(verifyToken)
router.use(isSeller)
router.use(isVerified)

router.post('/brand', async (req, res) => {
    const userId = req?.user.id
    const { name, description, logoUrl, websiteUrl } = req.body

    try {
        const brand = await prisma.brand.create({
            data: {
                name,
                description,
                logoUrl,
                websiteUrl,
                userId
            }
        })
        res.status(200).json(brand)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

router.post('/product', async (req, res) => {
    const userId = req?.user.id
    const { name, description, brandId, categoryId, price } = req.body

    try {
        const product = await prisma.product.create({
            data: {
                name,
                description,
                brandId,
                userId,
                categoryId,
                price
            }
        })
        res.status(200).json(product)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

router.get('/orders', async (req, res) => {
    const { productId } = req?.body

    try {
        const orders = await prisma.order.findMany({
            where: { productId }
        })

        res.status(200).json(orders)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

export default router

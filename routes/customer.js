import express from 'express'
import prisma from '../prisma.js'
import { verifyToken, isCustomer } from '../middleware/auth.js'

const router = express.Router()

router.use(verifyToken)
router.use(isCustomer)

router.post('/order', async (req, res) => {
    const userId = req?.user.id
    const { productId, amount } = req.body

    try {
        const product = await prisma.product.findUnique({
            where: { productID }
        })

        const priceAtPurchase = product.price

        await prisma.order.create({
            data: { userId, productId, amount, priceAtPurchase }
        })
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

router.get('/orders', async (req, res) => {
    const { userId } = req?.user.id

    try {
        const orders = await prisma.order.findMany({
            where: { userId }
        })

        res.status(200).json(orders)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

router.get('/products', async (req, res) => {
    const { category } = req.query
    const { page, limit } = req?.body
    const skip = (page - 1) * limit

    const [products, totalCount] = await Promise.all([
        await prisma.product.findMany({
            where: {
                category,
            },
            skip,
            take: limit
        }),
        prisma.product.count()
    ])

    const totalPages = Math.ceil(totalCount / limit)

    res.status(200).json({
        data: products,
        meta: {
            totalItems: totalCount,
            totalPages: totalPages,
            currentPage: page
        }
    })
})

export default router

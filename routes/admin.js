import express from 'express'
import { isAdminMiddleware } from '../middleware/admin.js'

const router = express.Router()

router.use(isAdminMiddleware)

router.post('/admin/createCategory', async (req, res) => {
    const name = req.body

    try {
        const category = await prisma.category.create({
            data: {
                name: name
            }
        })
        res.status(200).json(category)
    } catch (err) {
        res.status(400).json(err.message)
    }
})

router.post('/admin/createSubCategory', async (req, res) => {
    const { name, parent } = req.body

    try {
        const subCategory = await prisma.category.create({
            data: {
                name: name,
                parent: parent
            }
        })
        res.status(200).json(subCategory)
    } catch (err) {
        res.status(400).json(err.message)
    }
})

router.post('/admin/verifyUser', async (req, res) => {
    const { email } = req.body

    try {
        const user = await prisma.user.update({
            where: { email: email },
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

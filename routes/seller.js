import express from 'express'

const router = express.Router()

router.post('/createBrand', async (req, res) => {
    const { name, description, logoUrl, websiteUrl } = req.body
    try {
        const brand = await prisma.brand.create({
            data: {
                name,
                description,
                logoUrl,
                websiteUrl
            }
        })
        res.status(200).json(brand)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

router.post('/createProduct', (req, res) => {
    const { name, description, }
})

export default router

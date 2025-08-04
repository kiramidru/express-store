import express from 'express'

import auth from './auth.js'
import admin from './admin.js'
import seller from './seller.js'
import customer from './customer.js'

const router = express.Router()

router.use('/', auth)
router.use('/admin', admin)
router.use('/seller', seller)
router.use('/customer', customer)

export default router

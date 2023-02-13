import controller from '../controllers/products.controller.js'
import express from 'express'
import isAdmin from '../middlewares/isAdmin.js'
const router = express.Router()

const { get_products, get_product, updateProducts } = controller

router.get('/', get_products)
router.get('/:id', get_product)
router.put('/stock', updateProducts)

export default router

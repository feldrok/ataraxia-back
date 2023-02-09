import controller from '../controllers/products.controller.js'
import express from 'express'
const router = express.Router()

const { get_products, get_product } = controller

router.get('/', get_products)
router.get('/:id', get_product)

export default router
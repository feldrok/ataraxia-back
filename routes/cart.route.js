import { createSchema, deleteProductSchema, updateSchema } from '../schemas/cart.schema.js'

import controller from '../controllers/cart.controller.js'
import express from 'express'
import validator from '../middlewares/validator.js'

const router = express.Router()

const { create, add_product_to_cart, get_user_cart, update_cart, delete_product, empty_cart } =
    controller

router.post('/', validator(createSchema), create)
router.get('/', get_user_cart)
router.put('/add', validator(updateSchema), add_product_to_cart)
router.put('/update', validator(updateSchema), update_cart)
router.put('/delete', validator(deleteProductSchema), delete_product)
router.put('/empty', empty_cart)

export default router

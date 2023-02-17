import { createSchema, deleteProductSchema, updateSchema } from '../schemas/cart.schema.js'

import controller from '../controllers/cart.controller.js'
import express from 'express'
import validator from '../middlewares/validator.js'

const router = express.Router()

const { create, add_product_to_cart, get_user_cart, update_cart, delete_product, empty_cart, apply_coupon } =
    controller

router.post('/:id', validator(createSchema), create)
router.get('/:id', get_user_cart)
router.put('/add/:id', validator(updateSchema), add_product_to_cart)
router.put('/update/:id', validator(updateSchema), update_cart)
router.put('/delete/:id', validator(deleteProductSchema), delete_product)
router.put('/empty/:id', empty_cart)
router.put('/coupon/:id', apply_coupon)

export default router

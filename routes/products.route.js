import controller from '../controllers/products.controller.js'
import express from 'express'
import isAdmin from '../middlewares/isAdmin.js'
import passport from 'passport'
import { updateSchema } from '../schemas/product.schema.js'
import validate from '../middlewares/validator.js'
const router = express.Router()

const { get_products, get_product, update_product } = controller

router.get('/', get_products)
router.get('/:id', get_product)
router.put(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    isAdmin,
    validate(updateSchema),
    update_product
)

export default router

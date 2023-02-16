import controller from '../controllers/products.controller.js'
import express from 'express'
import isAdmin from '../middlewares/isAdmin.js'
import passport from 'passport'
import productExists from '../middlewares/productExists.js'
import { updateSchema } from '../schemas/product.schema.js'
import validate from '../middlewares/validator.js'
const router = express.Router()

const { create, get_products, get_product, update_product } = controller

router.post('/', passport.authenticate('jwt', { session: false }), isAdmin, validate(updateSchema), productExists, create)
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

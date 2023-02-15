import controller from '../controllers/products.controller.js'
import express from 'express'
import isAdmin from '../middlewares/isAdmin.js'
import passport from 'passport'
const router = express.Router()

const { get_products, get_product, update_product } = controller

router.get('/', get_products)
router.get('/:id', get_product)
router.put('/:id', passport.authenticate("jwt", { session: false }), isAdmin, update_product)

export default router

import controller from '../controllers/orders.controller.js'
import express from 'express'
import isAdmin from '../middlewares/isAdmin.js'
import orderExists from '../middlewares/orderExists.js'
import passport from 'passport'
import { schema } from '../schemas/order.schema.js'
import validator from '../middlewares/validator.js'
const router = express.Router()

const { create, get_orders_user, update_order_user, get_orders, get_order } = controller

router.post('/:id', validator(schema), orderExists, create)
router.get('/all', passport.authenticate("jwt", { session: false }), isAdmin, get_orders)
router.get('/',passport.authenticate("jwt", { session: false }), get_orders_user)
router.get('/:id', get_order)
router.put('/order/:id', passport.authenticate("jwt", { session: false }), isAdmin, update_order_user)

export default router

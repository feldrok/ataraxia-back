import controller from '../controllers/orders.controller.js'
import express from 'express'
import isAdmin from '../middlewares/isAdmin.js'
import { schema } from '../schemas/order.shchema.js'
import validator from '../middlewares/validator.js'
import passport from 'passport'
const router = express.Router()

const { create, get_orders_user, update_order_user, get_orders } = controller

router.get('/all', isAdmin, get_orders)
router.get('/', get_orders_user)
router.post('/:id', validator(schema), create)
router.put('/order/:id', isAdmin, update_order_user)

export default router

import controller from "../controllers/order.controller.js"
import { schema } from '../schemas/order.shchema.js'
import express from 'express'
import validator from '../middlewares/validator.js'
const router = express.Router()

const { create, get_orders_user } = controller

router.get('/', get_orders_user)
router.post('/:id', validator(schema), create)

export default router
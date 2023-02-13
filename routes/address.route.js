import addressExists from '../middlewares/addressExists.js'
import controller from '../controllers/address.controller.js'
import { createSchema } from '../schemas/address.schema.js'
import express from 'express'
import validator from '../middlewares/validator.js'

const router = express.Router()

const { create, get_user_addresses, get_address, delete_address } = controller

router.post('/', validator(createSchema), addressExists, create)
router.get('/', get_user_addresses)
router.get('/:id', get_address)
router.delete('/:id', delete_address)

export default router

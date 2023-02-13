import addressExists from '../middlewares/addressExists.js'
import controller from '../controllers/address.controller.js'
import express from 'express'

const router = express.Router()

const { create, get_user_addresses, get_address, delete_address } = controller

router.post('/', addressExists, create)
router.get('/', get_user_addresses)
router.get('/:id', get_address)
router.delete('/:id', delete_address)

export default router

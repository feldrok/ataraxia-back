import controller from '../controllers/rating.controller.js'
import express from 'express'

const router = express.Router()

const { create, getRating } = controller

router.post('/', create)
router.get('/:rating', getRating)

export default router
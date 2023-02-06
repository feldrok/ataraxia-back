import controller from '../controllers/users.controller.js'
import { createSchema } from '../schemas/users.schema.js'
import express from 'express'
import validator from '../middlewares/validator.js'
const router = express.Router()

const { signup } = controller

router.post('/signup', validator(createSchema),signup)

export default router
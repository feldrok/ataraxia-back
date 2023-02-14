import controller from '../controllers/rating.controller.js'
import express from 'express'
import passport from 'passport'
import { schema } from '../schemas/rating.schema.js'
import validator from '../middlewares/validator.js'

const router = express.Router()

const { create, get_product_rating, get_user_rating } = controller

router.post('/', passport.authenticate("jwt", { session: false }), validator(schema), create)
router.get('/:id', get_product_rating)
router.get('/user/:id', passport.authenticate("jwt", { session: false }), get_user_rating)

export default router
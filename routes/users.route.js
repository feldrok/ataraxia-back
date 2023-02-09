import controller from '../controllers/users.controller.js'
import { createSchema } from '../schemas/users.schema.js'
import express from 'express'
import passport from 'passport'
import validator from '../middlewares/validator.js'

const router = express.Router()

const { signup, verifyCode, signin, signintoken, signout } = controller

router.post('/signup', validator(createSchema), signup)
router.get('/verify_code', verifyCode)
router.post("signin", signin)
router.post("/token", passport.authenticate("jwt", {session: false}), signintoken)
router.put("/signout", passport.authenticate("jwt", { session: false }), signout)

export default router
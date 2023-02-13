import accountExistsSignIn from '../middlewares/accountExistsSignIn.js'
import accountExistsSignUp from '../middlewares/accountExistsSignUp.js'
import accountHasBeenVerified from '../middlewares/accountHasBeenVerified.js'
import controller from '../controllers/users.controller.js'
import { createSchema } from '../schemas/users.schema.js'
import express from 'express'
import mustSignIn from '../middlewares/mustSignIn.js'
import passport from '../config/passport.js'
import validator from '../middlewares/validator.js'

const router = express.Router()

const { signup, verifyCode, signin, signintoken, signout, get_profile_data } =
    controller

router.post('/signup', accountExistsSignUp, validator(createSchema), signup)
router.get('/verify_code', verifyCode)
router.get(
    '/profile',
    passport.authenticate('jwt', { session: false }),
    mustSignIn,
    get_profile_data
)
router.post('/signin', accountExistsSignIn, accountHasBeenVerified, signin)
router.post(
    '/token',
    passport.authenticate('jwt', { session: false }),
    mustSignIn,
    signintoken
)
router.put(
    '/signout',
    passport.authenticate('jwt', { session: false }),
    signout
)

export default router

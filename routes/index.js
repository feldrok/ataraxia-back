import categories from './categories.route.js'
import express from 'express'
import orders from './orders.route.js'
import products from './products.route.js'
import cart from './cart.route.js'
import users from './users.route.js'
import mercadopago from './mercadopago.route.js'
import passport from 'passport'
const router = express.Router()

router.get('/', function (req, res, next) {
    res.send('Server ready!')
})

router.use('/products', products)
router.use('/categories', categories)
router.use('/cart', passport.authenticate('jwt', { session: false }), cart)
router.use('/users', users)
router.use('/checkout', orders)
router.use('/payment', mercadopago)

export default router

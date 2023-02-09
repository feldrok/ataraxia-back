import categories from './categories.route.js'
import express from 'express'
import products from './products.route.js'
import users from './users.route.js'
import routerCart from './cart.route.js'
const router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
    res.send('Server ready!')
})

router.use('/users', users)
router.use('/cart', routerCart)
router.use('/products', products)
router.use('/categories', categories)

export default router

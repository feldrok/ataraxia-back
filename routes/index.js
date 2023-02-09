import categories from './categories.route.js'
import express from 'express'
import products from './products.route.js'
import users from './users.route.js'
import orders from './order.route.js'
const router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
    res.send('Server ready!')
})

router.use('/users', users)
router.use('/checkout', orders)
router.use('/products', products)
router.use('/categories', categories)

export default router

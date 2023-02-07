import express from 'express'
import products from './products.route.js'
import users from './users.route.js'
const router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
    res.send('Server ready!')
})

router.use('/users', users)
router.use('/products', products)

export default router

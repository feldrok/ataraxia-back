import express from 'express'
import users from './users.route.js'
import routerCart from './cart.route.js'
const router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
    res.send('Server ready!')
})

router.use('/users', users)
router.use('/cart', routerCart)

export default router

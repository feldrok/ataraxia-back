import express from 'express'
import users from './users.route.js'
import orders from './order.route.js'
const router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
    res.send('Server ready!')
})

router.use('/users', users)
router.use('/checkout', orders)

export default router

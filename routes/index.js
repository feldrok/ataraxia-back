import categories from './categories.route.js'
import express from 'express'
import products from './products.route.js'
import users from './users.route.js'
const router = express.Router()

router.get('/', function (req, res, next) {
    res.send('Server ready!')
})

router.use('/users', users)
<<<<<<< HEAD
router.use("/auth", users)
=======
router.use('/products', products)
router.use('/categories', categories)
>>>>>>> e60dda5352bb4dc20e91c2b0f993fd11934ebc63

export default router

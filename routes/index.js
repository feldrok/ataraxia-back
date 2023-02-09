import express from 'express'
import users from './users.route.js'
const router = express.Router()

router.get('/', function (req, res, next) {
    res.send('Server ready!')
})

router.use('/users', users)
router.use("/auth", users)

export default router

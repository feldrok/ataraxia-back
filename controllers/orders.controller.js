import { Order } from '../models/Order.model.js'
import defaultResponse from '../config/defaultResponse.js'

const controller = {
    create: async (req, res, next) => {
        const { user } = req
        const { id } = req.params
        const order = {
            user_id: user.id,
            cart_id: id,
            statusOrder: 'Approved',
        }
        try {
            await Order.create(order)
            req.body.succes = true
            req.body.sc = 201
            req.body.data = 'Order created successfully'
            return defaultResponse(req, res)
        } catch (error) {
            next(error)
        }
    },
    get_orders_user: async (req, res, next) => {
        const { user } = req
        try {
            const orders = await Order.find({ user_id: user.id })
            res.status(200).json({
                success: true,
                response: orders,
                message: 'Orders found',
            })
            return defaultResponse(req, res)
        } catch (error) {
            next(error)
        }
    },
}

export default controller

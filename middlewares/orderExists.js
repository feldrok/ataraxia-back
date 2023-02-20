import { Order } from '../models/Order.model.js'
import defaultResponse from '../config/defaultResponse.js'

async function orderExists(req, res, next) {
    const { preference_id } = req.query
    const order = await Order.findOne({ preference_id: preference_id })
    if (!order ) {
        next()
    }
    req.body.success = false
    req.body.sc = 401
    req.body.data = 'Order already exists'
    return defaultResponse(req, res)
}

export default orderExists

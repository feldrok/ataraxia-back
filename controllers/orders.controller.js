import { Cart } from '../models/Cart.model.js'
import { Order } from '../models/Order.model.js'
import defaultResponse from '../config/defaultResponse.js'

const controller = {
    create: async (req, res, next) => {
        try {
            const { id } = req.params
            const { preference_id, status } = req.query
            const cart = await Cart.findOne({ user_id: id })
            if (cart) {
                const total = cart.total_price
                const order = {
                    user_id: id,
                    products: cart.products,
                    statusOrder: status,
                    total_price: total,
                    preference_id: preference_id,
                }
                const orderExists = await Order.findOne({
                    preference_id: preference_id,
                })
                if (orderExists) {
                    req.body.success = false
                    req.body.sc = 400
                    req.body.data = 'Order already exists'
                    return defaultResponse(req, res)
                } else {
                    await Order.create(order)
                    await Cart.findOneAndUpdate(
                        { user_id: id },
                        {
                            $set: {
                                products: [],
                                total_price: 0,
                                coupon_id: null,
                            },
                        },
                        { new: true }
                    )
                    req.body.success = true
                    req.body.sc = 201
                    req.body.data = 'Order created successfully'
                    return defaultResponse(req, res)
                }
            } else {
                req.body.success = false
                req.body.sc = 404
                req.body.data = 'Cart not found'
                return defaultResponse(req, res)
            }
        } catch (error) {
            next(error)
        }
    },
    get_orders_user: async (req, res, next) => {
        const { user } = req
        try {
            const orders = await Order.find({ user_id: user.id })
            req.body.success = true
            req.body.sc = 200
            req.body.data = orders
            return defaultResponse(req, res)
        } catch (error) {
            next(error)
        }
    },
    update_order_user: async (req, res, next) => {
        const { id } = req.params
        const { status } = req.body
        try {
            const order = await Order.findOneAndUpdate(
                { _id: id },
                { $set: { statusOrder: status } },
                { new: true }
            )
            console.log(order)
            if (order) {
                req.body.success = true
                req.body.sc = 200
                req.body.data = 'Order updated successfully'
                return defaultResponse(req, res)
            } else {
                req.body.success = false
                req.body.sc = 404
                req.body.data = 'Order not found'
                return defaultResponse(req, res)
            }
        } catch (error) {
            next(error)
        }
    },
    get_orders: async (req, res, next) => {
        try {
            const orders = await Order.find().populate('user_id')
            req.body.success = true
            req.body.sc = 200
            req.body.data = orders
            return defaultResponse(req, res)
        } catch (error) {
            next(error)
        }
    },
    get_order: async (req, res, next) => {
        const { id } = req.params
        try {
            const order = await Order.findOne({ preference_id: id }).populate('products.product_id')
            if (order) {
                req.body.success = true
                req.body.sc = 200
                req.body.data = order
                return defaultResponse(req, res)
            } else {
                req.body.success = false
                req.body.sc = 404
                req.body.data = 'Order not found'
                return defaultResponse(req, res)
            }
        } catch (error) {
            next(error)
        }
    },
}

export default controller

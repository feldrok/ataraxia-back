import { Cart } from '../models/Cart.model.js'
import { Coupon } from '../models/Coupon.model.js'
import { Product } from '../models/Product.model.js'
import defaultResponse from '../config/defaultResponse.js'
import mongoose from 'mongoose'

const controller = {
    create: async (req, res, next) => {
        try {
            const { id } = req.params
            if (!mongoose.isValidObjectId(id)) {
                id = mongoose.Types.ObjectId(id)
            }
            const { product_id, quantity } = req.body
            const productsPrice = await (
                await Product.find({ _id: { $in: product_id } })
            ).map((product) => product.price)
            const total = productsPrice.reduce(
                (total, price) => total + price * quantity,
                0
            )
            const cart = await Cart.create({
                user_id: id,
                products: [
                    {
                        product_id: product_id,
                        quantity: quantity,
                    },
                ],
                total_price: total,
            })
            req.body.success = true
            req.body.sc = 201
            req.body.data = cart
            return defaultResponse(req, res)
        } catch (error) {
            next(error)
        }
    },
    get_user_cart: async (req, res, next) => {
        try {
            const { id } = req.params
            if (!mongoose.isValidObjectId(id)) {
                id = mongoose.Types.ObjectId(id)
            }
            const cart = await Cart.find({ user_id: id }).populate(
                'products.product_id'
            )
            req.body.success = true
            req.body.sc = 200
            req.body.data = cart
            return defaultResponse(req, res)
        } catch (error) {
            next(error)
        }
    },
    add_product_to_cart: async (req, res, next) => {
        try {
            const { id } = req.params
            if (!mongoose.isValidObjectId(id)) {
                id = mongoose.Types.ObjectId(id)
            }
            const { product_id, quantity } = req.body
            let cart = await Cart.findOne({ user_id: id }).populate(
                'products.product_id'
            )
            const cartProducts = cart.products.map(
                (product) => product.product_id
            )
            const updatedProduct = cartProducts.find(
                (product) => product._id.toString() === product_id
            )
            if (updatedProduct) {
                let cart = await Cart.findOne({ user_id: id }).populate(
                    'products.product_id'
                )
                const updatedCart = cart.products.map((product) => {
                    if (product.product_id._id.toString() === product_id) {
                        return {
                            product_id: updatedProduct._id,
                            quantity: product.quantity + quantity,
                        }
                    } else {
                        return {
                            product_id: product.product_id._id,
                            quantity: product.quantity,
                        }
                    }
                })
                cart = await Cart.findOneAndUpdate(
                    { user_id: id },
                    { $set: { products: updatedCart } },
                    { new: true }
                )
                cart = await Cart.findOne({ user_id: id }).populate(
                    'products.product_id'
                )
                const productsPrice = cart.products.map(
                    (product) => product.product_id.price
                )
                const productsQuantity = cart[0].products.map(
                    (product) => product.quantity
                )
                const total = productsPrice.reduce(
                    (total, price, index) =>
                        total + price * productsQuantity[index],
                    0
                )
                if (total === 0) {
                    total = productsPrice[0].price
                }
                cart = await Cart.findOneAndUpdate(
                    { user_id: id },
                    { $set: { products: updatedCart, total_price: total } },
                    { new: true }
                )
                req.body.success = true
                req.body.sc = 200
                req.body.data = cart
                return defaultResponse(req, res)
            } else {
                let product = await Product.findOne({ _id: product_id })
                let cart = await Cart.findOne({ user_id: id })
                let total = cart.total_price + product.price * quantity
                cart = await Cart.findOneAndUpdate(
                    { user_id: id },
                    {
                        $push: {
                            products: {
                                product_id: product_id,
                                quantity: quantity,
                            },
                        },
                        $set: { total_price: total },
                    },
                    { new: true }
                )
                req.body.success = true
                req.body.sc = 200
                req.body.data = cart
                return defaultResponse(req, res)
            }
        } catch (error) {
            next(error)
        }
    },
    update_cart: async (req, res, next) => {
        try {
            const { id } = req.params
            if (!mongoose.isValidObjectId(id)) {
                id = mongoose.Types.ObjectId(id)
            }
            const { product_id, quantity } = req.body
            let cart = await Cart.findOne({ user_id: id }).populate(
                'products.product_id'
            )
            const cartProducts = cart.products.map(
                (product) => product.product_id
            )

            const updatedProduct = cartProducts.find(
                (product) => product._id.toString() === product_id
            )
            if (updatedProduct) {
                let cart = await Cart.findOne({ user_id: id }).populate(
                    'products.product_id'
                )
                const updatedCart = cart.products.map((product) => {
                    if (product.product_id._id.toString() === product_id) {
                        return {
                            product_id: updatedProduct._id,
                            quantity: quantity,
                        }
                    } else {
                        return {
                            product_id: product.product_id._id,
                            quantity: product.quantity,
                        }
                    }
                })
                cart = await Cart.findOneAndUpdate(
                    { user_id: id },
                    { $set: { products: updatedCart } },
                    { new: true }
                )
                cart = await Cart.findOne({ user_id: id }).populate(
                    'products.product_id'
                )
                const productsPrice = cart.products.map(
                    (product) => product.product_id.price
                )
                const productsQuantity = cart.products.map(
                    (product) => product.quantity
                )
                const total = productsPrice.reduce(
                    (total, price, index) =>
                        total + price * productsQuantity[index],
                    0
                )
                cart = await Cart.findOneAndUpdate(
                    { user_id: id },
                    {
                        $set: {
                            products: updatedCart,
                            total_price: total,
                            coupon_id: null,
                        },
                    },
                    { new: true }
                )
                req.body.success = true
                req.body.sc = 200
                req.body.data = cart
                return defaultResponse(req, res)
            } else {
                cart = await Cart.findOneAndUpdate(
                    { user_id: id },
                    {
                        $push: {
                            products: {
                                product_id: product_id,
                                quantity: quantity,
                            },
                        },
                        $set: {
                            coupon_id: null,
                        },
                    },
                    { new: true }
                )
                req.body.success = true
                req.body.sc = 200
                req.body.data = cart
                return defaultResponse(req, res)
            }
        } catch (error) {
            next(error)
        }
    },
    delete_product: async (req, res, next) => {
        try {
            const { id } = req.params
            if (!mongoose.isValidObjectId(id)) {
                id = mongoose.Types.ObjectId(id)
            }
            const { product_id } = req.body
            let cart = await Cart.findOneAndUpdate(
                { user_id: id },
                { $pull: { products: { product_id } } },
                { new: true }
            )
            cart = await Cart.findOne({ user_id: id }).populate('products.product_id')
            const productsPrice = cart.products.map(
                (product) => product.product_id.price
            )
            const productsQuantity = cart.products.map(
                (product) => product.quantity
            )
            const total = productsPrice.reduce(
                (total, price, index) =>
                    total + price * productsQuantity[index],
                0
            )
            cart = await Cart.findOneAndUpdate(
                { user_id: id },
                {
                    $set: {
                        products: cart.products,
                        total_price: total,
                        coupon_id: null,
                    },
                },
                { new: true }
            ).populate('products.product_id')
            req.body.success = true
            req.body.sc = 200
            req.body.data = cart
            return defaultResponse(req, res)
        } catch (error) {
            next(error)
        }
    },
    empty_cart: async (req, res, next) => {
        try {
            const { id } = req.params
            if (!mongoose.isValidObjectId(id)) {
                id = mongoose.Types.ObjectId(id)
            }
            const cart = await Cart.findOneAndUpdate(
                { user_id: id },
                { $set: { products: [], total_price: 0 } },
                { new: true }
            )
            req.body.success = true
            req.body.sc = 200
            req.body.data = cart
            return defaultResponse(req, res)
        } catch (error) {
            next(error)
        }
    },
    apply_coupon: async (req, res, next) => {
        try {
            const { id } = req.params
            const { coupon_name } = req.body
            const coupon = await Coupon.findOne({ coupon: coupon_name })
            console.log(coupon)
            if (coupon) {
                let cart = await Cart.findOne({ _id: id })
                let total = cart.total_price
                let discount = (total * coupon.discount) / 100
                if (!cart.coupon_id) {
                    cart = await Cart.findOneAndUpdate(
                        { _id: id },
                        {
                            $set: {
                                total_price: total - discount,
                                coupon_id: coupon._id,
                            },
                        },
                        { new: true }
                    )
                    req.body.success = true
                    req.body.sc = 200
                    req.body.data = cart
                    return defaultResponse(req, res)
                } else {
                    req.body.success = false
                    req.body.sc = 404
                    req.body.data = 'Coupon already applied'
                    return defaultResponse(req, res)
                }
            } else {
                req.body.success = false
                req.body.sc = 404
                req.body.data = 'Coupon not found'
                return defaultResponse(req, res)
            }
        } catch (error) {
            next(error)
        }
    },
}

export default controller

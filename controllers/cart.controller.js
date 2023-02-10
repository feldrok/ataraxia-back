import { Cart } from '../models/Cart.model.js'
import { Product } from '../models/Product.model.js'
import defaultResponse from '../config/defaultResponse.js'

const controller = {
    create: async (req, res, next) => {
        try {
            const { user_id, products } = req.body
            const productsIds = req.body.products
                .filter((product) => product.product_id)
                .map((product) => product.product_id)
            const productsPrice = await (
                await Product.find({ _id: { $in: productsIds } })
            ).map((product) => product.price)
            const productsQuantity = req.body.products
                .filter((product) => product.quantity)
                .map((product) => product.quantity)
            const total = productsPrice.reduce(
                (total, price, index) =>
                    total + price * productsQuantity[index],
                0
            )
            const cart = await Cart.create({
                user_id: user_id,
                products: products,
                total_price: total,
            })
            req.body.succes = true
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
            const cart = await Cart.find({ user_id: id }).populate(
                'products.product_id'
            )
            req.body.succes = true
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
            const { product_id, quantity } = req.body
            let cart = await Cart.find({ user_id: id }).populate(
                'products.product_id'
            )
            const cartProducts = cart[0].products.map(
                (product) => product.product_id
            )
            const updatedProduct = cartProducts.find(
                (product) => product._id.toString() === product_id
            )
            if (updatedProduct) {
                let cart = await Cart.find({ user_id: id }).populate(
                    'products.product_id'
                )
                const updatedCart = cart[0].products.map((product) => {
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
                cart = await Cart.find({ user_id: id }).populate(
                    'products.product_id'
                )
                const productsPrice = await (
                    await Product.find({ _id: { $in: cartProducts } })
                ).map((product) => product.price)
                const productsQuantity = cart[0].products.map(
                    (product) => product.quantity
                )
                const total = productsPrice.reduce(
                    (total, price, index) =>
                        total + price * productsQuantity[index],
                    0
                )
                cart = await Cart.findOneAndUpdate(
                    { user_id: id },
                    { $set: { products: updatedCart, total_price: total } },
                    { new: true }
                )
                req.body.succes = true
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
                    },
                    { new: true }
                )
                req.body.succes = true
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
            const { product_id, quantity } = req.body
            let cart = await Cart.find({ user_id: id }).populate(
                'products.product_id'
            )
            const cartProducts = cart[0].products.map(
                (product) => product.product_id
            )

            const updatedProduct = cartProducts.find(
                (product) => product._id.toString() === product_id
            )
            if (updatedProduct) {
                let cart = await Cart.find({ user_id: id }).populate(
                    'products.product_id'
                )
                const updatedCart = cart[0].products.map((product) => {
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
                cart = await Cart.find({ user_id: id }).populate(
                    'products.product_id'
                )
                const productsPrice = await (
                    await Product.find({ _id: { $in: cartProducts } })
                ).map((product) => product.price)
                const productsQuantity = cart[0].products.map(
                    (product) => product.quantity
                )
                const total = productsPrice.reduce(
                    (total, price, index) =>
                        total + price * productsQuantity[index],
                    0
                )
                cart = await Cart.findOneAndUpdate(
                    { user_id: id },
                    { $set: { products: updatedCart, total_price: total } },
                    { new: true }
                )
                req.body.succes = true
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
                    },
                    { new: true }
                )
                req.body.succes = true
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
            const { product_id } = req.body
            let cart = await Cart.findOneAndUpdate(
                { user_id: id },
                { $pull: { products: { product_id } } },
                { new: true }
            )
            cart = await Cart.find({ user_id: id })
            const cartProducts = cart[0].products.map(
                (product) => product.product_id
            )
            const productsPrice = await (
                await Product.find({ _id: { $in: cartProducts } })
            ).map((product) => product.price)
            const productsQuantity = cart[0].products.map(
                (product) => product.quantity
            )
            const total = productsPrice.reduce(
                (total, price, index) =>
                    total + price * productsQuantity[index],
                0
            )
            cart = await Cart.findOneAndUpdate(
                { user_id: id },
                { $set: { products: cart[0].products, total_price: total } },
                { new: true }
            ).populate('products.product_id')
            req.body.succes = true
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
            const cart = await Cart.findOneAndUpdate(
                { user_id: id },
                { $set: { products: [], total_price: 0 } },
                { new: true }
            )
            req.body.succes = true
            req.body.sc = 200
            req.body.data = cart
            return defaultResponse(req, res)
        } catch (error) {
            next(error)
        }
    },
}

export default controller

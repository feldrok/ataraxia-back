import { Product } from '../models/Product.model.js'
import defaultResponse from '../config/defaultResponse.js'

const controller = {
    create: async (req, res, next) => {
        try {
            const product = await Product.create(req.body)
            req.body.success = true
            req.body.sc = 201
            req.body.data = product
            return defaultResponse(req, res)
        } catch (error) {
            next(error)
        }
    },
    get_products: async (req, res, next) => {
        let query = {}
        if (req.query.category_id) {
            query.category_id = req.query.category_id
        }
        try {
            const products = await Product.find(query).populate('category_id')
            if (products.length > 0) {
                req.body.success = true
                req.body.sc = 200
                req.body.data = products
                return defaultResponse(req, res)
            } else if (products.length === 0) {
                req.body.succes = false
                req.body.sc = 404
                req.body.data = 'No products found'
                return defaultResponse(req, res)
            }
        } catch (error) {
            next(error)
        }
    },
    get_product: async (req, res, next) => {
        try {
            const { id } = req.params
            const product = await Product.findById(id).populate('category_id')
            if (product) {
                req.body.succes = true
                req.body.sc = 200
                req.body.data = product
                return defaultResponse(req, res)
            } else {
                req.body.succes = false
                req.body.sc = 404
                req.body.data = 'Product not found'
                return defaultResponse(req, res)
            }
        } catch (error) {
            next(error)
        }
    },
    update_product: async (req, res, next) => {
        try {
            const { id } = req.params
            let product = await Product.findOneAndUpdate(
                { _id: id },
                { $set: req.body },
                { new: true }
            )
            if (product) {
                req.body.success = true
                req.body.sc = 200
                req.body.data = product
                return defaultResponse(req, res)
            } else {
                req.body.success = false
                req.body.sc = 404
                req.body.data = 'Product not found'
                return defaultResponse(req, res)
            }
        } catch (error) {
            next(error)
        }
    },
}

export default controller

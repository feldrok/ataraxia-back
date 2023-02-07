import { Product } from '../models/Product.model.js'
import defaultResponse from '../config/defaultResponse.js'

const controller = {
    get_products: async (req, res, next) => {
        let query = {}
        if (req.query.category_id) {
            query.category_id = req.query.category_id
        }
        try {
            const products = await Product.find(query)
            if (products.length > 0) {
                req.body.succes = true
                req.body.sc = 200
                req.body.data = ['Products retrieved successfully', products]
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
            const product = await Product.findById(id)
            if (product) {
                req.body.succes = true
                req.body.sc = 200
                req.body.data = ['Product retrieved successfully', product]
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
}

export default controller

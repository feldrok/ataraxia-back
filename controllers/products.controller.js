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
            const product = await Product.findById(id)
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
        const productInfo = req.body
        try {
            let result = await Product.findOneAndUpdate(
                { id: req._id },
                { $set: productInfo },
                { new: true }
            )
            if (result) {
                return res.status(200).json({
                    success: true,
                    message: 'Stock actualizado',
                })
            } else {
                return res.status(404).json({
                    success: false,
                    message: 'No se encontro el producto',
                })
            }
        } catch (error) {
            next(error)
            return res.status(400).json({
                success: false,
                message: error,
            })
        }
    },
}

export default controller

import { Product } from '../models/Product.model.js'
import defaultResponse from '../config/defaultResponse.js'

const productExists = async (req, res, next) => {
    try {
        const { name } = req.body
        const product = await Product.findOne({ name: name })
        if (!product) {
            return next()
        } else {
            req.body.success = false
            req.body.sc = 400
            req.body.data = 'El producto ya existe'
            return defaultResponse(req, res)
        }
    } catch (error) {
        console.log(error)
        next(error)
    }
}
export default productExists

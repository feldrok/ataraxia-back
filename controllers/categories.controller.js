import { Category } from '../models/Category.model.js'
import defaultResponse from '../config/defaultResponse.js'

const controller = {
    get_categories: async (req, res, next) => {
        try {
            const categories = await Category.find()
            if (categories.length > 0) {
                req.body.succes = true
                req.body.sc = 200
                req.body.data = categories
                return defaultResponse(req, res)
            } else if (categories.length === 0) {
                req.body.succes = false
                req.body.sc = 404
                req.body.data = 'No categories found'
                return defaultResponse(req, res)
            }
        } catch (error) {
            next(error)
        }
    },
}

export default controller

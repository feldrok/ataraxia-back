import { Rating } from '../models/Rating.model.js'
import defaultResponse from '../config/defaultResponse.js'

const controller = {
    create: async (req, res, next) => {
        try {
            const { user } = req
            const { product_id, rating } = req.body
            const newRating = await Rating.create({ user_id: user.id, product_id: product_id, rating: rating })
            req.body.success = true
            req.body.sc = 201
            req.body.data = newRating
            return defaultResponse(req, res)
        } catch (error) {
            next(error)
        }
    },
    get_product_rating: async (req, res, next) => {
        const { id } = req.params
        try {
            let rating = await Rating.find({product_id: id})
            const ratings = rating.map((rating) => rating.rating)
            rating = ratings.reduce((a, b) => (a + b)/ratings.length)
            req.body.success = true
            req.body.sc = 200
            req.body.data = rating
            return defaultResponse(req, res)
        } catch (error) {
            next(error)
        }
    },
    get_user_rating: async (req, res, next) => {
        const { user } = req
        const { id } = req.params
        try {
            let rating = await Rating.findOne({user_id: user.id, product_id: id})
            req.body.success = true
            req.body.sc = 200
            req.body.data = rating.rating
            return defaultResponse(req, res)
        } catch(error) {
            next(error)
        }
    }
}

export default controller

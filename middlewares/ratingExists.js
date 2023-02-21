import { Rating } from '../models/Rating.model.js'
import defaultResponse from '../config/defaultResponse.js'

async function ratingExists(req, res, next) {
    const { user } = req
    const { product_id, rating } = req.body
    const reaction = await Rating.findOne({
        user_id: user.id,
        product_id: product_id,
    })
    if (reaction) {
        if (rating === 0) {
            await Rating.findByIdAndDelete(reaction._id)
            req.body.success = true
            req.body.sc = 200
            req.body.data = "Rating eliminado"
            return defaultResponse(req, res)
        } 
        else if (rating === reaction.rating) {
            await Rating.findByIdAndDelete(reaction._id)
            req.body.success = true
            req.body.sc = 200
            req.body.data = "Rating eliminado"
            return defaultResponse(req, res)
        } 
        else {
            await Rating.findOneAndUpdate(
                { _id: reaction._id },
                { $set: { rating: rating } },
                { new: true }
            )
            req.body.success = true
            req.body.sc = 200
            req.body.data = "Rating actualizado"
            return defaultResponse(req, res)
        }
    } else {
        next()
    }
}

export default ratingExists

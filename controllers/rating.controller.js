import { Rating } from '../models/Rating.model.js'

const controller = {
    create: async (req, res, next) => {
        try {
            await Rating.create(req.body)
            req.body.success = true
            req.body.sc = 201
            req.body.data = 'create'
            return defaultResponse(req, res)
        } catch (error) {
            next(error)
        }
    },
    getRating: async (req, res) => {
        let consultas = {}
        const { user_id, product_id, rating } = req.query
        if (req.query.product_id) {
            consultas.product_id = product_id
        }
        if (req.query.user_id) {
            consultas.user_id = user_id
        }
        if (req.query.rating) {
            req.query.rating = rating
        }
        try {
            const ratings = await Rating.find(consultas)
            res.status(200).json({
                success: true,
                response: ratings,
            })
        } catch (error) {
            res.status(400).json({
                success: false,
                response: 'Error al obtener valuaciones!',
            })
        }
    },
}

export default controller

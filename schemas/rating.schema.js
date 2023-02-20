import Joi from 'joi-oid'

export const schema = Joi.object({
    product_id: Joi.objectId().required(),
    rating: Joi.number().min(0).max(5).required()
})

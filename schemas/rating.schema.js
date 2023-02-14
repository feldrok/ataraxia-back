import Joi from 'joi-oid'

export const schema = Joi.object({
    product_id: Joi.objectId().required(),
    user_id: Joi.objectId().required(),
    rating: Joi.number().min(1).max(5).required()
})

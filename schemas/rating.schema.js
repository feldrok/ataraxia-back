import Joi from 'joi-oid'

export const schema = Joi.object({
    product_id: Joi.objectId().required(),
    user_id: Joi.objectId(),
    rating: Joi.number().max(5)
})

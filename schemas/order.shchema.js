import Joi from 'joi-oid'

export const schema = Joi.object({
    user_id: Joi.objectId(),
    cart_id: Joi.objectId(),
    status: Joi.string(),
})

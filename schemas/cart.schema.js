import Joi from 'joi-oid'

export const createSchema = Joi.object({
    product_id: Joi.objectId().required(),
    quantity: Joi.number().required(),
    user_id: Joi.objectId(),
    total_price: Joi.number(),
})

export const updateSchema = Joi.object({
    product_id: Joi.objectId().required(),
    quantity: Joi.number().required(),
})

export const deleteProductSchema = Joi.object({
    product_id: Joi.objectId().required(),
})

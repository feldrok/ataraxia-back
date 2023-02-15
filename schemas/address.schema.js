import Joi from 'joi-oid'

export const createSchema = Joi.object({
    street: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    zipcode: Joi.string().required(),
    country: Joi.string().required(),
})

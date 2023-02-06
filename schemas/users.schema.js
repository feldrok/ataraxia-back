import Joi from 'joi-oid'

export const createSchema = Joi.object({
    mail: Joi.string().email({ minDomainSegments: 2 }).min(5).max(50).required(),
    name: Joi.string().min(3).max(15).required(),
    lastName: Joi.string().min(3).max(20).required(),
    dni: Joi.string().min(7).max(8).required(),
    password: Joi.string().min(8).max(50).required(),
})
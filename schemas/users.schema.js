import Joi from 'joi-oid'

export const createSchema = Joi.object({
    mail: Joi.string()
        .email({ minDomainSegments: 2 })
        .required()
        .min(5)
        .max(50)
        .messages({
            'any.required': 'El email es requerido',
            'string.empty': 'El email no puede estar vacío',
            'string.min': 'El email debe tener al menos {#limit} caracteres',
            'string.max': 'El email debe tener menos de {#limit} caracteres',
            'string.base': 'El email debe ser de tipo texto',
        }),
    name: Joi.string().required().min(3).max(15).messages({
        'any.required': 'El nombre es requerido',
        'string.empty': 'El nombre no puede estar vacío',
        'string.min': 'El nombre debe tener al menos {#limit} caracteres',
        'string.max': 'El nombre debe tener menos de {#limit} caracteres',
        'string.base': 'El nombre debe ser de tipo texto',
    }),
    lastName: Joi.string().required().min(3).max(20).messages({
        'any.required': 'El apellido es requerido',
        'string.empty': 'El apellido no puede estar vacío',
        'string.min': 'El apellido debe tener al menos {#limit} caracteres',
        'string.max': 'El apellido debe tener menos de {#limit} caracteres',
        'string.base': 'El apellido debe ser de tipo texto',
    }),
    dni: Joi.string().required().min(7).max(8).messages({
        'any.required': 'El DNI es requerido',
        'string.empty': 'El DNI no puede estar vacío',
        'string.min': 'El DNI debe tener al menos {#limit} caracteres',
        'string.max': 'El DNI debe tener menos de {#limit} caracteres',
        'string.base': 'El DNI debe ser de tipo texto',
    }),
    password: Joi.string().required().min(8).max(50).messages({
        'any.required': 'La contraseña es requerida',
        'string.empty': 'La contraseña no puede estar vacía',
        'string.min': 'La contraseña debe tener al menos {#limit} caracteres',
        'string.max': 'La contraseña debe tener menos de {#limit} caracteres',
        'string.base': 'La contraseña debe ser de tipo texto',
    }),
    verify_password: Joi.string().required().min(8).max(50).messages({
        'any.required': 'La contraseña es requerida',
        'string.empty': 'La contraseña no puede estar vacía',
        'string.min': 'La contraseña debe tener al menos {#limit} caracteres',
        'string.max': 'La contraseña debe tener menos de {#limit} caracteres',
        'string.base': 'La contraseña debe ser de tipo texto',
    }),
})

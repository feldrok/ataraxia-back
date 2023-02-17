import Joi from 'joi-oid'

export const updateSchema = Joi.object({
    name: Joi.string().required().min(3).max(20).messages({
        'any.required': 'El nombre es requerido',
        'string.empty': 'El nombre no puede estar vacío',
        'string.min': 'El nombre debe tener al menos 3 caracteres',
        'string.max': 'El nombre debe tener menos de 20 caracteres',
        'string.base': 'El nombre no puede contener caracteres especiales',
    }),
    price: Joi.number().required().min(0).messages({
        'any.required': 'El precio es requerido',
        'number.empty': 'El precio no puede estar vacío',
        'number.min': 'El precio debe ser mayor a cero',
        'number.base': 'El precio no puede contener caracteres especiales',
    }),
    description: Joi.string().required().min(3).max(500).messages({
        'any.required': 'La descripción es requerida',
        'string.empty': 'La descripción no puede estar vacía',
        'string.min': 'La descripción debe tener al menos 3 caracteres',
        'string.max': 'La descripción debe tener menos de 500 caracteres',
    }),
    image: Joi.array()
        .required()
        .items(
            Joi.string().uri().messages({
                'any.required': 'La imagen es requerida',
                'string.empty': 'La imagen no puede estar vacía',
                'string.base':
                    'La imagen no puede contener caracteres especiales',
            })
        ),
    abv: Joi.number().min(0).max(100).messages({
        'number.min': 'El ABV debe ser mayor a cero',
        'number.max': 'El ABV debe ser menor o igual a 100',
        'number.base': 'El ABV no puede contener caracteres especiales',
    }),
    ibu: Joi.number().min(0).max(100).messages({
        'number.min': 'El IBU debe ser mayor a cero',
        'number.max': 'El IBU debe ser menor o igual a 100',
        'number.base': 'El IBU no puede contener caracteres especiales',
    }),
    ml: Joi.number().min(0).max(2000).messages({
        'number.min': 'El ML debe ser mayor a cero',
        'number.max': 'El ML debe ser menor o igual a 2000',
        'number.base': 'El ML no puede contener caracteres especiales',
    }),
    container: Joi.string().min(3).max(30).messages({
        'any.required': 'El tipo de contenedor es requerido',
        'string.empty': 'El tipo de contenedor no puede estar vacío',
        'string.min': 'El tipo de contenedor debe tener al menos 3 caracteres',
        'string.max': 'El tipo de contenedor debe tener menos de 30 caracteres',
    }),
    stock: Joi.number().required().min(0).messages({
        'any.required': 'El stock es requerido',
        'number.empty': 'El stock no puede estar vacío',
        'number.min': 'El stock debe ser mayor a cero',
        'number.base': 'El stock no puede contener caracteres especiales',
    }),
    category_id: Joi.objectId().required().messages({
        'any.required': 'La categoría es requerida',
        'object.empty': 'La categoría no puede estar vacía',
    }),
    size: Joi.number().min(0).messages({
        'number.min': 'El tamaño debe ser mayor a cero',
        'number.base': 'El tamaño no puede contener caracteres especiales',
    }),
    packSize: Joi.number().min(0).messages({
        'number.min': 'El tamaño debe ser mayor a cero',
        'number.base': 'El tamaño no puede contener caracteres especiales',
    }),
    color: Joi.string().min(3).max(30).messages({
        'any.required': 'El color es requerido',
        'string.empty': 'El color no puede estar vacío',
    }),
})

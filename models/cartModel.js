const Joi = require('@hapi/joi');

const quantitySchema = Joi.object({
    quantity: Joi.number().required().error(() => new Error('quantity must be a number')),
})

module.exports = quantitySchema
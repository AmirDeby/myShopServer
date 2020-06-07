const Joi = require('@hapi/joi');
const { regexEmail } = require('./regexModel');


const userSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().regex(regexEmail).required(),
    password: Joi.string().required(),
})

module.exports = { userSchema }

const Joi = require('@hapi/joi');
const { regexEmail } = require('./regexModel');

const loginSchema = Joi.object({
    email: Joi.string().regex(regexEmail).required().error(() => new Error('email must be an email')),
    password: Joi.string().required().error(() => new Error('password must be a string')),
});

module.exports = { loginSchema }
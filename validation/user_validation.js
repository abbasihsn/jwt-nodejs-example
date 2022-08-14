// Validation
const Joi = require('@hapi/joi');


// register validation
module.exports.registerValidation = (data) => {
    const userSchema = Joi.object({
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    })

    // data validation
    return userSchema.validate(data)
}

// login validation
module.exports.loginValidation = (data) => {
    const userSchema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    })

    // data validation
    return userSchema.validate(data)
}






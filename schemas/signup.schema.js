import Joi from 'joi-oid'

const schema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2  }).min(10).max(50).required(),
    password: Joi.string().min(8).max(50).required(),

    first_name:Joi.string().min(3).max(20).required().messages({
        "any.required":"Please enter your name",
        "string.empty":"Please enter your name"
     }),
     last_name:Joi.string().min(3).max(20).messages({
        "any.required":"Please enter your last name",
        "string.empty":"Please enter your last name"
     }),
})

export default schema
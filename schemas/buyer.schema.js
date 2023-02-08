import Joi from 'joi-oid'   

const schema = Joi.object({
 
    address:Joi.string().min(3).max(50).required().messages({
        "any.required":"Please enter your address",
        "string.empty":"Please enter your address"
     }),
     city:Joi.string().min(3).max(50).messages({
        "any.required":"Please enter your last city",
        "string.empty":"Please enter your last city"
     }),
     country:Joi.string().min(3).max(20).messages({
        "any.required":"Please enter your last country",
        "string.empty":"Please enter your last country"
     }),
})

export default schema
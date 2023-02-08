import Joi from 'joi-oid'

const schema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2  }).min(10).max(50).required(),
    password: Joi.string().min(8).max(50).required(),
})

export default schema
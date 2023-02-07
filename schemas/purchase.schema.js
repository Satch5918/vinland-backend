import Joi from 'joi-oid'

const schema = Joi.object({
  status: Joi.string().required(),
  products: Joi.array().items({ product_id: Joi.string().required(), quantity: Joi.number().required() }),
  total: Joi.number().required()
})

export default schema
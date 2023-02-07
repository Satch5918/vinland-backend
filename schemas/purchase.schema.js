import Joi from 'joi-oid'

const schema = Joi.object({
  status: Joi.string().required(),
  products: Joi.array().item({ product_id: Joi.objectId().required(), quantity: Joi.number().required }),
  total: Joi.number().required()
})

export default schema
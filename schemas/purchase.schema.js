import Joi from 'joi-oid'

const schema = Joi.object({
  products: Joi.array().items({ product_id: Joi.objectId().required(), quantity: Joi.number().required() }),
  total: Joi.number().required()
})

export default schema
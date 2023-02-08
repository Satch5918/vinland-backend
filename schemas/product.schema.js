import Joi from "joi-oid";


const product = Joi.object({
    genre: Joi.objectId().required(),
    name: Joi.string().required(),
    photo:Joi.string().uri().required(),
    price: Joi.number().required(),
    stock: Joi.number().required(),
    demo: Joi.string().uri(),
    description:Joi.string().required(),
    artist : Joi.string().required(),
    date : Joi.date(),
    sales: Joi.number() ,
})
export default product
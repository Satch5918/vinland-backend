import Joi from "joi-oid";

const genre = Joi.object(
    {
    name: Joi.string().required(),
    description : Joi.string().required(),
    }
)

export default genre

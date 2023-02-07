import { Purchase } from "../models/Purchase.js";
import defaultResponse from "../config/response.js";

const controller = {
  create: async ( req, res, next ) => {
    req.body.buyer_id = "Soy un id"
    try {
      await Purchase.create(req.body)
      req.body.success = true
      req.body.sc = 201
      req.body.data = 'purchase created'
      return defaultResponse(req, res)
    } catch (error) {
      next(error)
    }
  }
}

export default controller
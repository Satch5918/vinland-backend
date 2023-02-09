import { Purchase } from "../models/Purchase.js";
import defaultResponse from "../config/response.js";
import { Buyer } from "../models/Buyer.js";

const controller = {
  create: async ( req, res, next ) => {
    req.body.buyer_id = req.user.buyer_id
    try {
      const { _id } = await Purchase.create(req.body)
      await Buyer.findByIdAndUpdate(req.user.buyer_id, {$push: {purchases: _id}})
      req.body.success = true
      req.body.sc = 201
      req.body.data = 'purchase created'
      return defaultResponse(req, res)
    } catch (error) {
      next(error)
    }
  },
  my_purchases: async ( req, res, next ) => {
    req.body.buyer_id = "Soy un i"
    try {
      const purchases = await Purchase.find({ buyer_id: req.body.buyer_id })
      req.body.success = true
      req.body.sc = 200
      req.body.data = purchases
      return defaultResponse(req, res)
    } catch (error) {
      next(error)
    }
  },
  read: async ( req, res, next ) => {
    try {
      const purchases = await Purchase.find()
      req.body.success = true
      req.body.sc = 200
      req.body.data = purchases
      return defaultResponse(req, res)
    } catch (error) {
      next(error)
    }
  },
  my_details: async ( req, res, next ) => {
    let query = {}
    const { id } = req.params
    query._id = id
    query.buyer_id = "Soy un id"
    try {
      const purchase = await Purchase.findOne(query)
      req.body.success = true
      req.body.sc = 200
      req.body.data = purchase
      return defaultResponse(req, res)
    } catch (error) {
      next(error)
    }
  },
  destroy: async ( req, res, next ) => {
    const { id } = req.params
    try {
      await Purchase.findByIdAndDelete(id)
      req.body.success = true
      req.body.sc = 200
      req.body.data = 'deleted'
      return defaultResponse(req, res)
    } catch (error) {
      next(error)
    }
  },
  update: async ( req, res, next ) => {
    const { id } = req.params
    try {
      await Purchase.findByIdAndUpdate(id, req.body)
      req.body.success = true
      req.body.sc = 200
      req.body.data = 'updated'
      return defaultResponse(req, res)
    } catch (error) {
      next(error)
    }
  }
}

export default controller
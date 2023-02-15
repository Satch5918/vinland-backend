import { Buyer } from "../models/Buyer.js";

async function isBuyer(req,res,next) {
  if(req.user.is_buyer) {
    const buyer = await Buyer.findOne({user_id: req.user.id}, '_id')
    req.user.buyer_id = buyer._id
    return next()
  }
  req.body.success = false;
  req.body.sc = 400;
  req.body.data = "You are not a buyer";
}

export default isBuyer
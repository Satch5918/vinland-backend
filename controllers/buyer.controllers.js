import { Buyer } from "../models/Buyer.js";
import defaultResponse from "../config/response.js";

const controller = { 
    create : async (req,res,next) =>{
        try{
            req.body.user_id = req.user.id
            await Buyer.create(req.body)
            req.body.success = true;
            req.body.sc = 201;
            req.body.data = " Buyer created";
            return defaultResponse(req, res);
        }catch(error){
            next(error)
        }
    },
    update_buyer: async (req, res, next) => {
        try {

            await Buyer.findOneAndUpdate({ user_id: req.user.id }, req.body, { new: true });
            req.body.success = true;
            req.body.sc = 200;
            req.body.data = "update buyer";
            return defaultResponse(req, res);
        } catch (error) {
            next(error);
        }
      },
    read: async (req, res, next) => {
        try{
            const buyer = await Buyer.findOne({user_id: req.user.id}).populate('user_id', 'email')
            console.log(buyer);
            req.body.success = true;
            req.body.sc = 200;
            req.body.data = buyer;
            return defaultResponse(req, res);
        }
        catch(error){
            next(error);
        }
    }
}


export default controller
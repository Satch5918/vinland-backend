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
    updatebuyer: async (req, res, next) => {
        try {
            const { id } = req.params;
            await Buyer.findByIdAndUpdate({ _id: id }, req.body, { new: true });
            req.body.success = true;
            req.body.sc = 200;
            req.body.data = "update buyer";
            return defaultResponse(req, res);
        } catch (error) {
            next(error);
        }
      },
}


export default controller
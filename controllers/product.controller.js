import { Product } from "../models/Products.js"
import defaultResponse from "../config/response.js"


const controller={

    create:async(req,res,next)=>{
        try{
            const {gender,name,photo,price,stock,demo,description,artist,date,sales}=req.body
            await Product.create({gender,name,photo,price,stock,demo,description,artist,date,sales})
            req.body.success = true
            req.body.sc = 201 
            req.body.data = 'new product' 
            return defaultResponse(req,res)
        }catch(err){
           next(err)
        }
    }
}

export default controller
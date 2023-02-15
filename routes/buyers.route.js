import express  from "express";
import passport from "../config/passport.js";
import controller from "../controllers/buyer.controllers.js";
import schema from "../schemas/buyer.schema.js";
import validator from "../middlewares/validator.js";

const {create, update_buyer, read} = controller

let router = express.Router()

router.post('/',passport.authenticate('jwt',{session: false}),validator(schema),create)
router.put('/:id',passport.authenticate('jwt',{session: false}),validator(schema),update_buyer)
router.get('/',passport.authenticate('jwt',{session: false}) ,read)

export default router
import express  from "express";
const router = express.Router()
import paymentController from "../controllers/mercadopago.controller.js";
import passport from '../config/passport.js'
const {create_payment, confirm_payment} = paymentController

router.post('/', passport.authenticate('jwt', { session:false }), create_payment)
router.get('/success', confirm_payment)

export default router
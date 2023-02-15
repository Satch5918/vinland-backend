import express  from "express";
const router = express.Router()
import paymentController from "../controllers/mercadopago.controller.js";
const {create_payment, confirm_payment} = paymentController

router.post('/:id', create_payment)
router.get('/success', confirm_payment)

export default router
import express  from "express";
const router = express.Router()
import paymentController from "../controllers/mercadopago.controller.js";
const {createPayment, confirmPayment} = paymentController

router.post('/:id', createPayment)
router.get('/success', confirmPayment)

export default router
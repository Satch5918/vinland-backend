import express from 'express'
const router = express.Router()
import schema from '../schemas/purchase.schema.js';
import validator from '../middlewares/validator.js'
import controller from "../controllers/purchase.controller.js";

const { create, my_purchases } = controller

router.post('/', validator(schema), create)
router.get('/me', my_purchases)

export default router
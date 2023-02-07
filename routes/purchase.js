import express from 'express'
const router = express.Router()
import schema from '../schemas/purchase.schema.js';
import validator from '../middlewares/validator.js'
import controller from "../controllers/purchase.controller.js";

const { create } = controller

router.post('/', validator(schema), create)

export default router
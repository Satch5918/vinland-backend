import express from 'express'
const router = express.Router()
import schema from '../schemas/purchase.schema.js';
import validator from '../middlewares/validator.js'
import controller from "../controllers/purchase.controller.js";

const { create, my_purchases, read, my_details, destroy, update } = controller

router.get('/', read)
router.post('/', validator(schema), create)
router.get('/me', my_purchases)
router.get('/:id', my_details)
router.delete('/:id', destroy)
router.put('/:id', update)

export default router
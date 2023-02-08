import express from 'express'
import passport from "../config/passport.js";
const router = express.Router()
import schema from '../schemas/purchase.schema.js';
import validator from '../middlewares/validator.js'
import controller from "../controllers/purchase.controller.js";
import isAdmin from '../middlewares/isAdmin.js';
import isBuyer from '../middlewares/isBuyer.js';

const { create, my_purchases, read, my_details, destroy, update } = controller

router.get('/', read)
router.post('/', passport.authenticate('jwt',{session: false}), validator(schema), isBuyer, create)
router.get('/me', passport.authenticate('jwt',{session: false}), my_purchases)
router.get('/:id', passport.authenticate('jwt',{session: false}), my_details)
router.delete('/:id', passport.authenticate('jwt',{session: false}), isAdmin, destroy)
router.put('/:id', passport.authenticate('jwt',{session: false}), isAdmin, update)

export default router
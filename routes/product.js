import express from 'express';
let router = express.Router();
import validator from '../middlewares/validator.js';
import product from '../schemas/product.schema.js';
import isAdmin from '../middlewares/isAdmin.js';
import controller from '../controllers/product.controller.js';
import passport from "../config/passport.js";
const {create , updated , destroyed , read_all , read_one , read_bestseller , read_last} = controller


router.post('/', passport.authenticate('jwt', { session:false }), isAdmin, validator(product),create)
router.get("/",read_all)
router.get("/best",read_bestseller)
router.get("/last",read_last)
router.put('/:id', passport.authenticate('jwt', { session:false }), isAdmin, updated)
router.delete('/:id', passport.authenticate('jwt', { session:false }), isAdmin, destroyed)
router.get("/:id",read_one)




  
  export default router;
  
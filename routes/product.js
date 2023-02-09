import express from 'express';
let router = express.Router();
import validator from '../middlewares/validator.js';
import product from '../schemas/product.schema.js';
import isAdmin from '../middlewares/isAdmin.js';
import controller from '../controllers/product.controller.js';
const {create , updated , destroyed , read_all , read_one , read_bestseller , read_last} = controller


router.post('/', isAdmin, validator(product),create)
router.get("/",read_all)
router.get("/best",read_bestseller)
router.get("/last",read_last)
router.put('/:id', isAdmin, updated)
router.delete('/:id',destroyed)
router.get("/:id",read_one)




  
  export default router;
  
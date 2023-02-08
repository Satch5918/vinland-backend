import express from 'express';
let router = express.Router();
import validator from '../middlewares/validator.js';
import product from '../schemas/product.schema.js';
import isAdmin from '../middlewares/isAdmin.js';
import controller from '../controllers/product.controller.js';
const {create , updated , destroyed , read_All , read_one , read_bestseller , read_ultimos} = controller


router.post('/',/* isAdmin */ validator(product),create)
router.put('/:id',/* isAdmin */updated)
router.delete('/:id',destroyed)
router.get("/",read_All)
router.get("/best",read_bestseller)
router.get("/ultimos",read_ultimos)
router.get("/:id",read_one)




  
  export default router;
  
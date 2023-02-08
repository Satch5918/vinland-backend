import express from 'express';
let router = express.Router();
import validator from '../middlewares/validator.js';
import product from '../schemas/product.schema.js';
import isAdmin from '../middlewares/isAdmin.js';
import controller from '../controllers/product.controller.js';
const {create , updated , destroyed} = controller

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
  });

router.post('/',/* isAdmin */ validator(product),create)
router.put('/:id',/* isAdmin */updated)
router.delete('/:id',destroyed)



  
  export default router;
  
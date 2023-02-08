import express from 'express';
let router = express.Router();
import validator from '../middlewares/validator.js';
import product from '../schemas/product.schema.js';
import controller from '../controllers/product.controller.js';
const {create } = controller

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
  });

router.post('/', validator(product),create)



  
  export default router;
  
import express, {Router} from 'express';
let router = express.Router();
import product from './product.js'


/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Vinland server ready');
});


router.use('/product',product)

export default router;

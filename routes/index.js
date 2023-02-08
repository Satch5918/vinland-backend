import express, {Router} from 'express';
let router = express.Router();
import product from './product.js'
import genre from './genre.js';


/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Vinland server ready');
});


router.use('/product',product)
router.use('/genre',genre)

export default router;

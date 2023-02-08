import express, {Router} from 'express';
import users from './users.js'
import admin from './admin.router.js'
import buyers from './buyers.route.js'

import mercadopago from './mercadopago.route.js'
let router = express.Router();
import product from './product.js'
import genre from './genre.js';
import purchase from './purchase.js'

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Vinland server ready');
});
router.use('/payment', mercadopago)

router.use('/users',users)
router.use('/admin',admin)
router.use('/buyer',buyers)


router.use('/product',product)
router.use('/genre',genre)

router.use('/purchase', purchase)

export default router;

import express from 'express';
import mercadopago from './mercadopago.route.js'
let router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Vinland server ready');
});
router.use('/payment', mercadopago)

export default router;
